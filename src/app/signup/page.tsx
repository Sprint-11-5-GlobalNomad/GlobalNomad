"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
// import Button from "../../components/common/ui/button";

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
      <div className="flex flex-col items-center px-[1.6rem] py-[3.2rem] max-w-[64rem] w-full mx-auto gap-[5.6rem]">
        {/* 로고 섹션 */}
        <div className="flex justify-center mb-[3.2rem] w-full">
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
        <div className="w-full flex flex-col gap-[4.8rem]">
          <div className="w-full flex flex-col gap-[3.2rem]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-[2.8rem]"
            >
              {/* 이메일 */}
              <div className="mb-[1.6rem]">
                <label
                  htmlFor="email"
                  className="block text-[1.6rem] font-normal leading-[2.6rem] text-[var(--color-black)] mb-[0.4rem]"
                >
                  이메일
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="이메일을 입력해 주세요"
                  className={`w-full px-[2rem] py-[1.6rem] border focus:outline-none rounded-[0.6rem] text-[1.6rem] placeholder-[var(--color-gray-600)] ${
                    errors.email
                      ? "border-[var(--color-red)]"
                      : "border-[var(--color-gray-300)]"
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
                  <p className="mt-[0.4rem] text-[1.2rem] text-[var(--color-red)]">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* 닉네임 */}
              <div className="mb-[1.6rem]">
                <label
                  htmlFor="nickname"
                  className="block text-[1.6rem] font-normal leading-[2.6rem] text-[var(--color-black)] mb-[0.4rem]"
                >
                  닉네임
                </label>
                <input
                  id="nickname"
                  type="text"
                  placeholder="닉네임을 입력해 주세요"
                  className={`w-full px-[2.0rem] py-[1.6rem] border focus:outline-none rounded-[0.6rem] text-[1.6rem] placeholder-[var(--color-gray-600)] ${
                    errors.nickname
                      ? "border-[var(--color-red)]"
                      : "border-[var(--color-gray-300)]"
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
                  <p className="mt-[0.4rem] text-[1.2rem] text-[var(--color-red)]">
                    {errors.nickname.message}
                  </p>
                )}
              </div>

              {/* 비밀번호 */}
              <div className="mb-[1.6rem] relative">
                <label
                  htmlFor="password"
                  className="block text-[1.6rem] font-normal leading-[2.6rem] text-[var(--color-black)] mb-[0.4rem]"
                >
                  비밀번호
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="8자 이상 입력해 주세요"
                  className={`w-full px-[2.0rem] py-[1.6rem] border focus:outline-none rounded-[0.6rem] text-[1.6rem] placeholder-[var(--color-gray-600)] ${
                    errors.password
                      ? "border-[var(--color-red)]"
                      : "border-[var(--color-gray-300)]"
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
                  className="absolute right-[1.6rem] top-[50%] transform -translate-y-1/2 text-[var(--color-gray-800)]"
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
                  <p className="mt-[0.4rem] text-[1.2rem] text-[var(--color-red)]">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* 비밀번호 확인 */}
              <div className="mb-[1.6rem] relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-[1.6rem] font-normal leading-[2.6rem] text-[var(--color-black)] mb-[0.4rem]"
                >
                  비밀번호 확인
                </label>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="비밀번호를 한번 더 입력해 주세요"
                  className={`w-full px-[2.0rem] py-[1.6rem] border focus:outline-none rounded-[0.6rem] text-[1.6rem] placeholder-[var(--color-gray-600)] ${
                    errors.confirmPassword
                      ? "border-[var(--color-red)]"
                      : "border-[var(--color-gray-300)]"
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
                  className="absolute right-[1.6rem] top-[50%] transform -translate-y-1/2 text-[var(--color-gray-800)]"
                >
                  {showConfirmPassword ? (
                    <Image
                      src="/image/visibility_off.svg"
                      alt="비밀번호 보기"
                      width={24}
                      height={24}
                    />
                  ) : (
                    <Image
                      src="/image/visibility_eye.svg"
                      alt="비밀번호 숨기기"
                      width={24}
                      height={24}
                    />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="mt-[0.4rem] text-[1.2rem] text-[var(--color-red)]">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* 회원가입 버튼 */}
              <button
                type="submit"
                className="w-full h-[4.8rem] rounded-[0.6rem] bg-[var(--color-gray-600)] text-[var(--color-gray-0)] flex items-center justify-center text-[1.6rem] font-bold leading-[2.6rem]"
              >
                회원가입하기
              </button>
            </form>

            {/* 회원가입 이동 */}
            <p className="mt-[1.6rem] text-center text-[1.6rem] text-[var(--color-gray-900)] font-normal text-text-[var(gray-600)]">
              회원이신가요?{" "}
              <Link
                href="/signup"
                className="text-[1.6rem] font-normal text-[var(--color-green)] cursor-pointer"
              >
                로그인하기
              </Link>
            </p>
          </div>
          {/* 소셜 로그인 */}
          <div className="w-full flex flex-col gap[4rem]">
            <div className="flex items-center justify-between my-[3.2rem]">
              <div className="flex-grow h-[0.1rem] bg-[var(--color-gray-300)]"></div>
              <span className="mx-[2.8rem] text-[var(--color-gray-800)] text-[1.8rem] leading-[2.4rem] font-normal">
                SNS 계정으로 회원가입하기
              </span>
              <div className="flex-grow h-[0.1rem] bg-[var(--color-gray-300)]"></div>
            </div>
            <div className="mt-[2.4rem] flex justify-center gap-[1.6rem]">
              <button className="w-[7.2rem] h-[7.2rem] bg-[var(--color-gray-0)] rounded-full shadow-md flex items-center justify-center hover:shadow-lg">
                <Image
                  src="/image/Google-Icon.svg"
                  alt="Google"
                  width={27}
                  height={27}
                  objectFit="cover"
                />
              </button>
              <button className="w-[7.2rem] h-[7.2rem] bg-[var(--color-gray-0)] rounded-full shadow-md flex items-center justify-center hover:shadow-lg">
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
    </div>
  );
}
