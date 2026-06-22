# EasyBaking — 아키텍처 가이드

베이킹 레시피 React Native 앱. **안정성**과 **확장성**을 우선해, 최신 트렌드 스택을 검증된 조합으로 구성했습니다.

## 기술 스택

| 영역 | 선택 | 이유 |
| --- | --- | --- |
| 런타임/빌드 | **Expo (SDK 56)** + Expo Router | 파일 기반 라우팅, OTA 업데이트(EAS), 안정적 빌드 파이프라인 |
| 언어 | **TypeScript** (strict) | 타입 안전성 |
| 스타일링 | **NativeWind v4** (Tailwind) | 일관된 디자인 시스템, 빠른 개발 |
| 서버/비동기 상태 | **TanStack Query v5** | 캐싱·로딩·에러·재시도 일원화 |
| 클라이언트 전역 상태 | **Zustand v5** (+ persist) | 보일러플레이트 없는 가벼운 상태관리, AsyncStorage 영속 |
| 폼/검증 | **React Hook Form + Zod** | 성능 좋은 폼 + 스키마 기반 검증 |
| 데이터 검증 | **Zod** | 스키마 → 타입 추론(단일 소스 오브 트루스) |
| 영속성 | **AsyncStorage** | 즐겨찾기·설정 저장 |

## 핵심 설계 원칙

### 1. 레이어 분리 + 기능(Feature) 모듈
화면(`app/`)은 얇게 유지하고, 도메인 로직은 `src/features/<도메인>` 안에 응집시킵니다.
각 기능은 자체 `api`/`components`/`data`/`store`/`types`를 갖고, `index.ts`(barrel)로만 외부에 노출합니다.

### 2. Repository 패턴 — 백엔드 교체 지점 격리
UI와 쿼리 훅은 **인터페이스**(`RecipeRepository`)에만 의존합니다. 현재는 목업(`MockRecipeRepository`)이 바인딩돼 있고,
실제 백엔드(Supabase/Firebase/REST)가 준비되면 **단 한 줄**만 바꾸면 됩니다:

```ts
// src/features/recipes/data/index.ts
export const recipeRepository: RecipeRepository = new MockRecipeRepository();
//                                              ↑ 여기만 교체 (예: new SupabaseRecipeRepository(client))
```

### 3. 의존성 방향 (단방향)
```
app/ (routes)  →  features/  →  components/ui, lib/, utils/
                      │
                      └─ data(Repository) ─→ (mock | 실제 백엔드)
```
하위 레이어는 상위를 import하지 않습니다.

## 디렉토리 구조

```
src/
├── app/                          # Expo Router — 라우트(화면 연결만)
│   ├── _layout.tsx               #   루트: Provider 조립 + Stack
│   ├── (tabs)/                   #   탭 그룹
│   │   ├── _layout.tsx           #     Tabs 네비게이터
│   │   ├── index.tsx             #     홈(레시피 피드)
│   │   ├── search.tsx            #     검색 + 카테고리 필터
│   │   ├── favorites.tsx         #     즐겨찾기
│   │   └── settings.tsx          #     설정(폼/테마/데이터)
│   ├── recipe/[id].tsx           #   레시피 상세
│   └── +not-found.tsx
│
├── features/                     # 기능 모듈 (도메인별 응집)
│   ├── recipes/
│   │   ├── api/                  #   TanStack Query 훅 + 쿼리키 팩토리
│   │   ├── components/           #   recipe-card, recipe-list
│   │   ├── data/                 #   Repository 인터페이스 + Mock 구현 + 바인딩
│   │   ├── types/                #   Zod 스키마 → 타입 추론
│   │   ├── utils.ts
│   │   └── index.ts              #   공개 API(barrel)
│   ├── favorites/                #   Zustand 영속 스토어 + FavoriteButton
│   └── settings/                 #   테마/프로필 스토어 + useResolvedScheme
│
├── components/ui/                # 디자인 시스템 (Screen, Text, Button, Card, Badge)
├── lib/                          # 인프라 (query-client, storage, nativewind-interop)
├── providers/                    # 전역 Provider 조립 (AppProviders)
├── config/                       # 환경변수 (Zod 검증)
└── utils/                        # 공용 유틸 (cn)
```

## 데이터 흐름 (레시피 목록 예시)
```
화면(index.tsx)
  → useRecipes()                       (features/recipes/api)
    → useQuery({ queryKey, queryFn })   (TanStack Query: 캐시/로딩/에러)
      → recipeRepository.list()         (인터페이스)
        → MockRecipeRepository          (현재 구현; 추후 교체)
```

## 상태 관리 구분
- **서버/원격 데이터** → TanStack Query (`features/*/api`). 캐시·동기화 담당.
- **클라이언트 전역 상태** → Zustand (`features/*/store`). 즐겨찾기·설정 등 영속 상태.
- **로컬 UI 상태** → `useState` (검색어, 선택된 칩 등).

## 새 기능 추가 절차
1. `src/features/<feature>/` 생성 → `types`(Zod), `data`(Repository+Mock), `api`(쿼리 훅), `components`.
2. `index.ts`로 공개 API 정의.
3. `src/app/`에 라우트 추가하고 기능 모듈을 호출(화면은 얇게).

## 백엔드 연동 시 (현재 미정 → 추후)
1. `RecipeRepository`를 구현하는 클래스 작성 (예: `SupabaseRecipeRepository`).
2. `src/features/recipes/data/index.ts`의 바인딩 한 줄 교체.
3. (선택) `recipeSchema.parse()`로 API 응답을 엣지에서 검증.
> UI/훅/화면은 **변경 없음.**

## 명령어
```bash
npm start          # Expo 개발 서버
npm run android    # Android 실행
npm run ios        # iOS 실행
npm run web        # 웹 실행
npm run lint       # ESLint
npx tsc --noEmit   # 타입체크
npx expo-doctor    # 의존성/설정 점검
```
