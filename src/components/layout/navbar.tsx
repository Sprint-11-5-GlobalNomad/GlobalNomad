import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex-between max-w-[120rem]">
      <Link href="/">
        <Image
          src="/public/image/logo-md.svg"
          alt="Logo"
          width={172}
          height={30}
        />
      </Link>
      <div className="flex gap-[2.5rem]">
        <Link href="/login" className="text-[1.4rem] text-[#1b1b1b]">
          로그인
        </Link>
        <Link href="/signup" className="text-[1.4rem] text-[#1b1b1b]">
          회원가입
        </Link>
      </div>
    </div>
  );
}
