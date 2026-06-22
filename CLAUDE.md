@AGENTS.md

# EasyBaking

베이킹 레시피 앱. 아키텍처 전체 설명은 **[ARCHITECTURE.md](./ARCHITECTURE.md)** 참고.

## 핵심 규칙
- 화면(`src/app/`)은 얇게: 라우팅/연결만. 도메인 로직은 `src/features/<도메인>`에 둔다.
- 데이터 접근은 **항상** 쿼리 훅(`features/*/api`)을 통해서. 컴포넌트가 Repository를 직접 부르지 않는다.
- 백엔드 교체 지점은 `src/features/recipes/data/index.ts` 한 곳뿐.
- 스타일은 NativeWind `className`. 서드파티 컴포넌트는 `src/lib/nativewind-interop.ts`에 등록 후 사용.
- 타입/검증은 Zod 스키마에서 추론(`features/*/types`). 별도 interface 중복 정의 금지.
- 서버 상태=TanStack Query, 전역 클라이언트 상태=Zustand, 로컬 UI 상태=useState.

## 검증
변경 후 `npx tsc --noEmit` 와 `npm run lint` 통과를 확인한다.
