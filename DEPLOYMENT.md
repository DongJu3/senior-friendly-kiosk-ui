# 배포 가이드

## Vercel을 사용한 배포

### 방법 1: Vercel 웹사이트에서 배포 (가장 쉬움)

1. **Vercel 회원가입**
   - https://vercel.com 접속
   - "Sign Up" → "Continue with GitHub" 선택
   - GitHub 계정으로 로그인

2. **프로젝트 배포**
   - Vercel 대시보드에서 "New Project" 클릭
   - GitHub 저장소 `senior-friendly-kiosk-ui` 선택
   - 자동으로 설정됨 (Build command, Output directory)
   - "Deploy" 클릭

3. **배포 완료**
   - Vercel이 자동으로 배포 시작
   - 배포 URL 제공됨 (예: `https://senior-friendly-kiosk-ui.vercel.app`)
   - 매번 GitHub에 push할 때마다 자동 재배포

### 방법 2: GitHub Actions를 사용한 자동 배포

이 저장소에는 자동 배포 워크플로우가 포함되어 있습니다.

**설정 방법:**

1. **Vercel에서 토큰 생성**
   - https://vercel.com/account/tokens 접속
   - "Create" → 토큰 이름 입력 → "Create"
   - 토큰 복사

2. **GitHub 저장소 설정**
   - GitHub 저장소 → Settings → Secrets and variables → Actions
   - "New repository secret" 클릭
   - 다음 3개의 secret 추가:

   **VERCEL_TOKEN**
   - 방금 생성한 Vercel 토큰 붙여넣기

   **VERCEL_ORG_ID**
   - Vercel 계정 → Settings → General에서 "Team ID" 또는 "Account ID" 복사

   **VERCEL_PROJECT_ID**
   - Vercel 대시보드에서 프로젝트 선택 → Settings → General
   - "Project ID" 복사

3. **확인**
   - GitHub에 push하면 Actions 탭에서 배포 진행 상황 확인
   - 배포 완료 후 Vercel 대시보드에서 라이브 URL 확인

### 배포 후 확인

```bash
# 배포된 사이트 확인
# Vercel 대시보드에서 제공하는 URL로 접속

# 예시: https://senior-friendly-kiosk-ui.vercel.app
```

### SUBMISSION.md 업데이트

배포 완료 후 `SUBMISSION.md`의 다음 부분을 수정:

```markdown
## 4. 실행 가능한 웹사이트

https://senior-friendly-kiosk-ui.vercel.app/
```

---

## 다른 배포 옵션

### GitHub Pages
```bash
# 1. vite.config.ts 수정
base: '/senior-friendly-kiosk-ui/'

# 2. 배포
npm run build
# dist 폴더를 gh-pages 브랜치로 푸시

# URL: https://dongju3.github.io/senior-friendly-kiosk-ui/
```

### Netlify
1. https://netlify.com 접속
2. "New site from Git"
3. GitHub 저장소 선택
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

---

## 배포 체크리스트

- [ ] 로컬에서 `npm run build` 성공 확인
- [ ] dist 폴더 생성 확인
- [ ] Vercel 계정 생성
- [ ] GitHub와 Vercel 연동
- [ ] 프로젝트 배포
- [ ] 배포 URL 테스트
- [ ] SUBMISSION.md 업데이트

---

## 배포 후 확인 사항

1. **화면 로드 확인**
   - 배포 URL 접속
   - 첫 화면이 정상적으로 로드되는지 확인

2. **기능 테스트**
   - 메뉴 선택 기능 확인
   - 옵션 선택 기능 확인
   - 주문 완료까지의 전체 흐름 테스트

3. **반응형 테스트**
   - 다양한 브라우저 크기에서 키오스크 화면 비율 유지 확인
   - 모바일 브라우저에서도 정상 작동 확인

---

## 문제 해결

### 배포 실패 시
- Vercel 대시보드에서 배포 로그 확인
- GitHub Actions 탭에서 워크플로우 실행 로그 확인
- 빌드 오류 메시지 읽기

### 페이지가 로드되지 않을 때
- 브라우저 캐시 삭제
- 시크릿 창에서 접속 시도
- Vercel 대시보드에서 배포 상태 확인

### 자동 배포가 안 될 때
- GitHub Secrets 설정 확인
- VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID가 올바른지 확인
- Vercel에서 GitHub 연동 권한 확인
