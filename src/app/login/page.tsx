"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useLogin } from "../react-query/oauth-state";
import Image from "next/image";
import Link from "next/link";
import MessageModal from "../../components/common/ui/modal/message-modal";
import Button from "../../components/common/ui/button";
import { AxiosError } from "axios";

interface LoginFormInputs {
  email: string;
  password: string;
}

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    message: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const loginMutation = useLogin();
  const router = useRouter();

  const {
    register,
    formState: { errors },
    trigger,
    handleSubmit,
    watch,
  } = useForm<LoginFormInputs>({
    mode: "onBlur",
  });

  React.useEffect(() => {
    const email = watch("email");
    const password = watch("password");
    const isEmailValid = emailRegex.test(email); // 이메일 유효성 체크
    const isPasswordValid = password.length >= 8; // 비밀번호 유효성 체크
    setIsButtonDisabled(!(isEmailValid && isPasswordValid)); // 둘 다 유효하면 버튼 활성화
  }, [watch("email"), watch("password")]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // 모달 열기 함수
  const openModal = (message: string) => {
    setModalState({ isOpen: true, message });
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setModalState({ isOpen: false, message: "" });
  };

  const onSubmit = (data: LoginFormInputs) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        window.location.href = "/";
      },
      onError: (error) => {
        // error를 안전하게 처리
        if (error instanceof AxiosError) {
          const errorMessage =
            error.response?.data?.message || "로그인에 실패했습니다.";
          openModal(errorMessage);
        }
      },
    });
  };

  // 로그인 상태에서 리디렉션
  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // 예시: localStorage 사용
    if (token) {
      router.replace("/"); // 로그인 상태면 메인 페이지로 리디렉션
    }
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center my-[11.8rem] py-[3.2rem] max-w-[64rem] w-full mx-auto gap-[5.6rem]">
        {/** 로고 섹션 */}
        <div className="flex justify-center mb-[3.2rem] w-full">
          <Image
            src="/image/logo-big.svg"
            alt="Logo"
            width={340}
            height={192}
            priority
            onClick={() => router.push("/")}
            className="cursor-pointer"
          />
        </div>

        {/** 폼 섹션 */}
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
                placeholder="이메일 입력"
                // 빨간 테두리: errors.email 있으면 적용
                className={`
                  w-full
                  px-[2rem] py-[1.6rem]
                  border
                  focus:outline-none
                  rounded-[0.6rem]
                  text-[1.6rem] font-normal leading-[2.6rem]
                  placeholder-[var(--color-gray-600)]
                  ${errors.email ? "border-[var(--color-red)]" : "border-[var(--color-gray-300)]"}
                `}
                {...register("email", {
                  required: "이메일을 입력해주세요.",
                  pattern: {
                    value: emailRegex,
                    message: "이메일 형식으로 작성해주세요.",
                  },
                })}
                onBlur={() => trigger("email")}
              />
              {/* 이메일 에러 메시지 */}
              {errors.email && (
                <p className="mt-[0.4rem] text-[1.2rem] text-[var(--color-red)]">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* 비밀번호 */}
            <div className="mb-[1.6rem]">
              <label
                htmlFor="password"
                className="block text-[1.6rem] font-normal leading-[2.6rem] text-[var(--color-black)] mb-[0.4rem]"
              >
                비밀번호
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"} // showPassword 상태에 따라 type 변경
                  placeholder="비밀번호 입력"
                  className={`
                    w-full
                    px-[2rem] py-[1.6rem]
                    border
                    focus:outline-none
                    rounded-[0.6rem]
                    text-[1.6rem] font-normal leading-[2.6rem]
                    placeholder-[var(--color-gray-600)]
                  ${errors.password ? "border-[var(--color-red)]" : "border-[var(--color-gray-300)]"}
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
                {/* 비밀번호 보기 버튼 */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-[1.6rem] top-[50%] transform -translate-y-1/2 text-[var(--color-gray-800)]"
                >
                  {showPassword ? (
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
              </div>
              {/* 비밀번호 에러 메시지 */}
              {errors.password && (
                <p className="mt-[0.4rem] text-[1.2rem] text-[var(--color-red)]">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* 로그인 버튼 */}
            <Button
              type="submit"
              ButtonType="loginSignup"
              label="로그인 하기"
              variant="loginSignup"
              disabled={isButtonDisabled}
              className={`flex items-center justify-center w-[64rem] h-[4.8rem] px-[13.6rem] 
                py-[1.4rem] gap-[0.8rem] rounded-[0.6rem] `}
            />
          </form>

          {/* 회원가입 이동 */}
          <p className="mt-[1.6rem] text-center text-[1.6rem] font-normal text-[var(--color-gray-600)]">
            회원이 아니신가요?{" "}
            <Link
              href="/signup"
              className=" text-[1.6rem] font-normal text-[var(--color-green-dark)] cursor-pointer"
            >
              회원가입하기
            </Link>
          </p>
        </div>
        {/* 소셜 로그인 */}
        <div className="w-full flex flex-col gap-[4rem]">
          <div className="flex items-center justify-between my-[3.2rem]">
            <div className="flex-grow h-[0.1rem] bg-[var(--color-gray-300)]"></div>
            <span className="mx-[2.8rem] text-[var(--color-gray-800)] text-[1.8rem] leading-[2.4rem] font-normal">
              SNS 계정으로 로그인하기
            </span>
            <div className="flex-grow h-[0.1rem] bg-[var(--color-gray-300)]"></div>
          </div>
          <div className="mt-[2.4rem] flex justify-center gap-4">
            <Link
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[7.2rem] h-[7.2rem] bg-[var(--color-white)] rounded-full shadow-md flex items-center justify-center hover:shadow-lg"
            >
              <Image
                src="/image/Google-Icon.svg"
                alt="Google"
                width={27}
                height={27}
                objectFit="cover"
              />
            </Link>
            <Link
              href="https://developers.kakao.com/docs/latest/ko/message/rest-api"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[7.2rem] h-[7.2rem] bg-[var(--color-white)] rounded-full shadow-md flex items-center justify-center hover:shadow-lg"
            >
              <Image
                src="/image/Kakao-Icon.svg"
                alt="Kakao"
                width={27}
                height={27}
                objectFit="cover"
              />
            </Link>
          </div>
        </div>
      </div>
      {/* 모달 컴포넌트 */}
      <MessageModal
        isOpen={modalState.isOpen}
        message={modalState.message}
        onClose={closeModal}
      />
    </div>
  );
}
