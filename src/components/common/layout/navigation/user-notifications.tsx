"use client";

import UseOutsideClick from "@/hooks/use-outside-click";
import Image from "next/image";
import { useState } from "react";
import CloseButton from "../../icons/close-button";

interface Notification {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

interface NotificationResponse {
  cursorId: number;
  totalCount: number;
  notifications: Notification[];
}

export default function UserNotifications({
  notifications = [
    {
      id: 1,
      userId: 123,
      content:
        "함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 승인되었어요.",
      createdAt: "2025-01-22T07:46:32.165Z",
      updatedAt: "2025-01-22T07:46:32.165Z",
      deletedAt: "2025-01-22T07:46:32.165Z",
    },
    {
      id: 2,
      userId: 124,
      content:
        "함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 거절되었어요.",
      createdAt: "2025-01-21T07:46:32.165Z",
      updatedAt: "2025-01-21T07:46:32.165Z",
      deletedAt: "2025-01-21T07:46:32.165Z",
    },
    {
      id: 3,
      userId: 125,
      content:
        "함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 새로 들어왔어요.",
      createdAt: "2025-01-21T07:46:32.165Z",
      updatedAt: "2025-01-21T07:46:32.165Z",
      deletedAt: "2025-01-21T07:46:32.165Z",
    },
  ],
}: NotificationResponse) {
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
            <div className="flex">
              <span className="">.</span>
              {/* 예약 상태에 따라 색상 변하는 점 구현 */}
              <CloseButton theme="gray" size="small" onClick={handleClose} />
            </div>
            {notifications.map((notification) => (
              <div className="bg-white">
                <li key={notification.id} className="text-md font-regular">
                  {notification.content}
                </li>
                {/* <time key={notification} className="text-xs font-regular color-gray-600">몇분 전</time> */}
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
