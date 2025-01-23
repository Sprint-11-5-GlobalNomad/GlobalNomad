"use client";

import UseOutsideClick from "@/hooks/use-outside-click";
import Image from "next/image";
import { useState } from "react";
import CloseButton from "../../icons/close-button";
import { foramtTime } from "@/utils/time-utils";
import { highlightText } from "@/utils/higlight-text";
// import { useNotifications } from "@/app/react-query/notification-state";

export default function UserNotifications() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = UseOutsideClick(() => setIsOpen(false));

  // const { data, isLoading, error } = useNotifications();

  // 목업 데이터를 직접 설정
  const mockData = {
    totalCount: 3,
    notifications: [
      {
        id: 1,
        userId: 123,
        content:
          "함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 승인되었어요.",
        createdAt: "2025-01-22T07:46:32.165Z",
        updatedAt: "2025-01-22T23:59:32.165Z",
        // deletedAt: "2025-01-22T07:46:32.165Z",
        createdTime: "07:46", // 추가된 시간 정보
        updatedTime: "07:46", // 추가된 시간 정보
      },
      {
        id: 2,
        userId: 124,
        content:
          "함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 거절되었어요.",
        createdAt: "2025-01-21T07:46:32.165Z",
        updatedAt: "2025-01-22T07:46:32.165Z",
        // deletedAt: "2025-01-21T07:46:32.165Z",
        createdTime: "07:46",
        updatedTime: "07:46",
      },
      {
        id: 3,
        userId: 125,
        content:
          "함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 새로 들어왔어요.",
        createdAt: "2025-01-21T07:46:32.165Z",
        updatedAt: "2025-01-21T07:46:32.165Z",
        deletedAt: "2025-01-21T07:46:32.165Z",
        createdTime: "07:46",
        updatedTime: "07:46",
      },
    ],
  };

  function getStatusColor(content: string) {
    if (content.includes("승인")) {
      return "bg-blue";
    } else if (content.includes("거절")) {
      return "bg-red";
    } else {
      return "bg-green";
    }
  }

  // 테스트 후 목 데이터와 함께 삭제해야 함
  const isLoading = false;
  const error = null;

  const handleClose = () => {
    setIsOpen(false);
  };

  // 알림 버튼 누를 때마다 데이터 가져오도록 설정 필요

  return (
    <div ref={ref} className="flex flex-col relative">
      <Image
        src="/image/notification.svg"
        alt="알림 버튼"
        width={24}
        height={24}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div
          className="flex flex-col w-[36.8rem] min-h-[20.6rem] max-h-[49.4rem] 
        border rounded-[1rem] border-gray-400 bg-green-light shadow-notifications 
        px-[2rem] py-[2.4rem] gap-[1.6rem]
        absolute left-[-2rem] transform -translate-x-1/2 top-[5.6rem]"
        >
          {isLoading ? (
            <span className="text-lg text-center">로딩 중...</span>
          ) : error ? (
            <span className="text-lg text-center">
              Error:
              {/* {error.message} */}
            </span>
          ) : (
            <>
              <div className="flex-between absoulte">
                <span className="text-xl font-bold">
                  알림 {mockData?.totalCount}개
                </span>
                <CloseButton size="small" onClick={handleClose} />
              </div>

              <ul className="flex flex-col gap-[0.8rem]">
                {mockData?.notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="bg-white border border-gray-400 rounded-[0.5rem]
                     px-[1.2rem] py-[1.6rem] gap-[0.4rem]"
                  >
                    <div className="flex justify-between">
                      <div
                        className={`w-[0.5rem] h-[0.5rem] rounded-full 
                          ${getStatusColor(notification.content)}`}
                      ></div>
                      {/* 예약 상태에 따라 색상 변하는 점 구현 */}
                      <CloseButton theme="gray" size="small" />
                    </div>

                    <div>
                      <li className="text-md font-regular">
                        {highlightText(notification.content)}
                      </li>
                      <time className="text-xs font-regular text-gray-600">
                        {foramtTime(notification.updatedAt)}
                      </time>
                    </div>
                  </div>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
