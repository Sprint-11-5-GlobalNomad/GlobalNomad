"use client";

import UseOutsideClick from "@/hooks/use-outside-click";
import Image from "next/image";
import { useState } from "react";
import { formatTime } from "@/utils/time-utils";
import { highlightText } from "@/utils/higlight-text";
import {
  useDeleteNotification,
  useNotifications,
} from "@/app/react-query/notification-state";
import { LoadingIndicator } from "../indicator/loading-indicator";
import { ErrorIndicator } from "../indicator/error-indicator";

export default function UserNotifications() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = UseOutsideClick(() => setIsOpen(false));

  const { data: notificationResponse, isLoading, isError } = useNotifications();

  // 목업 데이터를 직접 설정

  function getNotificationStatusColor(content: string) {
    if (content.includes("승인")) {
      return "bg-blue";
    } else if (content.includes("거절")) {
      return "bg-red";
    } else {
      return "bg-green";
    }
  }

  const { mutate: deleteNotification } = useDeleteNotification();

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
        // 무한 스크롤 구현하며 기본 높이 수정 필요
        <div
          className="flex flex-col w-[36.8rem] h-[35.6rem] 
        border rounded-[1rem] border-gray-400 bg-green-light shadow-notifications 
        px-[2rem] py-[2.4rem] gap-[1.6rem] overflow-auto
        absolute left-[-2rem] transform -translate-x-1/2 top-[5.6rem]
        mobile:w-full mobile:h-full mobile:py-[4rem] mobile:top-0 mobile:left-0 
        mobile:rounded-[0rem] mobile:transform-none mobile:fixed"
        >
          {isLoading ? (
            <LoadingIndicator width={30} height={30} />
          ) : isError ? (
            <ErrorIndicator width={30} height={30} />
          ) : (
            <>
              <div className="flex-between absoulte">
                <span className="text-xl font-bold">
                  알림 {notificationResponse?.totalCount}개
                </span>
                <Image
                  src="/image/btn_X.svg"
                  alt="알림창 닫기 버튼"
                  width={24}
                  height={24}
                  onClick={() => setIsOpen(false)}
                />
              </div>

              <ul className="flex flex-col gap-[0.8rem]">
                {notificationResponse?.notifications?.map((notification) => (
                  // {data?.pages?.map((page, pageIndex) => <React.Fragment key={pageIndex}>
                  <div
                    key={notification.id}
                    className="bg-white border border-gray-400 rounded-[0.5rem]
                     px-[1.2rem] py-[1.6rem] gap-[0.4rem]"
                  >
                    <div className="flex justify-between">
                      <div
                        className={`w-[0.5rem] h-[0.5rem] rounded-full 
                          ${getNotificationStatusColor(notification.content)}`}
                      ></div>
                      <Image
                        src="/image/btn_X_gray_medium.svg"
                        alt="알림 내용 닫기 버튼"
                        width={24}
                        height={24}
                        onClick={() => deleteNotification(notification.id)}
                      />
                    </div>

                    <div>
                      <li className="text-md font-regular">
                        {highlightText(notification.content)}
                      </li>
                      <time className="text-xs font-regular text-gray-600">
                        {formatTime(notification.updatedAt)}
                      </time>
                    </div>
                  </div>
                ))}
                {/* </React.Fragment> */}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
