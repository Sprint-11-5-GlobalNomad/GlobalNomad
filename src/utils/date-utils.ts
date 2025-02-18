export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}

export function formatTwoDigits(dateString: string) {
  return new Date(dateString)
    .toLocaleDateString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\./g, "")
    .replace(/ /g, "/");
}

export function formatTime(time: number) {
  const startHour = time;
  const endHour = time + 1;
  return `${String(startHour).padStart(2, "0")}:00~${String(endHour).padStart(2, "0")}:00`;
}
