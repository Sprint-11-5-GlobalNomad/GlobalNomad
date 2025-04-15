# 🛤️ **체험형 상품 중개 및 예약 사이트** [ GlobalNomad ]

- 배포 주소: https://global-nomad-11-5.vercel.app/ <br>
- **메타 데이터 슬로건: 당신의 일상을 특별하게 만드는 한 번의 클릭**

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

## 5. 트러블 슈팅

## `무한 스크롤 + 페이지네이션`

### ✅ 문제 상황

1. 무한 스크롤을 이용하여 체험 목록을 로드하는 방식으로 구현됨
2. 사용자가 스크롤을 내려 더 많은 데이터를 불러온 후, 페이지네이션(이전/다음 버튼)을 눌러서 이동하면 **현재 보던 위치가 아닌 맨 처음으로 돌아가 버리는 문제**가 발생함
    1. 무한 스크롤로 이동해 네번째 목록까지 보이는 상황 → 페이지네이션 버튼 클릭 시 다섯번째 목록부터 보여야 함
    2. 하지만 버튼 클릭 시 첫번째 목록으로 이동

### 🚨 원인 분석

1. **스크롤 위치 미저장**
- 무한 스크롤이 동작할 때는 `fetchNextPage`가 호출되면서 새로운 데이터가 추가됨
- 하지만 **페이지네이션 버튼을 클릭하면, 현재 스크롤 위치를 저장하지 않아 UI가 초기화되는 문제**가 발생

### 🛠 해결 방법

1. **현재 사용자가 보고 있는 위치를 추적**
    - `useInView`를 사용하여 사용자가 보고 있는 요소를 감지.
    - 특정 `threshold`(0.25) 이상 화면에 보이면 다음 페이지 데이터를 가져옴.
2. **스크롤 위치를 저장 및 복원**
    - `useRef`를 활용하여 `scrollContainerRef`를 저장하고, 현재 위치를 추적
    - **스크롤 이벤트가 발생하면** `handleScroll` 실행
    - **스크롤 컨테이너의 현재 스크롤 위치(`scrollLeft`) 확인**
    - **첫 번째 아이템의 가로 크기(`offsetWidth`)를 가져옴**
    - **현재 스크롤 위치를 기준으로 첫 번째 보이는 아이템의 인덱스를 계산**
    - `useEffect`를 사용하여 **스크롤 이벤트 발생 시, 현재 보고 있는 아이템의 인덱스를 `startIndex`로 저장**
3. **페이지네이션 버튼 클릭 시, `scrollToIndex` 함수 사용**
    - `handleNext` 및 `handlePrev` 함수에서 `startIndex`를 기반으로 **현재 보고 있던 위치를 유지하면서 이동**
    - `scrollToIndex` 함수를 활용해 **목록을 부드럽게 스크롤하면서 이동하도록 설정**
    - `block: "nearest", inline: "start"` 옵션을 설정해 **사용자가 현재 보던 위치를 유지하면서 페이지네이션이 적용되도록 변경**

### 💻 코드

```jsx
export default function PopularActivitiesSection() {
  const [startIndex, setStartIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  
  ...
  
    const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });
  
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const itemWidth = itemRefs.current[0]?.offsetWidth || 0;
      const newStartIndex = Math.floor(scrollContainer.scrollLeft / itemWidth);

      setStartIndex(newStartIndex);
    }
  };

  const [debouncedHandleScroll] = useDebounce(handleScroll, 200);

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isLoading]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    scrollContainer?.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      scrollContainer?.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  const scrollToIndex = (index: number) => {
    const targetElement = itemRefs.current[index];

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current && startIndex < activities.length - 1) {
      const nextIndex = startIndex + 1;
      setStartIndex(nextIndex);
      scrollToIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    if (scrollContainerRef.current && startIndex > 0) {
      const prevIndex = startIndex - 1;
      setStartIndex(prevIndex);
      scrollToIndex(prevIndex);
    }
  };

  const setCombinedRef = (index: number, el: HTMLLIElement | null) => {
    itemRefs.current[index] = el;
    ref(el);
  };
```

### **🎯 결과**

- 사용자가 무한 스크롤을 통해 데이터를 불러오고, **페이지네이션 버튼을 눌러도 기존 위치를 유지하며 이동 가능**하게 됨
- 즉, **사용자가 이전/다음 버튼을 눌러도 현재 탐색 중인 위치를 유지한 채 이동**할 수 있도록 개선됨

---

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
