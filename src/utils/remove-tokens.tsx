export function removeTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}
