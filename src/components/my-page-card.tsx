"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function UserProfileSidebar() {
  const menuItems = [
    {
      label: "내 정보",
      link: "/profile",
      icon: "/image/profile.svg",
    },
    {
      label: "예약 내역",
      link: "/profile/reservation",
      icon: "/image/reservation.svg",
    },
    {
      label: "체험 관리",
      link: "/profile/activity",
      icon: "/image/management.svg",
    },
    {
      label: "예약 현황",
      link: "/profile/activity/reservation",
      icon: "/image/calendar.svg",
    },
  ];

  const [activeMenu, setActiveMenu] = useState("/profile");
  const [profileImage, setProfileImage] = useState(
    "/image/profile_default.svg"
  );

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="w-[24rem] p-[1.5rem] bg-white border border-gray-300 rounded-[0.75rem] space-y-[1.5rem]">
      <div className="flex flex-col items-center">
        <div className="relative">
          <Image
            src={profileImage}
            alt="Profile"
            width={160}
            height={160}
            className="rounded-full object-cover border border-gray-200"
            style={{
              width: "16rem",
              height: "16rem",
            }}
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
              className="rounded-full"
            />
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              onChange={handleProfileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
      <nav className="space-y-[0.5rem]">
        {menuItems.map((item) => (
          <Link
            href={item.link}
            key={item.label}
            className={`flex items-center gap-[1rem] px-[1rem] py-[0.75rem] rounded-[0.75rem] text-[1.3rem] font-bold ${
              activeMenu === item.link
                ? "bg-green-light text-black"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveMenu(item.link)}
          >
            <Image
              src={item.icon}
              alt={`${item.label} 아이콘`}
              width={24}
              height={24}
              className="h-[1.5rem] w-[1.5rem]"
            />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
