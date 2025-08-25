# 🛤️ **체험형 상품 중개 및 예약 사이트** [ GlobalNomad ]

- 배포 주소: https://global-nomad-11-5.vercel.app/ <br>
- 시연 영상 주소: https://drive.google.com/file/d/1trbXuZ_MUn0B-ZlNFKuagGryycEAD-Zi/view?usp=sharing
- **메타 데이터 슬로건: 당신의 일상을 특별하게 만드는 한 번의 클릭**

|                                  | **Test ID**           | **Test PW** |
| -------------------------------- | --------------------- | ----------- |
| **🧑🏻‍🏭 (체험 등록 & 관리) 판매자** | admin@globalnomad.com | 12341234@   |
| **🤳🏻 (체험 예약 & 리뷰) 체험자** | user@globalnomad.com  | 12341234@   |

---

## **1. 프로젝트 소개**

- **원데이 클래스, 여행 가이드, 동아리, 체험 입장권 등 다양한 체험 상품들을 예약할 수 있습니다.**
- 사용자가 판매자, 체험자 모두 될 수 있습니다.
- 체험 상품 검색, 상세 소개 및 리뷰 확인, 관리, 예약 등의 기능이 있습니다.
- 외부 SDK를 활용해 캘린더, 지도, 주소 관련 기능을 구현합니다.

## **2. 개발 환경**

### 기술 스택

- **Frontend:** `JavaScript(ES6+)` `TypeScript` `React` `Next.js`
- **State Management & Data Fetching** : `TanStack query`
- **Styling** : `CSS` `TailwindCSS`
- **Code Quality & Formatting** : `ESLint` `Prettier`
- **Communication & Project Management**: `GitHub` `Notion` `Discord`
- **Version Control & Collaboration** : `Git` `GitHub`
- **API Integration** : `RESTful API` `카카오맵 API`

\*Backend는 코드잇 측에서 지원해줬으며, API 연동 과정에서 Swagger 활용했습니다.

## **3. 개발 기간: 29일(설 연휴, 일요일 제외)**

- 2025.01.17(금) ~ 2025.02.22(토)
- [프로젝트 수행 단계별 계획(세부)](https://github.com/orgs/Sprint-11-5-GlobalNomad/projects/1/views/1)
- 프로젝트 수행 일정표(종합)
  <img width="680" alt="image" src="https://github.com/user-attachments/assets/3d0f5de7-b84c-4bc1-9cbf-d0921ad05eae" />

## **4. 프로젝트 구조**

```jsx
project-root/
├── public/                   # 정적 파일 (이미지, 폰트 등)
├── src/                      # 소스 코드
│   ├── app/                  # Next.js app 라우트
│   │   ├── (auth)/           # 인증 관련 페이지 (로그인, 회원가입)
│   │   │   ├── layout.tsx    # 인증 관련 페이지 레이아웃
│   │   ├── (primary)/        # 인증 외 모든 페이지
│   │   │   ├── api/          # API 라우트
│   │   │   ├── activity/[id] # 체험 상세 페이지
│   │   │   ├── profile/      # 프로필 및 체험&예약 관리 페이지
│   │   │   ├── layout.tsx    # 인증 외 공통 레이아웃
│   │   │   ├── page.tsx      # 메인 페이지
│   │   ├── react-query/      # React Query 설정 및 훅
│   │   ├── types/            # API 관련 타입 정의
│   ├── components/           # 재사용 컴포넌트
│   │   ├── common/           # 2개 페이지 이상 적용되는 컴포넌트
│   │   │   ├── icons         # SVG 아이콘 컴포넌트
│   │   │   ├── layout        # 네비게이션 바, 푸터 등 레이아웃 컴포넌트
│   │   │   ├── ui            # 버튼, 드롭다운 등 UI 컴포넌트
│   │   ├── page/             # 1개 페이지에만 적용되는 컴포넌트
│   ├── hooks/                # 커스텀 훅
│   ├── styles/               # 스타일 관련 파일
│   ├── utils/                # 유틸리티 함수
├── .env.local                # 환경 변수
├── next.config.js            # Next.js 설정
└── tsconfig.json             # TypeScript 설정
```

## 5. 프로젝트 팀 구성 및 역할

![image](https://github.com/user-attachments/assets/3b1a0581-d446-466a-aa73-8089b85d57e9)
