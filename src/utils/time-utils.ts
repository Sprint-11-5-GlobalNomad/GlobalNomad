import { formatDistanceToNowStrict } from "date-fns";
import { ko } from "date-fns/locale";

export function formatTime(dateString: string) {
  return formatDistanceToNowStrict(new Date(dateString), {
    addSuffix: true,
    locale: ko,
  });
}
