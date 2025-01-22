// pages/test-profile-sidebar.tsx
import React from "react";
import UserProfileSidebar from "@/components/my-page-card"; // UserProfileSidebar 경로를 적절히 수정하세요

export default function TestProfileSidebar() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <UserProfileSidebar />
    </div>
  );
}
