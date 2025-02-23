"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMyDetails } from "@/app/react-query/user-state";
import { useQueryClient } from "@tanstack/react-query";

interface SidebarProps {
  page: string;
  profileImageUrl?: string;
  onNavigate?: () => void;
  onProfileImageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UserProfileSidebar({
  page,
  onNavigate,
  onProfileImageChange,
}: SidebarProps) {
  const queryClient = useQueryClient();
  const { data: userDetails } = useMyDetails();

  const profileImageUrl =
    userDetails?.profileImageUrl || "/image/profile_default.svg";

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["userDetails"] });
  }, [profileImageUrl, queryClient]);

  const menuItems = [
    { label: "내 정보", link: "/profile", icon: "/image/profile.svg" },
    {
      label: "예약 내역",
      link: "/profile/my-reservations",
      icon: "/image/reservation.svg",
    },
    {
      label: "체험 관리",
      link: "/profile/my-activities",
      icon: "/image/management.svg",
    },
    {
      label: "예약 현황",
      link: "/profile/my-activities/reservation",
      icon: "/image/calendar.svg",
    },
  ];

  return (
    <div className="w-full mobile:px-[1.6rem] mobile:mt-[7rem] flex justify-center min-h-screen">
      <div className="w-[38rem] h-[43.2rem] tablet:w-[25.1rem] mobile:w-[34.4rem] p-[2.4rem] mobile:mt-[7rem] bg-white border border-gray-300 rounded-[1.2rem] space-y-[2.4rem] shadow-md">
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <Image
              src={profileImageUrl}
              alt="Profile"
              width={160}
              height={160}
              className="rounded-full object-cover border border-gray-200"
              style={{ width: "16rem", height: "16rem" }}
            />
            <label
              htmlFor="profile-upload"
              className="absolute bottom-0 right-0 cursor-pointer"
            >
              <Image
                src="/image/btn.svg"
                alt="프로필 이미지 변경"
                width={44}
                height={44}
              />
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                onChange={onProfileImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
        <nav className="space-y-[0.8rem]">
          {menuItems.map((item) => (
            <Link
              href={item.link}
              key={item.label}
              onClick={(e) => {
                if (item.link === "/profile" && onNavigate) {
                  e.preventDefault();
                  onNavigate();
                }
              }}
              className={`flex items-center gap-[1rem] h-[4.4rem] rounded-[0.75rem] text-[1.6rem] pl-[1.6rem] font-bold ${
                page === item.link
                  ? "bg-green-light text-black"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Image
                src={item.icon}
                alt={`${item.label} 아이콘`}
                width={24}
                height={24}
              />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
