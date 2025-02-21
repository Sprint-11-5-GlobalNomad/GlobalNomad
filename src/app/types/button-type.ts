// 버튼 사이즈 타입 정의
type ButtonSizesType = Record<string, string>;

// 버튼 사이즈 목록 (정적 클래스 문자열, 단위는 rem)
const ButtonSizes: ButtonSizesType = {
  loginSignup:
    "desktop:w-[64rem] desktop:h-[4.8rem] desktop:rounded-[0.6rem] desktop:text-[1.6rem] " +
    "tablet:w-[64rem] tablet:h-[4.8rem] tablet:rounded-[0.6rem] tablet:text-[1.6rem] " +
    "mobile:w-[35rem] mobile:h-[4.8rem] mobile:rounded-[0.6rem] mobile:text-[1.6rem]",
  modal:
    "desktop:w-[12rem] desktop:h-[4.8rem] desktop:rounded-[0.8rem] desktop:text-[1.6rem] " +
    "tablet:w-[12rem] tablet:h-[4.8rem] tablet:rounded-[0.8rem] tablet:text-[1.6rem] " +
    "mobile:w-[13.8rem] mobile:h-[4.2rem] mobile:rounded-[0.8rem] mobile:text-[1.4rem]",
  modalDoubleButtons:
    "desktop:w-[8rem] desktop:h-[3.8rem] desktop:rounded-[0.6rem] desktop:text-[1.4rem] " +
    "tablet:w-[8rem] tablet:h-[3.8rem] tablet:rounded-[0.6rem] tablet:text-[1.4rem] " +
    "mobile:w-[8rem] mobile:h-[3.8rem] mobile:rounded-[0.6rem] mobile:text-[1.4rem]",
  search:
    "desktop:w-[13.6rem] desktop:h-[5.6rem] desktop:rounded-[0.4rem] desktop:text-[1.6rem] " +
    "tablet:w-[13.6rem] tablet:h-[5.6rem] tablet:rounded-[0.4rem] tablet:text-[1.6rem] " +
    "mobile:w-[9.6rem] mobile:h-[5.6rem] mobile:rounded-[0.4rem] mobile:text-[1.6rem]",
  availableTime:
    "desktop:w-[11.7rem] desktop:h-[4.6rem] desktop:rounded-[0.8rem] desktop:text-[1.6rem] " +
    "tablet:w-[11.7rem] tablet:h-[4.6rem] tablet:rounded-[0.8rem] tablet:text-[1.6rem] " +
    "mobile:w-[11.7rem] mobile:h-[4.6rem] mobile:rounded-[0.8rem] mobile:text-[1.6rem]",
  reservation:
    "desktop:w-[33.6rem] desktop:h-[5.6rem] desktop:rounded-[0.4rem] desktop:text-[1.6rem] " +
    "tablet:w-[20.3rem] tablet:h-[5.6rem] tablet:rounded-[0.4rem] tablet:text-[1.6rem] " +
    "mobile:w-[10.6rem] mobile:h-[4.8rem] mobile:rounded-[0.4rem] mobile:text-[1.6rem]",
  dateReservation:
    "desktop:w-[43.2rem] desktop:h-[5.6rem] desktop:rounded-[0.4rem] desktop:text-[1.6rem] " +
    "tablet:w-[43.2rem] tablet:h-[5.6rem] tablet:rounded-[0.4rem] tablet:text-[1.6rem] " +
    "mobile:w-[32.7rem] mobile:h-[5.6rem] mobile:rounded-[0.4rem] mobile:text-[1.6rem]",
  profileSave:
    "desktop:w-[12rem] desktop:h-[4.8rem] desktop:rounded-[0.4rem] desktop:text-[1.6rem] " +
    "tablet:w-[12rem] tablet:h-[4.8rem] tablet:rounded-[0.4rem] tablet:text-[1.6rem] " +
    "mobile:w-[12rem] mobile:h-[4.8rem] mobile:rounded-[0.4rem] mobile:text-[1.6rem]",
  review:
    "desktop:w-[14.4rem] desktop:h-[4.3rem] desktop:rounded-[0.6rem] desktop:text-[1.6rem] " +
    "tablet:w-[11.2rem] tablet:h-[4rem] tablet:rounded-[0.6rem] tablet:text-[1.6rem] " +
    "mobile:w-[8rem] mobile:h-[3.2rem] mobile:rounded-[0.6rem] mobile:text-[1.4rem]",
  reviewSubmit:
    "desktop:w-[43.2rem] desktop:h-[5.6rem] desktop:rounded-[0.4rem] desktop:text-[1.6rem] " +
    "tablet:w-[43.2rem] tablet:h-[5.6rem] tablet:rounded-[0.4rem] tablet:text-[1.6rem] " +
    "mobile:w-[35rem] mobile:h-[5.4rem] mobile:rounded-[0.4rem] mobile:text-[1.6rem]",
  approveReject:
    "desktop:w-[8.2rem] desktop:h-[3.8rem] desktop:rounded-[0.6rem] desktop:text-[1.4rem] " +
    "tablet:w-[8.2rem] tablet:h-[3.8rem] tablet:rounded-[0.6rem] tablet:text-[1.4rem] " +
    "mobile:w-[8.2rem] mobile:h-[3.8rem] mobile:rounded-[0.6rem] mobile:text-[1.4rem]",
  category:
    "desktop:w-[12.7rem] desktop:h-[5.8rem] desktop:rounded-[1.5rem] desktop:text-[1.8rem] " +
    "tablet:w-[12rem] tablet:h-[5.8rem] tablet:rounded-[1.5rem] tablet:text-[1.8rem] " +
    "mobile:w-[8rem] mobile:h-[4.1rem] mobile:rounded-[1.5rem] mobile:text-[1.6rem]",
  page:
    "desktop:w-[5.5rem] desktop:h-[5.5rem] desktop:rounded-[1.5rem] desktop:text-[1.8rem] " +
    "tablet:w-[5.5rem] tablet:h-[5.5rem] tablet:rounded-[1.5rem] tablet:text-[1.8rem] " +
    "mobile:w-[4rem] mobile:h-[4rem] mobile:rounded-[1.5rem] mobile:text-[1.8rem]",
  reservationTime:
    "desktop:w-[5.6rem] desktop:h-[5.6rem] desktop:rounded-[0.9rem] desktop:text-[2.6rem] " +
    "tablet:w-[5.6rem] tablet:h-[5.6rem] tablet:rounded-[0.9rem] tablet:text-[2.6rem] " +
    "mobile:w-[4.4rem] mobile:h-[4.4rem] mobile:rounded-[0.7rem] mobile:text-[2rem]",
};

export { ButtonSizes };
