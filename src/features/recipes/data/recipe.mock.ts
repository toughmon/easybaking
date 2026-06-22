import type { Recipe, RecipeSummary } from '../types';
import { recipeSchema } from '../types';
import type { RecipeListParams, RecipeRepository } from './recipe.repository';

/** Simulate network latency so loading states are exercised in development. */
const LATENCY_MS = 400;
const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const SEED: Recipe[] = [
  {
    id: 'classic-chocolate-chip-cookies',
    title: '클래식 초코칩 쿠키',
    summary: '겉은 바삭, 속은 쫀득한 기본 초코칩 쿠키.',
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800',
    category: '쿠키',
    difficulty: 'easy',
    prepMinutes: 15,
    bakeMinutes: 12,
    servings: 24,
    tags: ['초보', '베스트셀러', '오븐'],
    ingredients: [
      { name: '박력분', amount: '280g' },
      { name: '무염버터', amount: '200g' },
      { name: '황설탕', amount: '160g' },
      { name: '백설탕', amount: '80g' },
      { name: '달걀', amount: '2개' },
      { name: '베이킹소다', amount: '1작은술' },
      { name: '소금', amount: '1/2작은술' },
      { name: '초콜릿 청크', amount: '200g' },
    ],
    steps: [
      { order: 1, description: '실온 버터와 설탕을 크림 상태가 될 때까지 휘핑한다.', durationMinutes: 5 },
      { order: 2, description: '달걀을 하나씩 넣으며 섞는다.', durationMinutes: 2 },
      { order: 3, description: '체 친 가루류를 넣고 주걱으로 가볍게 섞은 뒤 초콜릿을 넣는다.', durationMinutes: 3 },
      { order: 4, description: '반죽을 한 스푼씩 떠서 팬에 올리고 175℃ 오븐에서 굽는다.', durationMinutes: 12 },
    ],
  },
  {
    id: 'plain-scone',
    title: '담백한 플레인 스콘',
    summary: '버터향 가득한 영국식 스콘. 잼과 클로티드 크림에 곁들이기 좋다.',
    imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800',
    category: '스콘',
    difficulty: 'easy',
    prepMinutes: 20,
    bakeMinutes: 18,
    servings: 8,
    tags: ['브런치', '오븐'],
    ingredients: [
      { name: '박력분', amount: '300g' },
      { name: '차가운 버터', amount: '80g' },
      { name: '설탕', amount: '50g' },
      { name: '베이킹파우더', amount: '1큰술' },
      { name: '우유', amount: '120ml' },
      { name: '달걀', amount: '1개' },
    ],
    steps: [
      { order: 1, description: '가루류에 차가운 버터를 넣고 콩알 크기로 다진다.', durationMinutes: 5 },
      { order: 2, description: '우유와 달걀을 넣고 날가루가 보이지 않을 정도로만 뭉친다.', durationMinutes: 3 },
      { order: 3, description: '2cm 두께로 밀어 틀로 찍고 윗면에 달걀물을 바른다.', durationMinutes: 5 },
      { order: 4, description: '190℃ 오븐에서 노릇하게 굽는다.', durationMinutes: 18 },
    ],
  },
  {
    id: 'basque-cheesecake',
    title: '바스크 치즈케이크',
    summary: '겉은 진하게 태우고 속은 부드러운 스페인식 치즈케이크.',
    imageUrl: 'https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=800',
    category: '케이크',
    difficulty: 'medium',
    prepMinutes: 25,
    bakeMinutes: 40,
    servings: 8,
    tags: ['인기', '냉장보관'],
    ingredients: [
      { name: '크림치즈', amount: '500g' },
      { name: '설탕', amount: '150g' },
      { name: '달걀', amount: '3개' },
      { name: '생크림', amount: '250ml' },
      { name: '박력분', amount: '15g' },
    ],
    steps: [
      { order: 1, description: '실온 크림치즈를 풀고 설탕을 넣어 매끈하게 섞는다.', durationMinutes: 5 },
      { order: 2, description: '달걀을 하나씩, 이어서 생크림과 박력분을 넣어 섞는다.', durationMinutes: 5 },
      { order: 3, description: '유산지를 깐 틀에 붓고 220℃ 고온에서 겉면이 진하게 탈 때까지 굽는다.', durationMinutes: 40 },
      { order: 4, description: '완전히 식힌 뒤 냉장고에서 4시간 이상 안정시킨다.' },
    ],
  },
  {
    id: 'soft-milk-bread',
    title: '부드러운 우유식빵',
    summary: '탕종으로 만들어 며칠이 지나도 촉촉한 우유식빵.',
    imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800',
    category: '빵',
    difficulty: 'hard',
    prepMinutes: 150,
    bakeMinutes: 30,
    servings: 12,
    tags: ['발효빵', '탕종'],
    ingredients: [
      { name: '강력분', amount: '350g' },
      { name: '우유', amount: '200ml' },
      { name: '설탕', amount: '40g' },
      { name: '드라이이스트', amount: '5g' },
      { name: '버터', amount: '30g' },
      { name: '소금', amount: '6g' },
    ],
    steps: [
      { order: 1, description: '탕종을 만들어 식힌 뒤 본반죽 재료와 함께 글루텐이 잡힐 때까지 반죽한다.', durationMinutes: 20 },
      { order: 2, description: '1차 발효(약 60분)로 2배 부풀린다.', durationMinutes: 60 },
      { order: 3, description: '분할·성형 후 식빵틀에 넣어 2차 발효한다.', durationMinutes: 50 },
      { order: 4, description: '180℃ 오븐에서 굽는다.', durationMinutes: 30 },
    ],
  },
  {
    id: 'lemon-madeleine',
    title: '레몬 마들렌',
    summary: '배꼽이 봉긋 솟은 상큼한 레몬 마들렌.',
    imageUrl: 'https://images.unsplash.com/photo-1612809075009-9b3c0e0c4f9c?w=800',
    category: '구움과자',
    difficulty: 'medium',
    prepMinutes: 30,
    bakeMinutes: 13,
    servings: 12,
    tags: ['선물용', '오븐'],
    ingredients: [
      { name: '박력분', amount: '120g' },
      { name: '달걀', amount: '2개' },
      { name: '설탕', amount: '110g' },
      { name: '버터', amount: '120g' },
      { name: '베이킹파우더', amount: '4g' },
      { name: '레몬제스트', amount: '1개분' },
    ],
    steps: [
      { order: 1, description: '달걀과 설탕을 섞고 가루류, 녹인 버터, 레몬제스트를 차례로 넣는다.', durationMinutes: 10 },
      { order: 2, description: '반죽을 냉장고에서 최소 1시간 휴지시킨다.', durationMinutes: 60 },
      { order: 3, description: '틀의 80%까지 짜 넣고 190℃ 오븐에서 굽는다.', durationMinutes: 13 },
    ],
  },
  {
    id: 'fudgy-brownie',
    title: '꾸덕한 퍼지 브라우니',
    summary: '진한 다크초콜릿의 꾸덕한 식감이 일품인 브라우니.',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800',
    category: '구움과자',
    difficulty: 'easy',
    prepMinutes: 15,
    bakeMinutes: 25,
    servings: 9,
    tags: ['초보', '진한맛'],
    ingredients: [
      { name: '다크초콜릿', amount: '200g' },
      { name: '버터', amount: '120g' },
      { name: '설탕', amount: '150g' },
      { name: '달걀', amount: '3개' },
      { name: '박력분', amount: '90g' },
      { name: '코코아파우더', amount: '20g' },
    ],
    steps: [
      { order: 1, description: '초콜릿과 버터를 중탕으로 녹인다.', durationMinutes: 5 },
      { order: 2, description: '설탕, 달걀을 섞고 가루류를 넣어 가볍게 섞는다.', durationMinutes: 5 },
      { order: 3, description: '틀에 붓고 175℃ 오븐에서 겉면만 익도록 굽는다.', durationMinutes: 25 },
    ],
  },
];

