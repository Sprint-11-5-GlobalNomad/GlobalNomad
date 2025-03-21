# 🛤️ **체험형 상품 중개 및 예약 사이트** [ GlobalNomad ]

![image](https://github.com/user-attachments/assets/83bb1998-fd22-41c2-914f-1b4f97eb2a33)

- 배포 주소 : https://global-nomad-11-5.vercel.app/
**- 메타 데이터 슬로건: 당신의 일상을 특별하게 만드는 한 번의 클릭**

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

- **Frontend:** `JavaScript(ES6+)` `TypeScript` `React` `Next.js`
- **State Management & Data Fetching** : `react-query`
- **Styling** : `HTML` `CSS` `TailwindCSS`
- **Code Quality & Formatting** : `ESLint` `Prettier`
- **Communication & Project Management**: `GitHub` `Notion` `Discord`
- **Version Control & Collaboration** : `Git` `GitHub`
- **API Integration** : `RESTful API` `카카오맵 API`

*Backend는 코드잇 측에서 지원해줬으며, API 연동 과정에서 Swagger 활용했습니다.

## **3. 개발 기간: 29일(설 연휴, 일요일 제외)**

- 2025.01.17(금) ~ 2025.02.22(토)
- [프로젝트 수행 단계별 계획(세부)](https://github.com/orgs/Sprint-11-5-GlobalNomad/projects/1/views/1)
- 프로젝트 수행 일정표(종합)
<img width="902" alt="image" src="https://github.com/user-attachments/assets/a750fbdb-db22-495c-9ae3-5bde6a564486" />


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

## 5. 활용 방안 및 기대 효과

## 6. 프로젝트 팀 구성 및 역할

![image](https://github.com/user-attachments/assets/3b1a0581-d446-466a-aa73-8089b85d57e9)

## 7. 자체 평가

- **React Query 활용한 전역 상태 관리 숙련도 향상**
- **복잡한 반응형 UI 구현 경험**
- **캘린더 등 라이브러리 활용 경험**
- **카카오맵, 우편 번호 등 API 연동 경험**

1️⃣ **기획 의도와의 부합 정도**

✅ 반응형 디자인 등 복잡한 UI, 예약 시스템, 지도 기능 구현 100%

2️⃣ **실무 활용 가능 정도**

✅ 리뷰 수정 삭제만 추가한다면 프로토타입으로 가능하지 않을까 기대

3️⃣ **완성도 95%**

✅ 간편 회원가입 미구현 외에는 요구사항 100% 충족
