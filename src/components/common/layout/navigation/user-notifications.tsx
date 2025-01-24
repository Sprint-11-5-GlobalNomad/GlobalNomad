"use client";

import UseOutsideClick from "@/hooks/use-outside-click";
import Image from "next/image";
import { useState } from "react";
import { foramtTime } from "@/utils/time-utils";
import { highlightText } from "@/utils/higlight-text";
import { useDeleteNotification } from "@/app/react-query/notification-state";
import { AxiosError } from "axios";
// import { fetchNotifications } from "@/app/api/my-notifications-api";
// import { useNotifications } from "@/app/react-query/notification-state";

export default function UserNotifications() {
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

  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockData.notifications);
  const ref = UseOutsideClick(() => setIsOpen(false));

  // const { data, isLoading, error } = useNotifications();

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

  // const {
  //   data,
  //   error,
  //   isLoading,
  //   isFetchingNextPage,
  //   hasNextPage,
  //   fetchNextPage,
  // } = useInfiniteQuery(["notifications"], fetchNotifications, {
  //   getNextPageParam: (lastPage, allPages) => {
  //     return lastPage.nextPage || false;
  //   },
  // });

  const deleteNotification = useDeleteNotification();

  const handleDelete = (id: number) => {
    deleteNotification.mutate(id, {
      onSuccess: () => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== id)
        );
        alert("알림 삭제 성공");
      },
      onError: (error: AxiosError) => {
        alert(`알림 삭제 실패: ${error.message}`);
      },
    });
  };

  // 테스트 후 목 데이터와 함께 삭제해야 함
  const isLoading = false;
  const error = null;

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
                  {/* 알림 {data?.pages?.[0]?.totalCount || 0}개 */}
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
                {notifications.map((notification) => (
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
                        onClick={() => handleDelete(notification.id)}
                      />
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
                {/* </React.Fragment> */}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
