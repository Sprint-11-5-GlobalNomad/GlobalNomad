"use client";

import React, { useState, useEffect } from "react";
import UserProfileSidebar from "@/components/my-page-card";
import Button from "@/components/common/ui/button";
import { useUpdateMyDetails } from "../react-query/user-state";
import { fetchMyDetails } from "../api/user-api";

export default function ProfilePage() {
  const currentPage = "/profile";

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const { mutate: updateMyDetails, isLoading } = useUpdateMyDetails();

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const userDetails = await fetchMyDetails();
        setNickname(userDetails.nickname || "");
        setEmail(userDetails.email || "");
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류 발생:", error);
      }
    };

    loadUserDetails();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // 모바일 감지
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSave = () => {
    if (newPassword && newPassword !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setErrorMessage("");
    updateMyDetails(
      { nickname, newPassword },
      {
        onSuccess: () => {
          alert("정보가 성공적으로 업데이트되었습니다.");
        },
        onError: () => {
          alert("정보 업데이트 중 오류가 발생했습니다.");
        },
      }
    );
  };

  if (isMobileView && !showDetails) {
    return (
      <UserProfileSidebar
        page={currentPage}
        onNavigate={() => setShowDetails(true)}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center  py-[7.2rem]">
        <div className="flex gap-[2.4rem]">
          {!isMobileView && (
            <div>
              <UserProfileSidebar page={currentPage} />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 rounded-[0.75rem] h-auto">
            {/* Header */}
            <div className="flex justify-between items-center w-[78rem] mb-[2.4rem] pb-[2.4rem] tablet:w-[42.9rem] mobile:w-[34.3rem]">
              <h2 className="text-[3.2rem] font-bold">내 정보</h2>
              <Button
                type="profileSave"
                label={isLoading ? "저장 중..." : "저장하기"}
                onClick={handleSave}
                disabled={isLoading}
                variant="default"
              />
            </div>

            {/* Form */}
            <div className="space-y-[3.2rem]">
              {/* 닉네임 */}
              <div>
                <label className="block text-[2.4rem] font-bold mb-[0.5rem]">
                  닉네임
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full h-[4.2rem] border border-gray-300 rounded-[0.5rem] px-[1.2rem] text-[1.2rem]"
                  placeholder="닉네임을 입력하세요"
                />
              </div>

              {/* 이메일 수정 불가능 */}
              <div>
                <label className="block text-[2.4rem] font-bold mb-[0.5rem]">
                  이메일
                </label>
                <input
                  type="email"
                  value={email}
                  disabled // 창 비활성화
                  className="w-full h-[4.2rem] border border-gray-300 rounded-[0.5rem] px-[1.2rem] text-[1.2rem] bg-gray-100"
                />
              </div>

              {/* 새 비밀번호 */}
              <div>
                <label className="block text-[2.4rem] font-bold mb-[0.5rem]">
                  새 비밀번호
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full h-[4.2rem] border ${
                    errorMessage ? "border-red-500" : "border-gray-300"
                  } rounded-[0.5rem] px-[1.2rem] text-[1.2rem]`}
                  placeholder="새 비밀번호를 입력하세요"
                />
              </div>

              {/* 비밀번호 재입력 */}
              <div>
                <label className="block text-[2.4rem] font-bold mb-[0.5rem]">
                  비밀번호 재입력
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full h-[4.2rem] border ${
                    errorMessage ? "border-red-500" : "border-gray-300"
                  } rounded-[0.5rem] px-[1.2rem] text-[1.2rem]`}
                  placeholder="비밀번호를 한번 더 입력하세요"
                  onBlur={() => {
                    if (newPassword && newPassword !== confirmPassword) {
                      setErrorMessage("비밀번호가 일치하지 않습니다.");
                    } else {
                      setErrorMessage("");
                    }
                  }}
                />
                {errorMessage && (
                  <p className="text-red-500 text-[1.2rem] mt-[0.5rem]">
                    {errorMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
