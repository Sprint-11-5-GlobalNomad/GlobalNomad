"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AxiosError } from "axios";
import { useLogin } from "@/app/react-query/oauth-state";
import Button from "@/components/common/ui/button";
import MessageModal from "@/components/common/ui/modal/message-modal";

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

  const watchEmail = watch("email");
  const watchPassword = watch("password");

  const isValidForm = !(
    emailRegex.test(watchEmail) && watchPassword.length >= 8
  );

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
  }, [router]);

  return (
    <div>
      <div
        className="flex flex-col items-center justify-center my-[2rem] py-[3.2rem] mt-[11.8rem]
      max-w-[64rem] min-w-[35rem] w-full mx-auto gap-[2.4rem] mobile:gap-[4rem] md:gap-[5.6rem]
      mobile:p-0 mobile:m-0 mobile:h-full mobile:mt-[9rem]"
      >
        {/** 로고 섹션 */}
        <div
          className="flex justify-center mb-[3.2rem] w-full max-w-[27rem]
        mobile:w-[24.5rem] mobile:h-[13.8rem] mobile:mb-0"
        >
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
        <div className="flex flex-col gap-[4rem] mobile:gap-[4rem]">
          <div className="w-full flex items-center justify-center flex-col gap-[3.2rem] mobile:gap-[2.4rem]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col mobile:max-w-[64rem] gap-[2.8rem]"
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
                disabled={isValidForm}
                className={`flex items-center justify-center w-[64rem] h-[4.8rem] px-[13.6rem] 
                py-[1.4rem] gap-[0.8rem] rounded-[0.6rem] `}
              />
            </form>

            {/* 회원가입 이동 */}
            <p
              className="mt-[1.6rem] text-center text-[1.6rem] font-normal text-[var(--color-gray-600)]
            mobile:mt-[0.8rem]"
            >
              회원이 아니신가요?{" "}
              <Link
                href="/signup"
                className="text-[1.6rem] font-regular text-green-dark cursor-pointer underline"
              >
                회원가입하기
              </Link>
            </p>
          </div>
          {/* 소셜 로그인 */}
          <div className="w-full flex flex-col gap-[2.4rem] mobile:gap-[2.4rem]">
            <div className="flex items-center justify-between">
              <div className="flex-grow h-[0.1rem] bg-[var(--color-gray-300)]"></div>
              <span
                className="mx-[2.8rem] text-gray-800 text-[1.4rem]
              mobile:text-[1.4rem] leading-[2.4rem] font-normal"
              >
                SNS 계정으로 로그인하기
              </span>
              <div className="flex-grow h-[0.1rem] bg-[var(--color-gray-300)]"></div>
            </div>

            <div
              className="mt-[2.4rem] flex justify-center gap-[1.6rem]
            mobile:mt-0 mobile:mb-[3.5rem]"
            >
              <Link
                href="https://www.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[4.8rem] min-h-[4.8rem]
                bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg
                mobile:w-[4.8rem] mobile:h-[4.8rem]"
              >
                <div className="w-[1.8rem] mobile:w-[2.7rem]">
                  <Image
                    src="/image/Google-Icon.svg"
                    alt="Google"
                    width={27}
                    height={27}
                  />
                </div>
              </Link>
              <button
                // onClick={handleKakaoLogin} // ✅ 카카오 로그인 실행
                className="min-w-[4.8rem] min-h-[4.8rem]
                bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg
                mobile:w-[4.8rem] mobile:h-[4.8rem]"
              >
                <div className="w-[1.8rem] mobile:w-[2.7rem]">
                  <Image
                    src="/image/Kakao-Icon.svg"
                    alt="Kakao"
                    width={27}
                    height={27}
                    objectFit="fill"
                  />
                </div>
              </button>
            </div>
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
