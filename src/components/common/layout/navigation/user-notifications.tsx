"use client";

import UseOutsideClick from "@/hooks/use-outside-click";
import Image from "next/image";
import { useState } from "react";

interface UserNotificationsProps {
  notifications?: string[];
}

export default function UserNotifications({
  notifications = ["알림 1 테스트", "알림 2 테스트"],
}: UserNotificationsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = UseOutsideClick(() => setIsOpen(false));

  return (
    <div onClick={() => setIsOpen(!isOpen)} ref={ref}>
      <Image
        src="/image/notification.svg"
        alt="알림 버튼"
        width={24}
        height={24}
      />

      {isOpen && (
        <div className="flex bg-">
          <div>
            <span className="text-xl font-bold">알림 6개</span>
            <Image
              src="/image/btn_X.svg"
              alt="알림 닫기"
              width={24}
              height={24}
            />
          </div>
          <ul>
            {notifications.map((notification) => (
              <li key={notification}>{notification}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
