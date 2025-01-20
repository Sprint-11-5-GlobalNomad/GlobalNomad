// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// interface MenuItem {
//   label: string;
//   link: string;
// }

// interface UserProfileSidebarProps {
//   ProfileImage: string; // 초기 프로필 이미지 URL
//   menuItems: MenuItem[]; // 메뉴 항목
//   activeMenu: string; // 현재 활성화된 메뉴
// }

// export default function UserProfileSidebar({
//   ProfileImage,
//   menuItems,
//   activeMenu,
// }: UserProfileSidebarProps) {
//   const [profileImage, setProfileImage] = useState(ProfileImage);

//   const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         if (e.target?.result) {
//           setProfileImage(e.target.result as string); // 이미지 미리보기
//         }
//       };
//       reader.readAsDataURL(event.target.files[0]);
//     }
//   };
