"use client";

import React from "react";
import { ButtonSizes } from "@/app/types/button-type";

interface ButtonProps {
  ButtonType: keyof typeof ButtonSizes; // 버튼 역할
  label: React.ReactNode; // 버튼 텍스트
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?:
    | "default"
    | "outlined"
    | "category"
    | "page"
    | "selected"
    | "loginSignup"
    | "reservationTimeAdd"
    | "reservationTimeDelete";
  disabled?: boolean; // 비활성화
  className?: string; // 추가 클래스
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  ButtonType,
  label,
  type = "button",
  onClick,
  variant = "default",
  disabled = false,
  className = "",
}) => {
  const sizes = ButtonSizes[ButtonType];
  if (!sizes) {
    console.error("ButtonType이 존재하지 않음");
    return null;
  }

  // 이미 breakpoints 접두사가 포함된 정적 클래스 문자열을 그대로 사용합니다.
  const sizeClasses = sizes;

  const baseClasses = `inline-flex justify-center items-center transition-all ${
    disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer opacity-100"
  }`;

  let variantClasses = "";
  switch (variant) {
    case "default":
      variantClasses =
        (disabled ? "bg-[#c0c0c0] text-white" : "bg-[#000] text-white") +
        " font-bold border-0";
      break;
    case "outlined":
      variantClasses =
        "bg-white text-black font-bold border border-solid " +
        (disabled ? "border-[#c0c0c0]" : "border-[#000]");
      break;
    case "category":
      variantClasses =
        "bg-white text-[#0B3B2D] border border-solid border-[#0B3B2D]";
      break;
    case "selected":
      variantClasses = "bg-[#0B3B2D] text-white";
      break;
    case "page":
      variantClasses = disabled
        ? "bg-[#0B3B2D] text-[#A1A1A1] border border-solid border-[#DDDDDD]"
        : "bg-white text-[#0B3B2D] border border-solid border-[#0B3B2D]";
      break;
    case "loginSignup":
      variantClasses = disabled
        ? "bg-[#A4A1AA] text-white"
        : "bg-[#0B3B2D] text-white";
      break;
    case "reservationTimeAdd":
      variantClasses = "bg-[#0B3B2D] text-white";
      break;
    case "reservationTimeDelete":
      variantClasses =
        "bg-white text-[#79747E] border border-solid border-[#dddddd]";
      break;
    default:
      break;
  }

  const combinedClasses =
    `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`.trim();

  return (
    <button
      className={combinedClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
