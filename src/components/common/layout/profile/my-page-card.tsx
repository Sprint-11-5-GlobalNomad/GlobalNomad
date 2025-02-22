"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useMyDetails, useUpdateMyDetails } from "@/app/react-query/user-state";
import { uploadProfileImage } from "@/app/(primary)/api/user-api";

interface SidebarProps {
  page: string;
  profileImageUrl?: string;
  onNavigate?: () => void;
}

export default function UserProfileSidebar({
  page,
  profileImageUrl,
  onNavigate,
}: SidebarProps) {
  const { data: userDetails } = useMyDetails();
  const { mutate: updateMyDetails } = useUpdateMyDetails();

  const finalProfileImageUrl =
    userDetails?.profileImageUrl ||
    profileImageUrl ||
    "/image/profile_default.svg";

  //프로필이미지변경
  const handleProfileImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];
      try {
        const response = await uploadProfileImage(imageFile);
        updateMyDetails(
          { profileImageUrl: response.profileImageUrl },
          {
            onSuccess: () => {
              window.location.href = window.location.href;
            },
            onError: () => {
              alert("프로필 이미지를 업데이트하는 중 오류가 발생했습니다.");
            },
          }
        );
      } catch (error) {
        console.error("프로필 이미지 업로드 오류:", error);
        alert("프로필 이미지 업로드에 실패했습니다.");
      }
    }
  };

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
      <div className="w-[38rem] h-[43.2rem] p-[2.4rem] mobile:mt-[7rem] bg-white border border-gray-300 rounded-[1.2rem] space-y-[2.4rem] shadow-md">
        {/* 프로필 이미지 영역 */}
        <div className="flex flex-col items-center justify-center">
          <div
            className="relative cursor-pointer"
            onClick={() => {
              document.getElementById("profile-upload")?.click();
            }}
          >
            <Image
              src={finalProfileImageUrl}
              alt="Profile"
              width={160}
              height={160}
              className="rounded-full object-cover border border-gray-200"
              style={{ width: "16rem", height: "16rem" }}
            />
            <div className="absolute bottom-0 right-0 pointer-events-none">
              <Image
                src="/image/btn.svg"
                alt="프로필 이미지 변경"
                width={44}
                height={44}
              />
            </div>
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* 사이드바 메뉴 */}
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
