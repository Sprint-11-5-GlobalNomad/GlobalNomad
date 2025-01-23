import Image from "next/image";

interface CloseButtonProps {
  alt?: string;
  size?: "large" | "small";
  theme?: "default" | "gray";
  onClick?: () => void;
}

export default function CloseButton({
  alt = "닫기 버튼",
  size = "large",
  theme = "default",
  onClick,
}: CloseButtonProps) {
  const sizeClasses = {
    small: 24,
    large: 40,
  }[size];

  const srcClasses = {
    default: "/image/btn_X.svg",
    gray: "/image/btn_X_gray_medium.svg",
  }[theme];

  return (
    <Image
      src={srcClasses}
      alt={alt}
      width={sizeClasses}
      height={sizeClasses}
      onClick={onClick}
      className="cursor-pointer"
      objectFit="cover"
    />
  );
}
