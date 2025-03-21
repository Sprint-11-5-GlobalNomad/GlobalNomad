# 🛤️ **체험형 상품 중개 및 예약 사이트** [ GlobalNomad ]

![image](https://github.com/user-attachments/assets/83bb1998-fd22-41c2-914f-1b4f97eb2a33)

- 배포 주소 : https://global-nomad-11-5.vercel.app/
- 메타 데이터 슬로건: 당신의 일상을 특별하게 만드는 한 번의 클릭

|  | **Test ID** | **Test PW** |
| --- | --- | --- |
| **🧑🏻‍🏭 (체험 등록 & 관리) 판매자** | admin@globalnomad.com | 12341234@ |
| **🤳🏻 (체험 예약 & 리뷰) 체험자** | user@globalnomad.com | 12341234@ |

---
## **1. 프로젝트 소개**

- **원데이 클래스, 여행 가이드, 동아리, 체험 입장권 등 다양한 체험 상품들을 예약할 수 있습니다.**
- 사용자가 판매자, 체험자 모두 될 수 있습니다.
- 체험 상품 검색, 상세 소개 및 리뷰 확인, 관리, 예약 등의 기능이 있습니다.
- 외부 SDK를 활용해 캘린더, 지도, 주소 관련 기능을 구현합니다.

## **2. 개발 환경**

### 기술 스택

- **Frontend :** `JavaScript` `TypeScript` `React` `Next.js(App Router)`
- **State Management & Data Fetching :** `react-query`
- **Styling :** `HTML` `CSS` `TailwindCSS`
- **Code Quality:** `ESLint` `Prettier`
- **Communication & Project Management:** `GitHub` `Notion` `Discord`
- **Version Control & Collaboration :** `Git` `GitHub`
- **API Integration :** `RESTful API` `카카오맵 API`
- **Deployment :** `Vercel`
- **Code Quality & Formatting:** `ESLint` `Prettier`

* Backend는 코드잇 측에서 지원해줬으며, API 연동 과정에서 Swagger 활용했습니다.

## **3. 개발 기간: 29일(**설 연휴, 일요일 제외)

- 2025.01.17(금) ~ 2025.02.22(토)

## 4. 프로젝트 구조

```jsx
project-root/
├── public/               # 정적 파일 (이미지, 폰트 등)
├── src/                  # 소스 코드
│   ├── app/              # Next.js app 라우트
│   │   ├── api/          # API 라우트
│   │   │   ├── auth/     # /api/auth/
│   │   │   │   └── route.ts
│   │   │   ├── users/    # /api/users/
│   │   │   │   └── route.ts
│   │   ├── auth/         # 인증 관련 페이지 (로그인, 회원가입)
│   │   ├── layout.tsx    # 모든 페이지의 공통 레이아웃
│   │   ├── page.tsx      # 메인 페이지
│   ├── components/       # 재사용 가능한 컴포넌트(css 파일 포함)
│   ├── hooks/            # 커스텀 훅
│   ├── contexts/         # Context API 관련
│   ├── lib/              # 유틸리티 함수, API 호출 로직
│   ├── styles/           # 전역 스타일 또는 컴포넌트 스타일
│   ├── types/            # TypeScript 타입 정의
│   └── store/            # 전역 상태 관리 (Recoil, Redux 등)
├── .env.local            # 환경 변수
├── next.config.js        # Next.js 설정 파일
└── tsconfig.json         # TypeScript 설정 파일
```
