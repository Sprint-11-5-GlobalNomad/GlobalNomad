"use client";

import React, { useState, useEffect } from "react";
import UserProfileSidebar from "@/components/common/layout/profile/my-page-card";
import Button from "@/components/common/ui/button";
import { useUpdateMyDetails, useMyDetails } from "../react-query/user-state";
import { uploadProfileImage } from "../api/user-api";

const currentPage = "/profile";

export default function ProfilePage() {
  const { data: userDetails, isLoading: isFetching } = useMyDetails();
  const { mutate: updateMyDetails, isPending } = useUpdateMyDetails();

  const [nickname, setNickname] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (userDetails?.nickname) setNickname(userDetails.nickname);
    if (userDetails?.profileImageUrl)
      setProfileImageUrl(userDetails.profileImageUrl);
  }, [userDetails]);

  const handleSave = () => {
    if (newPassword && newPassword !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setErrorMessage("");

    const updateData: {
      nickname: string;
      newPassword?: string;
      profileImageUrl?: string;
    } = { nickname };
    if (newPassword) updateData.newPassword = newPassword;
    if (profileImageUrl) updateData.profileImageUrl = profileImageUrl;

    updateMyDetails(updateData, {
      onSuccess: () => alert("정보가 성공적으로 업데이트되었습니다."),
      onError: () => alert("정보 업데이트 중 오류가 발생했습니다."),
    });
  };

  const handleProfileImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];
      try {
        const response = await uploadProfileImage(imageFile);
        setProfileImageUrl(response.profileImageUrl); // 업데이트된 이미지 URL 저장
      } catch (error) {
        console.error("프로필 이미지 업로드 오류:", error);
        alert("프로필 이미지 업로드에 실패했습니다.");
      }
    }
  };

  if (isFetching) return <p>로딩 중...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center py-[7.2rem] mt-[7.2rem]">
        <div className="flex gap-[2.4rem]">
          <UserProfileSidebar
            page={currentPage}
            onProfileImageChange={handleProfileImageChange}
          />
          <div className="flex-1 rounded-[0.75rem] h-auto">
            <div className="flex justify-between items-center w-[78rem] mb-[2.4rem] pb-[2.4rem]">
              <h2 className="text-[3.2rem] font-bold">내 정보</h2>
              <Button
                type="profileSave"
                label={isPending ? "저장 중..." : "저장하기"}
                onClick={handleSave}
                disabled={isPending}
                variant="default"
              />
            </div>
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
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full h-[4.2rem] border ${
                    errorMessage ? "border-red-500" : "border-gray-700"
                  } rounded-[0.5rem] px-[1.2rem] text-[1.2rem]`}
                  placeholder="8자 이상 입력해주세요"
                />
              </div>

              {/* 비밀번호 재입력 */}
              <div>
                <label className="block text-[2.4rem] font-bold mb-[1.6rem]">
                  비밀번호 재입력
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full h-[4.2rem] border ${
                    errorMessage ? "border-red-500" : "border-gray-700"
                  } rounded-[0.5rem] px-[1.2rem] text-[1.2rem]`}
                  placeholder="비밀번호를 한번 더 입력해주세요"
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
