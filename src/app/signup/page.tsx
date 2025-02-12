"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useCreateUser } from "../react-query/user-state";
import Image from "next/image";
import Link from "next/link";
import MessageModal from "../../components/common/ui/modal/message-modal";
import Button from "../../components/common/ui/button";
import { useSignUpWithOauth } from "../react-query/oauth-state";
import axios, { AxiosError } from "axios";

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
  const { mutate: createUser } = useCreateUser();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const router = useRouter();
  const kakaoSignUp = useSignUpWithOauth("kakao");
  const [modalState, setModalState] = useState({
    isOpen: false,
    message: "",
  });

  const {
    register,
    formState: { errors },
    watch,
    trigger,
    handleSubmit,
  } = useForm<SignupFormInputs>({
    mode: "onBlur",
  });

  React.useEffect(() => {
    const email = watch("email");
    const nickname = watch("nickname");
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const isEmailValid = emailRegex.test(email);
    const isNicknameValid = nickname.length <= 10;
    const isPasswordValid = password.length >= 8;
    const isConfirmPasswordValid = confirmPassword === password;

    setIsButtonDisabled(
      !(
        isEmailValid &&
        isNicknameValid &&
        isPasswordValid &&
        isConfirmPasswordValid
      )
    );
  }, [
    watch("email"),
    watch("nickname"),
    watch("password"),
    watch("confirmPassword"),
  ]);

  const password = watch("password");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  // 모달 열기 함수
  const openModal = (message: string) => {
    setModalState({ isOpen: true, message });
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setModalState({ isOpen: false, message: "" });
  };

  // 모달 닫기 함수 추가
  const closeModalAndRedirect = () => {
    closeModal();
    if (isSignupSuccess) {
      router.push("/login"); // 회원가입 성공했을 때만 로그인 페이지로 이동
    }
  };

  const onSubmit = (data: SignupFormInputs) => {
    createUser(data, {
      onSuccess: () => {
        setIsSignupSuccess(true);
        openModal("가입이 완료되었습니다!");
      },
      onError: (error) => {
        setIsSignupSuccess(false);
        if (error instanceof AxiosError) {
          // const errorMessage = error.response?.data?.message || "회원 가입에 실패하였습니다.";
          openModal("이미 사용중인 이메일입니다.");
        }
      },
    });
  };

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=f13cccc7b67c9ec0492bb9b3400c80e1&redirect_uri=http://localhost:3000/login&response_type=code`;

  const handleKakaoSignup = () => {
    window.location.href = KAKAO_AUTH_URL; // ✅ 카카오 로그인 페이지로 이동
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");

    if (authCode) {
      // 1️⃣ 인가 코드로 액세스 토큰 요청
      axios
        .post("https://kauth.kakao.com/oauth/token", {
          grant_type: "authorization_code",
          client_id: "YOUR_KAKAO_REST_API_KEY",
          redirect_uri: "http://localhost:3000/auth/kakao/callback",
          code: authCode,
        })
        .then((tokenResponse) => {
          const accessToken = tokenResponse.data.access_token;

          // 2️⃣ 액세스 토큰으로 사용자 정보 요청
          return axios.get("https://kapi.kakao.com/v2/user/me", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
        })
        .then((userResponse) => {
          const nickname = userResponse.data.kakao_account.profile.nickname;

          // 3️⃣ 회원가입 API 호출
          kakaoSignUp.mutate(
            {
              token: authCode,
              redirectUri: "http://localhost:3000/auth/kakao/callback",
              nickname: nickname, // ✅ 닉네임 추가
            },
            {
              onSuccess: () => {
                alert("카카오 회원가입 성공!");
                router.push("/dashboard");
              },
              onError: (error) => {
                console.error("회원가입 실패:", error);
              },
            }
          );
        })
        .catch((error) => {
          console.error("카카오 API 호출 중 오류 발생:", error);
        });
    } else {
      console.error("카카오 로그인 실패");
    }
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center my-[11.8rem] py-[3.2rem] max-w-[64rem] min-w-[35rem] w-full mx-auto gap-[2.4rem] sm:gap-[4rem] md:gap-[5.6rem]">
        {/** 로고 섹션 */}
        <div className="flex justify-center mb-[3.2rem] w-full max-w-[27rem] sm:max-w-[34rem]">
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

        {/* 폼 섹션 */}
        <div className="flex flex-col gap-[4rem] sm:gap-[4.8rem]">
          <div className="w-full flex flex-col items-center justify-center gap-[3.2rem] sm:gap-[2.6rem]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col max-w-[35rem] sm:max-w-[64rem] gap-[2.8rem]"
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
                      message: "이메일 형식으로 작성해주세요.",
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
                    maxLength: {
                      value: 10,
                      message: "열 자 이하로 작성해주세요.",
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
              <div className="mb-[1.6rem] ">
                <label
                  htmlFor="password"
                  className="block text-[1.6rem] font-normal leading-[2.6rem] text-[var(--color-black)] mb-[0.4rem]"
                >
                  비밀번호
                </label>
                <div className="relative">
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
                        message: "8자 이상 입력해주세요.",
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
                {errors.password && (
                  <p className="mt-[0.4rem] text-[1.2rem] text-[var(--color-red)]">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* 비밀번호 확인 */}
              <div className="mb-[1.6rem]">
                <label
                  htmlFor="confirmPassword"
                  className="block text-[1.6rem] font-normal leading-[2.6rem] text-[var(--color-black)] mb-[0.4rem]"
                >
                  비밀번호 확인
                </label>
                <div className="relative">
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
                </div>
                {errors.confirmPassword && (
                  <p className="mt-[0.4rem] text-[1.2rem] text-[var(--color-red)]">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* 회원가입 버튼 */}
              <Button
                ButtonType="loginSignup"
                label="회원가입하기"
                variant="loginSignup"
                disabled={isButtonDisabled}
                className={`flex items-center justify-center w-[64rem] h-[4.8rem] px-[12rem] 
                py-[1.4rem] gap-[0.8rem] rounded-[0.6rem] `}
              />
            </form>

            {/* 회원가입 이동 */}
            <p className="mt-[1.6rem] text-center text-[1.6rem] text-[var(--color-gray-900)] font-normal text-text-[var(gray-600)]">
              회원이신가요?{" "}
              <Link
                href="/login"
                className="text-[1.6rem] font-normal text-[var(--color-green)] cursor-pointer"
              >
                로그인하기
              </Link>
            </p>
          </div>
          {/* 소셜 로그인 */}
          <div className="w-full flex flex-col gap-[2.4rem] sm:gap-[4rem]">
            <div className="flex items-center justify-between">
              <div className="flex-grow h-[0.1rem] bg-[var(--color-gray-300)]"></div>
              <span className="mx-[2.8rem] text-[var(--color-gray-800)] text-[1.8rem] leading-[2.4rem] font-normal">
                SNS 계정으로 회원가입하기
              </span>
              <div className="flex-grow h-[0.1rem] bg-[var(--color-gray-300)]"></div>
            </div>
            <div className="mt-[2.4rem] flex justify-center gap-[1.6rem]">
              <Link
                href="https://www.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[4.8rem] sm:w-[7.2rem] min-h-[4.8rem] sm:h-[7.2rem] bg-[var(--color-white)] rounded-full shadow-md flex items-center justify-center hover:shadow-lg"
              >
                <div className="w-[1.8rem] sm:w-[2.7rem]">
                  <Image
                    src="/image/Google-Icon.svg"
                    alt="Google"
                    width={27}
                    height={27}
                    objectFit="cover"
                  />
                </div>
              </Link>
              <button
                onClick={handleKakaoSignup} // ✅ 카카오 로그인 실행
                className="min-w-[4.8rem] sm:w-[7.2rem] min-h-[4.8rem] sm:h-[7.2rem] bg-[var(--color-white)] rounded-full shadow-md flex items-center justify-center hover:shadow-lg"
              >
                <div className="w-[1.8rem] sm:w-[2.7rem]">
                  <Image
                    src="/image/Kakao-Icon.svg"
                    alt="Kakao"
                    width={27}
                    height={27}
                    objectFit="cover"
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
        onClose={closeModalAndRedirect}
      />
    </div>
  );
}
