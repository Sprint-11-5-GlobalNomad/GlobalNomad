import React from "react";
import { ButtonSizes } from "../types/button-type";

interface ButtonProps {
  type: keyof typeof ButtonSizes; // 버튼 역할
  size: "lg" | "md" | "sm"; // 크기 선택
  label: string; // 버튼 텍스트
  onClick: () => void; // 클릭 이벤트
  variant?: "default" | "outlined"; // 스타일
  disabled?: boolean; // 비활성화
}

const Button: React.FC<ButtonProps> = ({
  type,
  size,
  label,
  onClick,
  variant = "default",
  disabled = false,
}) => {
  const buttonSize = ButtonSizes[type]?.[size];
  if (!buttonSize) {
    console.error("Invalid size or type for Button");
    return null;
  }

  const { width = 100, height = 40, radius = 4 } = buttonSize;

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: `${radius}px`,
    fontSize: "16px",
    fontWeight: "bold",
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
    },
    outlined: {
      ...baseStyle,
      backgroundColor: "#fff",
      color: "#000",
      border: `2px solid ${disabled ? "#c0c0c0" : "#000"}`,
    },
  };

  return (
    <button
      style={styles[variant]}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
