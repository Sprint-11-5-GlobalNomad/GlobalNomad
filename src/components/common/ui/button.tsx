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
    console.error("Invalid ButtonType");
    return null;
  }
  const { lg: desktop, md: tablet, sm: mobile } = sizes;
  if (!desktop || !tablet || !mobile) {
    console.error("Missing size definitions");
    return null;
  }

  const sizeClasses = `
    desktop:w-[${desktop.width}rem] desktop:h-[${desktop.height}rem] desktop:rounded-[${desktop.radius}rem] desktop:text-[${desktop.font_size}rem]
    tablet:w-[${tablet.width}rem] tablet:h-[${tablet.height}rem] tablet:rounded-[${tablet.radius}rem] tablet:text-[${tablet.font_size}rem]
    mobile:w-[${mobile.width}rem] mobile:h-[${mobile.height}rem] mobile:rounded-[${mobile.radius}rem] mobile:text-[${mobile.font_size}rem]
  `
    .replace(/\s+/g, " ")
    .trim();

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
        "bg-white text-black font-bold border " +
        (disabled ? "border-[#c0c0c0]" : "border-[#000]");
      break;
    case "category":
      variantClasses = "bg-white text-[#0B3B2D] border border-[#0B3B2D]";
      break;
    case "selected":
      variantClasses = "bg-[#0B3B2D] text-white";
      break;
    case "page":
      variantClasses = disabled
        ? "bg-[#0B3B2D] text-[#A1A1A1] border border-[#DDDDDD]"
        : "bg-white text-[#0B3B2D] border border-[#0B3B2D]";
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
      variantClasses = "bg-white text-[#79747E] border border-[#dddddd]";
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
