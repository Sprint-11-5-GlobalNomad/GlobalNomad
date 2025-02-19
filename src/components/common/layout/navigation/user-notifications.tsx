"use client";

import UseOutsideClick from "@/hooks/use-outside-click";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatTime } from "@/utils/time-utils";
import { highlightText } from "@/utils/higlight-text";
import { useDeleteNotification } from "@/app/react-query/notification-state";
import { ErrorIndicator } from "../indicator/error-indicator";
import { useInfiniteNotifications } from "@/app/react-query/use-infinite-scroll";
import { useInView } from "react-intersection-observer";

export default function UserNotifications() {
  const [isOpen, setIsOpen] = useState(false);
  const outsideClickRef = UseOutsideClick(() => setIsOpen(false));

  const {
    data: notificationResponse,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteNotifications();

  const notifications =
    notificationResponse?.pages.flatMap((page) => page.notifications) || [];

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isLoading]);

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

  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) refetch();
  };

  return (
    <div ref={outsideClickRef} className="flex flex-col relative">
      <Image
        src="/image/notification.svg"
        alt="알림 버튼"
        width={24}
        height={24}
        onClick={handleOpen}
      />

      {isOpen && (
        // 무한 스크롤 구현하며 기본 높이 수정 필요
        <div
          className="flex flex-col w-[36.8rem] h-[35.6rem] 
        border rounded-[1rem] border-gray-400 bg-green-light shadow-notifications 
        px-[2rem] py-[2.4rem] gap-[1.6rem] overflow-auto hide-scrollbar
        absolute left-[-2rem] transform -translate-x-1/2 top-[5.6rem]
        mobile:w-full mobile:h-full mobile:py-[4rem] mobile:top-0 mobile:left-0 
        mobile:rounded-[0rem] mobile:transform-none mobile:fixed"
        >
          {isLoading ? (
            <>
              <div className="flex-between absoulte">
                <span className="text-xl font-bold">알림 0개</span>
                <Image
                  src="/image/btn_X.svg"
                  alt="알림창 닫기 버튼"
                  width={24}
                  height={24}
                  onClick={() => setIsOpen(false)}
                />
              </div>
              <div className="flex flex-col gap-[0.8rem]">
                <div className="w-[32.8rem] h-[12.6rem] mobile:w-[33.5rem] mobile:h-[10.5rem] skeleton" />
                <div className="w-[32.8rem] h-[12.6rem] mobile:w-[33.5rem] mobile:h-[10.5rem] skeleton" />
                <div className="w-[32.8rem] h-[12.6rem] mobile:w-[33.5rem] mobile:h-[10.5rem] skeleton" />
              </div>
            </>
          ) : isError ? (
            <ErrorIndicator width={30} height={30} />
          ) : (
            <>
              <div className="flex-between absoulte">
                <span className="text-xl font-bold">
                  알림 {notificationResponse?.pages[0].totalCount || 0}개
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
                {notifications?.map((notification) => (
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
              </ul>
              {isFetchingNextPage && (
                <div className="w-[32.8rem] h-[12.6rem] mobile:w-[33.5rem] mobile:h-[10.5rem] skeleton" />
              )}
              <div ref={inViewRef}></div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
