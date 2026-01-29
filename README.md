# KOAS Platform

KOAS 공식 웹사이트입니다. 제품 소개, 뉴스, 구매, SNS 연동 등을 제공하는 마케팅 플랫폼입니다.

## 기술 스택

- **Frontend Framework**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **3D Visualization**: Three.js, React Three Fiber
- **Internationalization**: i18next
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Animation**: Framer Motion
- **Icons**: Heroicons
- **Code Quality**: ESLint, Prettier
- **Deployment**: Vercel

## 프로젝트 구조

```
src/
├── app/                 # 애플리케이션 진입점 및 레이아웃
├── features/            # 도메인별 기능 모듈
│   ├── main/           # 메인 페이지 및 홈 기능
│   ├── calmstand/      # Calmstand 제품 소개
│   └── serial/         # Serial 제품 소개
├── shared/             # 공유 자산
│   ├── components/     # 재사용 가능한 컴포넌트
│   ├── hooks/          # 커스텀 React Hooks
│   ├── lib/            # 유틸리티 함수 및 라이브러리
│   ├── types/          # 공유 TypeScript 타입
│   └── ui/             # UI 컴포넌트
├── assets/             # 이미지, 폰트 등 정적 자산
├── stores/             # Zustand 상태 관리 스토어
├── index.css           # 전역 스타일
└── main.tsx            # 애플리케이션 진입점
```

## 주요 기능

- **제품 소개**: 도메인별 페이지(main, calmstand, serial)
- **구매 연동**: 네이버 쇼핑 링크 통합
- **뉴스 페이지**: KOAS 공식 뉴스 연동
- **SNS 연동**: WeChat, LINE, LinkedIn, Facebook 링크
- **다국어 지원**: i18next를 통한 국제화
- **3D 시각화**: Three.js 기반 제품 시각화

## 설치 및 실행

### 개발 환경 구축

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버는 http://localhost:5173에서 실행됩니다.

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 환경 설정

`.env` 파일에서 다음 항목을 설정합니다:

```env
# API
VITE_API_BASE_URL=http://13.211.211.70:8080

# External Links
VITE_PURCHASE_URL=https://brand.naver.com/koasshop/products/12597423706
VITE_NEWS_URL=https://www.ikoas.com/news/

# SNS
VITE_SNS_WECHAT=https://mp.weixin.qq.com/s/UjTRWkVtEEtINisMMWyxqw
VITE_SNS_LINE=https://line.me/R/ti/p/@761haror
VITE_SNS_LINKEDIN=https://www.linkedin.com/company/koas/
VITE_SNS_FACEBOOK=https://www.facebook.com/people/코아스/61568079908788/

# Assets (Vercel Blob Storage)
VITE_ASSET_BASE_URL=https://j6wajg0oe8xjlsj8.public.blob.vercel-storage.com
```



## 배포

프로젝트는 Vercel에 배포되도록 설정되어 있습니다:

- `vercel.json` - Vercel 배포 설정
- `package.json`의 `build` 스크립트 - 빌드 프로세스 정의
- `.env` - 환경 변수 관리

Vercel 대시보드에서 자동 배포가 구성되어 있습니다.

## 개발 가이드

### 새로운 페이지 추가

1. `src/features/[도메인]/pages/` 디렉토리에 페이지 컴포넌트 작성
2. `src/app/` 에서 라우팅 설정
3. 필요시 공유 컴포넌트는 `src/shared/components/`에 작성

### 상태 관리

Zustand를 사용하여 전역 상태를 관리합니다:

```bash
# stores 디렉토리에 스토어 작성
src/stores/[storeName].ts
```

### 다국어 지원

i18next를 사용합니다. 새로운 텍스트는 언어 리소스 파일에 추가하고, 컴포넌트에서 `useTranslation` 훅으로 사용합니다.

## 라이선스

KOAS 공식 웹사이트 소스코드입니다.
