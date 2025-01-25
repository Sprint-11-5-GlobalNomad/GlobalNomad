"use client";

import React, { useEffect, useState } from "react";
import { ButtonSizes } from "@/app/types/button-type";

interface ButtonProps {
  type: keyof typeof ButtonSizes; // 버튼 역할
  label: string; // 버튼 텍스트
  onClick?: () => void; // 클릭 이벤트
  variant?: "default" | "outlined" | "category"; // 스타일
  disabled?: boolean; // 비활성화
  className?: string; // 추가 클래스
}

const Button: React.FC<ButtonProps> = ({
  type,
  label,
  onClick,
  variant = "default",
  disabled = false,
  className,
}) => {
  const [currentSize, setCurrentSize] = useState<"lg" | "md" | "sm">("lg");

  // 화면 크기에 따라 버튼 크기 변경
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setCurrentSize("lg");
      } else if (width >= 744 && width <= 1023) {
        setCurrentSize("md");
      } else {
        setCurrentSize("sm");
      }
    };
    updateSize(); // 초기 화면 크기 설정
    window.addEventListener("resize", updateSize); // 화면 크기 변경 감지
    return () => window.removeEventListener("resize", updateSize); // 이벤트 제거
  }, []);

  const buttonSize = ButtonSizes[type]?.[currentSize];

  if (!buttonSize) {
    console.error("Invalid size or type for Button");
    return null;
  }

  const { width, height, radius, font_size } = buttonSize;

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: `${radius}px`,
    fontSize: `${font_size}px`,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    transition: "all 0.3s ease",
  };

  const styles: Record<string, React.CSSProperties> = {
    default: {
      ...baseStyle,
      backgroundColor: disabled ? "#c0c0c0" : "#000",
      color: "#fff",
      border: "none",
      fontWeight: "bold",
    },
    outlined: {
      ...baseStyle,
      backgroundColor: "#fff",
      color: "#000",
      border: `1px solid ${disabled ? "#c0c0c0" : "#000"}`,
      fontWeight: "bold",
    },
    category: {
      ...baseStyle,
      backgroundColor: "#fff",
      color: "#0B3B2D",
      border: "1px solid #0B3B2D",
    },
  };

  return (
    <button
      style={styles[variant]}
      onClick={disabled ? undefined : onClick}
      className={className}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
