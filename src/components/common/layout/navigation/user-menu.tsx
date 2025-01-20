"use client";

import { useUserStore } from "@/stores/user-store";
import Link from "next/link";
import UserNotifications from "@/components/common/layout/navigation/user-notifications";
import Image from "next/image";
import { useState } from "react";

export default function UserMenu() {
  const { isAuthenticated, logout, currentUser } = useUserStore(
    (state) => state
  );
  // useUserStore(state) 가 아닌 이유: useUserStore 는 기본적으로 선택자 함수를 인수로 받도록 설계되어 있기 때문

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="flex-between gap-[2.5rem]">
          <UserNotifications />
          <div
            onClick={handleToggleDropdown}
            className="flex-between gap-[1rem] border-solid border-l-[0.1rem] border-gray-300 pl-[2rem]"
          >
            <Image
              src={currentUser?.profileImageUrl || "/image/profile_default.svg"}
              alt="프로필 이미지"
              width={32}
              height={32}
            />
            <p className="text-md">{currentUser?.nickname || "닉네임"}</p>
            {isOpen && (
              <div>
                <Link href="/profile">마이 페이지</Link>
                <button onClick={logout}>로그아웃</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex gap-[2.5rem]">
          <Link href="/login" className="text-md text-black">
            로그인
          </Link>
          <Link href="/signup" className="text-md text-black">
            회원가입
          </Link>
        </div>
      )}
    </>
  );
}
