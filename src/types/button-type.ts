// 버튼 크기 타입 정의
type ButtonSize = {
  width?: number;
  height?: number;
  radius?: number;
};

// 버튼 크기 목록
const ButtonSizes: Record<
  string,
  { lg?: ButtonSize; md?: ButtonSize; sm?: ButtonSize }
> = {
  loginSignup: {
    // 로그인/회원가입
    lg: { width: 640, height: 48, radius: 6 },
    md: { width: 350, height: 48, radius: 6 },
    sm: { width: 350, height: 48, radius: 6 },
  },
  modal: {
    // 모달
    lg: { width: 120, height: 48, radius: 8 },
    md: { width: 120, height: 48, radius: 8 },
    sm: { width: 138, height: 42, radius: 8 },
  },
  modalDoubleButtons: {
    // 모달 2버튼
    lg: { width: 80, height: 38, radius: 6 },
    md: { width: 80, height: 38, radius: 6 },
    sm: { width: 80, height: 38, radius: 6 },
  },
  search: {
    // 검색하기
    lg: { width: 136, height: 56, radius: 4 },
    md: { width: 136, height: 56, radius: 4 },
    sm: { width: 56, height: 26, radius: 4 },
  },
  availableTime: {
    // 예약 가능 시간
    lg: { width: 117, height: 46, radius: 8 },
    md: { width: 117, height: 46, radius: 8 },
    sm: { width: 117, height: 46, radius: 8 },
  },
  reservation: {
    // 예약하기
    lg: { width: 336, height: 56, radius: 4 },
    md: { width: 203, height: 56, radius: 4 },
    sm: { width: 106, height: 48, radius: 4 },
  },
  dateReservation: {
    // 날짜 예약하기
    md: { width: 432, height: 56, radius: 4 }, // 테블릿
    sm: { width: 327, height: 56, radius: 4 }, // 모바일
  },
  profileSave: {
    // 프로필 저장하기 / 체험 등록하기 / 내 체험 수정
    lg: { width: 120, height: 48, radius: 4 },
    md: { width: 120, height: 48, radius: 4 },
    sm: { width: 120, height: 48, radius: 4 },
  },
  reviewCancel: {
    // 후기 작성 / 예약 취소
    lg: { width: 144, height: 43, radius: 6 },
    md: { width: 112, height: 40, radius: 6 },
    sm: { width: 80, height: 32, radius: 6 },
  },
  reviewSubmit: {
    // 후기 작성 제출
    lg: { width: 432, height: 56, radius: 4 },
    md: { width: 432, height: 56, radius: 4 },
    sm: { width: 350, height: 54, radius: 4 },
  },
  approveReject: {
    // 승인하기 / 거절하기
    lg: { width: 82, height: 38, radius: 6 },
    md: { width: 82, height: 38, radius: 6 },
    sm: { width: 82, height: 38, radius: 6 },
  },
};

export { ButtonSizes };
