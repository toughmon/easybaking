# EasyBaking 실행 방법

베이킹 레시피 앱(Expo SDK 56 + Expo Router)을 로컬에서 실행·검증·빌드하는 방법.

---

## 1. 사전 준비물

| 항목 | 권장 버전 | 비고 |
| --- | --- | --- |
| **Node.js** | **20.19.4+** (또는 22.13+/24.3+) | 현재 `v20.19.3`이면 RN 0.85가 EBADENGINE 경고 → 패치 버전 올리는 걸 권장 |
| npm | 10+ | 프로젝트는 npm 사용 (`package-lock.json`) |
| **스마트폰** | — | 가장 간편. App Store/Play 스토어에서 **Expo Go** 설치 |
| (선택) Xcode | 최신 | iOS 시뮬레이터용 (macOS 전용) |
| (선택) Android Studio | 최신 | Android 에뮬레이터용 |

> 실기기 + Expo Go 조합이 가장 빠르게 시작하는 방법입니다. 시뮬레이터/에뮬레이터는 선택.

---

## 2. 설치

```bash
# 프로젝트 폴더에서
npm install
```

(선택) 환경변수가 필요하면 예시 파일을 복사:

```bash
cp .env.example .env
```

`EXPO_PUBLIC_*` 변수만 앱 번들에 주입되며, `src/config/env.ts`에서 Zod로 검증됩니다. 백엔드 미연동 상태에서는 그대로 두어도 됩니다.

---

## 3. 개발 서버 실행

```bash
npm start
# 또는 npx expo start
```

실행하면 터미널에 QR 코드와 단축키 메뉴가 표시됩니다.

### 기기별 실행
| 방법 | 명령 / 동작 |
| --- | --- |
| **실기기 (Expo Go)** | 표시된 **QR 코드 스캔** (iOS: 카메라 앱 / Android: Expo Go 앱). PC와 폰이 **같은 Wi-Fi**여야 함 |
| **iOS 시뮬레이터** | 개발 서버 실행 중 터미널에서 `i` 입력 (또는 `npm run ios`) |
| **Android 에뮬레이터** | 터미널에서 `a` 입력 (또는 `npm run android`) — 에뮬레이터를 먼저 켜둘 것 |
| **웹 브라우저** | 터미널에서 `w` 입력 (또는 `npm run web`) |

### 개발 서버 단축키 (터미널)
- `r` — 앱 새로고침(reload)
- `m` — 개발자 메뉴 토글
- `j` — 디버거 열기
- `?` — 전체 단축키 보기

> Wi-Fi 환경이 막혀 QR 연결이 안 되면: `npx expo start --tunnel` (느리지만 방화벽/다른 네트워크에서도 연결됨).

---

## 4. 자주 쓰는 명령어

```bash
npm start            # 개발 서버
npm run android      # Android 에뮬레이터로 실행
npm run ios          # iOS 시뮬레이터로 실행
npm run web          # 웹으로 실행

npm run lint         # ESLint 검사
npx tsc --noEmit     # TypeScript 타입체크
npx expo-doctor      # 의존성 / 설정 호환성 점검
```

변경 후에는 `npx tsc --noEmit` 와 `npm run lint` 통과를 확인하세요.

---

## 5. 문제 해결 (Troubleshooting)

**캐시 문제로 빌드가 꼬일 때** — Metro 캐시 초기화 후 재시작:
```bash
npx expo start -c
```

**스타일(NativeWind)이 적용되지 않을 때**
- `babel.config.js`, `metro.config.js`, `tailwind.config.js`, `src/global.css` 가 모두 있는지 확인
- 서드파티 컴포넌트에 `className`을 쓰려면 `src/lib/nativewind-interop.ts`에 등록되어 있어야 함
- `npx expo start -c` 로 캐시 비우고 재시작

**의존성/네이티브 모듈 꼬임** — 클린 재설치:
```bash
rm -rf node_modules
npm install
```

**EBADENGINE 경고** — Node를 `20.19.4+`로 업그레이드(경고일 뿐 실행은 가능).

**포트 충돌(8081 사용 중)** — `npx expo start --port 8082`

---

## 6. 프로덕션 빌드 / 배포 (EAS)

실제 앱 스토어 배포나 네이티브 모듈이 필요한 개발 빌드는 **EAS**를 사용합니다.

```bash
npm install -g eas-cli          # 최초 1회
eas login                       # Expo 계정 로그인
eas build:configure             # eas.json 생성 (최초 1회)

# 개발 빌드 (실기기에 설치해 네이티브 디버깅)
eas build --profile development --platform ios
eas build --profile development --platform android

# 프로덕션 빌드
eas build --platform all

# OTA 업데이트 (JS 변경분을 스토어 재심사 없이 배포)
eas update --branch production
```

> EAS는 Expo 계정과 (iOS의 경우) Apple Developer 계정이 필요합니다.

### 웹 정적 배포
```bash
npx expo export -p web      # dist/ 폴더에 정적 빌드 생성
```

---

## 7. 참고
- 아키텍처 전체 설명: **[ARCHITECTURE.md](./ARCHITECTURE.md)**
- 코드 작성 규칙: **[CLAUDE.md](./CLAUDE.md)**
- Expo 공식 문서(버전 고정): https://docs.expo.dev/versions/v56.0.0/