// Validate seed data once at module load — catches malformed fixtures early.
const RECIPES: Recipe[] = SEED.map((r) => recipeSchema.parse(r));

const toSummary = (r: Recipe): RecipeSummary => ({
  id: r.id,
  title: r.title,
  summary: r.summary,
  imageUrl: r.imageUrl,
  category: r.category,
  difficulty: r.difficulty,
  prepMinutes: r.prepMinutes,
  bakeMinutes: r.bakeMinutes,
});

/** In-memory implementation backed by static seed data. */
export class MockRecipeRepository implements RecipeRepository {
  async list(params: RecipeListParams = {}): Promise<RecipeSummary[]> {
    await delay(LATENCY_MS);
    const search = params.search?.trim().toLowerCase();
    return RECIPES.filter((r) => {
      if (params.category && r.category !== params.category) return false;
      if (search) {
        const haystack = [r.title, r.summary, ...r.tags].join(' ').toLowerCase();
        if (!haystack.includes(search)) return false;
      }
      return true;
    }).map(toSummary);
  }

  async getById(id: string): Promise<Recipe | null> {
    await delay(LATENCY_MS);
    return RECIPES.find((r) => r.id === id) ?? null;
  }

  async categories(): Promise<string[]> {
    await delay(LATENCY_MS);
    return [...new Set(RECIPES.map((r) => r.category))];
  }
}
