"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface SignupFormInputs {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    formState: { errors },
    watch,
    trigger,
    handleSubmit,
  } = useForm<SignupFormInputs>({
    mode: "onBlur",
  });

  const password = watch("password");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const onSubmit = (data: SignupFormInputs) => {
    console.log("회원가입 데이터:", data);
    // 회원가입 처리 로직 (예: API 요청)
    router.push("/welcome"); // 회원가입 완료 후 이동
  };

  return (
    <div>
      <div className="flex flex-col items-center px-4 py-8 max-w-[640px] w-full mx-auto gap-[56px]">
        {/* 로고 섹션 */}
        <div className="flex justify-center mb-8 w-full">
          <Image
            src="/image/logo-big.svg"
            alt="Logo"
            width={340}
            height={192}
            priority
            onClick={() => router.push("/")}
            style={{ cursor: "pointer" }}
          />
        </div>

        {/* 폼 섹션 */}
        <div className="w-full flex flex-col gap-[32px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-[28px]"
          >
            {/* 이메일 */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-[16px] font-normal leading-[26px] text-[#1B1B1B] mb-1"
              >
                이메일
              </label>
              <input
                id="email"
                type="text"
                placeholder="이메일을 입력해 주세요"
                className={`w-full px-[20px] py-[16px] border focus:outline-none rounded-[6px] text-[16px] placeholder-[#A4A1AA] ${
                  errors.email ? "border-[#FF472E]" : "border-[#DDDDDD]"
                }`}
                {...register("email", {
                  required: "이메일을 입력해주세요.",
                  pattern: {
                    value: emailRegex,
                    message: "잘못된 이메일입니다.",
                  },
                })}
                onBlur={() => trigger("email")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-[#FF472E]">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* 닉네임 */}
            <div className="mb-4">
              <label
                htmlFor="nickname"
                className="block text-[16px] font-normal leading-[26px] text-[#1B1B1B] mb-1"
              >
                닉네임
              </label>
              <input
                id="nickname"
                type="text"
                placeholder="닉네임을 입력해 주세요"
                className={`w-full px-[20px] py-[16px] border focus:outline-none rounded-[6px] text-[16px] placeholder-[#A4A1AA] ${
                  errors.nickname ? "border-[#FF472E]" : "border-[#DDDDDD]"
                }`}
                {...register("nickname", {
                  required: "닉네임을 입력해주세요.",
                  minLength: {
                    value: 2,
                    message: "닉네임은 2자 이상이어야 합니다.",
                  },
                })}
                onBlur={() => trigger("nickname")}
              />
              {errors.nickname && (
                <p className="mt-1 text-sm text-[#FF472E]">
                  {errors.nickname.message}
                </p>
              )}
            </div>

            {/* 비밀번호 */}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-[16px] font-normal leading-[26px] text-[#1B1B1B] mb-1"
              >
                비밀번호
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="8자 이상 입력해 주세요"
                className={`w-full px-[20px] py-[16px] border focus:outline-none rounded-[6px] text-[16px] placeholder-[#A4A1AA] ${
                  errors.password ? "border-[#FF472E]" : "border-[#DDDDDD]"
                }`}
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 8자 이상이어야 합니다.",
                  },
                })}
                onBlur={() => trigger("password")}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-[16px] top-[50%] transform -translate-y-1/2 text-[#79747E]"
              >
                {showPassword ? (
                  <Image
                    src="/image/visibility_eye.svg"
                    alt="비밀번호 숨기기"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Image
                    src="/image/visibility_off.svg"
                    alt="비밀번호 보기"
                    width={24}
                    height={24}
                  />
                )}
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-[#FF472E]">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* 비밀번호 확인 */}
            <div className="mb-4 relative">
              <label
                htmlFor="confirmPassword"
                className="block text-[16px] font-normal leading-[26px] text-[#1B1B1B] mb-1"
              >
                비밀번호 확인
              </label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="비밀번호를 한번 더 입력해 주세요"
                className={`w-full px-[20px] py-[16px] border focus:outline-none rounded-[6px] text-[16px] placeholder-[#A4A1AA] ${
                  errors.confirmPassword
                    ? "border-[#FF472E]"
                    : "border-[#DDDDDD]"
                }`}
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password || "비밀번호가 일치하지 않습니다.",
                })}
                onBlur={() => trigger("confirmPassword")}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-[16px] top-[50%] transform -translate-y-1/2 text-[#79747E]"
              >
                {showConfirmPassword ? (
                  <Image
                    src="/image/visibility_eye.svg"
                    alt="비밀번호 숨기기"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Image
                    src="/image/visibility_off.svg"
                    alt="비밀번호 보기"
                    width={24}
                    height={24}
                  />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-[#FF472E]">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* 회원가입 버튼 */}
            <button
              type="submit"
              className="w-full h-[48px] rounded-[6px] bg-[#A4A1AA] text-white flex items-center justify-center text-[16px] font-bold leading-[26px]"
            >
              회원가입하기
            </button>
          </form>

          {/* 회원가입 이동 */}
          <p className="mt-4 text-center font-pretendard text-[16px] text-[#333236] font-normal text-gray-600">
            회원이신가요?{" "}
            <span
              onClick={() => router.push("/signup")} // (5) 회원가입 페이지 이동
              className="font-pretendard text-[16px] font-normal text-[#0B3B2D] cursor-pointer"
            >
              로그인하기
            </span>
          </p>
        </div>
        {/* 소셜 로그인 */}
        <div className="w-full flex flex-col gap-10">
          <div className="flex items-center justify-between my-8">
            <div className="flex-grow h-px bg-[#DDDDDD]"></div>
            <span className="mx-[28px] text-[#79747E] text-[18px] leading-[24px] font-normal">
              SNS 계정으로 회원가입하기
            </span>
            <div className="flex-grow h-px bg-[#DDDDDD]"></div>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <button className="w-[72px] h-[72px] bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg">
              <Image
                src="/image/Google-Icon.svg"
                alt="Google"
                width={27}
                height={27}
                objectFit="cover"
              />
            </button>
            <button className="w-[72px] h-[72px] bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg">
              <Image
                src="/image/Kakao-Icon.svg"
                alt="Kakao"
                width={27}
                height={27}
                objectFit="cover"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
