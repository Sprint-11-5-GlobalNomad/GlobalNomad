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

function LoginPage() {
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
    <div className="w-full max-w-md bg-white rounded-md shadow p-6">
      {/** 로고 섹션 */}

      <div className="flex justify-center mb-8">
        <Image
          src="/logo_big.svg"
          alt="Logo"
          width={340}
          height={192}
          priority
          onClick={() => router.push("/")}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/** 폼 섹션 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 이메일 */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block font-semibold text-gray-700 mb-1"
          >
            이메일
          </label>
          <input
            id="email"
            type="text"
            placeholder="이메일 입력"
            // 빨간 테두리: errors.email 있으면 적용
            className={`w-full border-2 rounded px-3 py-2 focus:outline-none 
                ${errors.email ? "border-[#FF472E]" : "border-[#DDDDDD]"}`}
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
            className="block font-semibold text-gray-700 mb-1"
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호 입력"
            className={`w-full border-2 rounded px-3 py-2 focus:outline-none 
                ${errors.password ? "border-[#FF472E]" : "border-[#DDDDDD]"}`}
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
          className="w-full py-2 mt-4 mb-2 text-white rounded bg-[#0085FF]"
        >
          로그인 하기
        </button>
      </form>

      {/* 회원가입 이동 */}
      <p className="mt-4 text-center text-gray-600">
        회원이 아니신가요?{" "}
        <span
          onClick={() => router.push("/signup")} // (5) 회원가입 페이지 이동
          className="font-semibold text-[#0B3B2D] cursor-pointer"
        >
          회원가입하기
        </span>
      </p>
      {/* 소셜 로그인 */}
      <div className="mt-6 flex justify-between">
        <button className="w-1/2 px-4 py-2 bg-gray-200 rounded-md flex items-center justify-center hover:bg-gray-300">
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
          Google
        </button>
        <button className="w-1/2 px-4 py-2 bg-gray-200 rounded-md flex items-center justify-center hover:bg-gray-300">
          <img src="/kakao-icon.svg" alt="Kakao" className="w-5 h-5 mr-2" />
          Kakao
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
