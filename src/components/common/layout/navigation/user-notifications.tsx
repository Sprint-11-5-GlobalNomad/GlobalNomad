"use client";

import UseOutsideClick from "@/hooks/use-outside-click";
import Image from "next/image";
import { useState } from "react";
import CloseButton from "../../icons/close-button";

interface UserNotificationsProps {
  notifications?: string[];
}

export default function UserNotifications({
  notifications = ["알림 1 테스트", "알림 2 테스트"],
}: UserNotificationsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = UseOutsideClick(() => setIsOpen(false));

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div onClick={() => setIsOpen(!isOpen)} ref={ref} className="flex flex-col">
      <Image
        src="/image/notification.svg"
        alt="알림 버튼"
        width={24}
        height={24}
      />

      {isOpen && (
        <div className="flex-between w-[36.8rem] max-h-[46.9rem] bg-green-light shadow-notifications">
          <div className="flex">
            <span className="text-xl font-bold">알림 6개</span>
            <CloseButton theme="default" size="small" onClick={handleClose} />
          </div>
          <ul className="flex flex-col">
            <span className=""></span>
            <CloseButton theme="gray" size="small" onClick={handleClose} />
            {notifications.map((notification) => (
              <li key={notification} className="bg-white">
                {notification}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
