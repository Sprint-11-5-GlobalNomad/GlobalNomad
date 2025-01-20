"use client";

import { useUserStore } from "@/stores/user-store";
import Link from "next/link";
import UserNotifications from "./user-notifications";
import Image from "next/image";
import { useState } from "react";

export default function UserMenu() {
  const { isAuthenticated, logout, currentUser } = useUserStore((state) => ({
    isAuthenticated: true,
    // state.isAuthenticated
    logout: state.logout,
    currentUser: state.currentUser,
  }));

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
            className="flex-between gap-[1rem] border-l-[2.2rem] border-gray-300"
            // border 제대로 지정 안 됨. 수정 필요
          >
            <Image
              src={currentUser?.profileImageUrl || "/image/profile_default.svg"}
              alt="프로필 이미지"
              width={32}
              height={32}
            />
            <p className="text-md">{currentUser?.nickname || "호날두"}</p>
            {/*test 끝나면 호날두 지워야 함. 닉네임 값 무조건 있음. */}
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
