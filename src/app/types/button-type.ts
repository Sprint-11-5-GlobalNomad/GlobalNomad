// 버튼 크기 타입 정의
type ButtonSize = {
  width?: number;
  height?: number;
  radius?: number;
  font_size: number;
};

// 버튼 크기 목록 (모든 값은 rem 단위)
const ButtonSizes: Record<
  string,
  { lg?: ButtonSize; md?: ButtonSize; sm?: ButtonSize }
> = {
  loginSignup: {
    lg: { width: 64, height: 4.8, radius: 0.6, font_size: 1.6 },
    md: { width: 64, height: 4.8, radius: 0.6, font_size: 1.6 },
    sm: { width: 35, height: 4.8, radius: 0.6, font_size: 1.6 },
  },
  modal: {
    lg: { width: 12, height: 4.8, radius: 0.8, font_size: 1.6 },
    md: { width: 12, height: 4.8, radius: 0.8, font_size: 1.6 },
    sm: { width: 13.8, height: 4.2, radius: 0.8, font_size: 1.4 },
  },
  modalDoubleButtons: {
    lg: { width: 8, height: 3.8, radius: 0.6, font_size: 1.4 },
    md: { width: 8, height: 3.8, radius: 0.6, font_size: 1.4 },
    sm: { width: 8, height: 3.8, radius: 0.6, font_size: 1.4 },
  },
  search: {
    lg: { width: 13.6, height: 5.6, radius: 0.4, font_size: 1.6 },
    md: { width: 13.6, height: 5.6, radius: 0.4, font_size: 1.6 },
    sm: { width: 9.6, height: 5.6, radius: 0.4, font_size: 1.6 },
  },
  availableTime: {
    lg: { width: 11.7, height: 4.6, radius: 0.8, font_size: 1.6 },
    md: { width: 11.7, height: 4.6, radius: 0.8, font_size: 1.6 },
    sm: { width: 11.7, height: 4.6, radius: 0.8, font_size: 1.6 },
  },
  reservation: {
    lg: { width: 33.6, height: 5.6, radius: 0.4, font_size: 1.6 },
    md: { width: 20.3, height: 5.6, radius: 0.4, font_size: 1.6 },
    sm: { width: 10.6, height: 4.8, radius: 0.4, font_size: 1.6 },
  },
  dateReservation: {
    lg: { width: 43.2, height: 5.6, radius: 0.4, font_size: 1.6 },
    md: { width: 43.2, height: 5.6, radius: 0.4, font_size: 1.6 },
    sm: { width: 32.7, height: 5.6, radius: 0.4, font_size: 1.6 },
  },
  profileSave: {
    lg: { width: 12, height: 4.8, radius: 0.4, font_size: 1.6 },
    md: { width: 12, height: 4.8, radius: 0.4, font_size: 1.6 },
    sm: { width: 12, height: 4.8, radius: 0.4, font_size: 1.6 },
  },
  review: {
    lg: { width: 14.4, height: 4.3, radius: 0.6, font_size: 1.6 },
    md: { width: 11.2, height: 4.0, radius: 0.6, font_size: 1.6 },
    sm: { width: 8, height: 3.2, radius: 0.6, font_size: 1.4 },
  },
  reviewSubmit: {
    lg: { width: 43.2, height: 5.6, radius: 0.4, font_size: 1.6 },
    md: { width: 43.2, height: 5.6, radius: 0.4, font_size: 1.6 },
    sm: { width: 35, height: 5.4, radius: 0.4, font_size: 1.6 },
  },
  approveReject: {
    lg: { width: 8.2, height: 3.8, radius: 0.6, font_size: 1.4 },
    md: { width: 8.2, height: 3.8, radius: 0.6, font_size: 1.4 },
    sm: { width: 8.2, height: 3.8, radius: 0.6, font_size: 1.4 },
  },
  category: {
    lg: { width: 12.7, height: 5.8, radius: 1.5, font_size: 1.8 },
    md: { width: 12, height: 5.8, radius: 1.5, font_size: 1.8 },
    sm: { width: 8, height: 4.1, radius: 1.5, font_size: 1.6 },
  },
  page: {
    lg: { width: 5.5, height: 5.5, radius: 1.5, font_size: 1.8 },
    md: { width: 5.5, height: 5.5, radius: 1.5, font_size: 1.8 },
    sm: { width: 4, height: 4, radius: 1.5, font_size: 1.8 },
  },
  reservationTime: {
    lg: { width: 5.6, height: 5.6, radius: 0.9, font_size: 2.6 },
    md: { width: 5.6, height: 5.6, radius: 0.9, font_size: 2.6 },
    sm: { width: 4.4, height: 4.4, radius: 0.7, font_size: 2 },
  },
};

export { ButtonSizes };
