"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios"; // import useAuthStore from '../stores/authStore';
import Image from "next/image";
// import Modal from '';
// import Button from '';

interface LoginFormInputs {
  email: string;
  password: string;
}

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function LoginPage() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<LoginFormInputs>({
    mode: "onBlur",
  });
  // const { login } = useAuthStore();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const { email, password } = data;
  };

  return (
    <div>
      <div className="flex flex-col items-center px-4 py-8 max-w-[640px] w-full mx-auto gap-[56px] ">
        {/** 로고 섹션 */}
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

        {/** 폼 섹션 */}
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
                placeholder="이메일 입력"
                // 빨간 테두리: errors.email 있으면 적용
                className={`
              w-full
              px-[20px] py-[16px]
              border
              focus:outline-none
              rounded-[6px]
              font-pretendard text-[16px] font-normal leading-[26px]
              placeholder-[#A4A1AA]
              ${errors.email ? "border-[#FF472E]" : "border-[#DDDDDD]"}
            `}
                {...register("email", {
                  required: "잘못된 이메일입니다.",
                  pattern: {
                    value: emailRegex,
                    message: "잘못된 이메일입니다.",
                  },
                })}
                onBlur={() => trigger("email")}
              />
              {/* 이메일 에러 메시지 */}
              {errors.email && (
                <p className="mt-1 text-sm text-[#FF472E]">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* 비밀번호 */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-[16px] font-normal leading-[26px] text-[#1B1B1B] mb-1"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                placeholder="비밀번호 입력"
                className={`
              w-full
              px-[20px] py-[16px]
              border
              focus:outline-none
              rounded-[6px]
              font-pretendard text-[16px] font-normal leading-[26px]
              placeholder-[#A4A1AA]
              ${errors.password ? "border-[#FF472E]" : "border-[#DDDDDD]"}
            `}
                {...register("password", {
                  required: "8자 이상 작성해주세요.",
                  minLength: {
                    value: 8,
                    message: "8자 이상 작성해주세요.",
                  },
                })}
                onBlur={() => trigger("password")}
              />
              {/* 비밀번호 에러 메시지 */}
              {errors.password && (
                <p className="mt-1 text-sm text-[#FF472E]">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              className={`
            flex items-center justify-center 
            w-full h-[48px] 
            px-[136px] py-[14px] gap-[8px] 
            rounded-[6px] bg-[#A4A1AA] text-white
          `}
            >
              <span
                className={`
      text-[16px] font-bold leading-[26px] text-center
    `}
              >
                로그인 하기
              </span>
            </button>
          </form>

          {/* 회원가입 이동 */}
          <p className="mt-4 text-center font-pretendard text-[16px] font-normal text-gray-600">
            회원이 아니신가요?{" "}
            <span
              onClick={() => router.push("/signup")} // (5) 회원가입 페이지 이동
              className="font-pretendard text-[16px] font-normal text-[#0B3B2D] cursor-pointer"
            >
              회원가입하기
            </span>
          </p>
        </div>
        {/* 소셜 로그인 */}
        <div className="w-full flex flex-col gap-10">
          <div className="flex items-center justify-between my-8">
            <div className="flex-grow h-px bg-[#DDDDDD]"></div>
            <span className="mx-[28px] text-[#79747E] text-[18px] leading-[24px] font-normal">
              SNS 계정으로 로그인하기
            </span>
            <div className="flex-grow h-px bg-[#DDDDDD]"></div>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <button className="w-[72px] h-[72px] bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg">
              <img
                src="/image/Google-Icon.svg"
                alt="Google"
                className="w-[27px] h-[27px]"
              />
            </button>
            <button className="w-[72px] h-[72px] bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg">
              <img
                src="/image/Kakao-Icon.svg"
                alt="Kakao"
                className="w-[27px] h-[27px]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
