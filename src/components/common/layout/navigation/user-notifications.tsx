import Image from "next/image";

export default function UserNotifications() {
  return (
    <div>
      <Image
        src="/image/notification.svg"
        alt="알림 버튼"
        width={24}
        height={24}
      />
    </div>
  );
}
