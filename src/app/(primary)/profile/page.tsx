"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import UserProfileSidebar from "@/components/common/layout/profile/my-page-card";
import Button from "@/components/common/ui/button";
import { useUpdateMyDetails, useMyDetails } from "../../react-query/user-state";

const currentPage = "/profile";

export default function ProfilePage() {
  const { data: userDetails, isLoading } = useMyDetails();
  const { mutate: updateMyDetails, isPending } = useUpdateMyDetails();
  const [nickname, setNickname] = useState("");
  const [originalNickname, setOriginalNickname] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // 초기 닉네임 세팅
  useEffect(() => {
    if (userDetails?.nickname) {
      setNickname(userDetails.nickname);
      setOriginalNickname(userDetails.nickname);
    }
  }, [userDetails]);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 743);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 새 비밀번호가 8자 이상인지
  const isPasswordLengthValid = useMemo(() => {
    if (!newPassword) return true;
    return newPassword.length >= 8;
  }, [newPassword]);

  // 비밀번호 재입력 일치 여부
  const isPasswordMatch = useMemo(() => {
    return newPassword === confirmPassword;
  }, [newPassword, confirmPassword]);

  // 닉네임/비밀번호 중 하나라도 변경 시 저장 가능
  const hasChanges = useMemo(() => {
    const nicknameChanged = nickname !== originalNickname;
    const passwordChanged =
      newPassword.length > 0 || confirmPassword.length > 0;
    return nicknameChanged || passwordChanged;
  }, [nickname, originalNickname, newPassword, confirmPassword]);

  // 저장하기 버튼 클릭
  const handleSave = () => {
    if (!isPasswordLengthValid || !isPasswordMatch) {
      return;
    }

    const updateData: {
      nickname: string;
      newPassword?: string;
    } = { nickname };

    if (newPassword) {
      updateData.newPassword = newPassword;
    }

    updateMyDetails(updateData, {
      onSuccess: () => {
        alert("정보가 성공적으로 업데이트되었습니다.");
        window.location.href = window.location.href;
      },
      onError: () => {
        alert("정보 업데이트 중 오류가 발생했습니다.");
      },
    });
  };

  if (isLoading) return <p>로딩 중...</p>;

  // 모바일
  if (isMobileView && !showDetails) {
    return (
      <UserProfileSidebar
        page={currentPage}
        onNavigate={() => setShowDetails(true)}
        profileImageUrl={userDetails?.profileImageUrl}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center py-[7.2rem] mt-[7.2rem]">
        <div className="flex gap-[2.4rem]">
          {!isMobileView && (
            <UserProfileSidebar
              page={currentPage}
              profileImageUrl={userDetails?.profileImageUrl}
            />
          )}

          <div className="flex-1 rounded-[0.75rem] h-auto">
            {/* 상단 영역 */}
            <div className="flex justify-between items-center w-[78rem] mb-[2.4rem] pb-[2.4rem] tablet:w-[42.9rem] mobile:w-[34.3rem]">
              <h2 className="text-[3.2rem] font-bold">내 정보</h2>
              <Button
                ButtonType="profileSave"
                label={isPending ? "저장 중..." : "저장하기"}
                onClick={handleSave}
                disabled={!hasChanges || isPending}
                variant="default"
              />
            </div>

            {/* 닉네임 */}
            <div className="space-y-[3.2rem]">
              <div>
                <label className="block text-[2.4rem] font-bold mb-[1.6rem]">
                  닉네임
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full h-[4.2rem] border border-gray-700 rounded-[0.5rem] px-[1.2rem] text-[1.2rem]"
                  placeholder="닉네임을 입력하세요"
                />
              </div>

              {/* 이메일 */}
              <div>
                <label className="block text-[2.4rem] font-bold mb-[1.6rem]">
                  이메일
                </label>
                <input
                  type="email"
                  value={userDetails?.email || ""}
                  disabled
                  className="w-full h-[4.2rem] border border-gray-700 rounded-[0.5rem] px-[1.2rem] text-[1.2rem] bg-gray-100"
                />
              </div>

              {/* 새 비밀번호 */}
              <div>
                <label className="block text-[2.4rem] font-bold mb-[1.6rem]">
                  새 비밀번호
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`w-full h-[4.2rem] border ${
                      !isPasswordLengthValid && newPassword
                        ? "border-red-500"
                        : "border-gray-700"
                    } rounded-[0.5rem] px-[1.2rem] text-[1.2rem]`}
                    placeholder="8자 이상 입력해주세요"
                  />
                  <span
                    className="absolute right-[1rem] top-[50%] -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    <Image
                      src={
                        showNewPassword
                          ? "/image/visibility_off.svg"
                          : "/image/visibility_eye.svg"
                      }
                      alt="Toggle Password"
                      width={24}
                      height={24}
                    />
                  </span>
                </div>
                {!isPasswordLengthValid && newPassword && (
                  <p className="text-red-500 text-[1.2rem] mt-[0.5rem]">
                    8자 이상 입력해주세요.
                  </p>
                )}
              </div>

              {/* 비밀번호 재입력 */}
              <div>
                <label className="block text-[2.4rem] font-bold mb-[1.6rem]">
                  비밀번호 재입력
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full h-[4.2rem] border ${
                      !isPasswordMatch && confirmPassword
                        ? "border-red-500"
                        : "border-gray-700"
                    } rounded-[0.5rem] px-[1.2rem] text-[1.2rem]`}
                    placeholder="비밀번호를 한번 더 입력해주세요"
                  />
                  <span
                    className="absolute right-[1rem] top-[50%] -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Image
                      src={
                        showConfirmPassword
                          ? "/image/visibility_off.svg"
                          : "/image/visibility_eye.svg"
                      }
                      alt="Toggle Confirm Password"
                      width={24}
                      height={24}
                    />
                  </span>
                </div>
                {!isPasswordMatch && confirmPassword && (
                  <p className="text-red-500 text-[1.2rem] mt-[0.5rem]">
                    비밀번호가 일치하지 않습니다.
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
