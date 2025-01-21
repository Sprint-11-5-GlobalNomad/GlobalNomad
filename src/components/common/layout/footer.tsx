"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const hideFooter = ["/login", "/signup"].includes(pathname);

  if (hideFooter) return null;

  return (
    <footer className="h-[16rem]">
      <div
        className="flex-between mx-[36rem] pt-[3.2rem] tablet:mx-[11rem]
      mobile:mx-[3.8rem] mobile:flex-wrap mobile:justify-center mobile:gap-[1.2rem]"
      >
        <span className="text-lg font-regular">©codeit - 2025</span>
        <div className="flex gap-[3rem]">
          <span className="text-lg font-regular">Privacy Policy</span>
          {/* modal 로 바꿀 계획 */}
          <Link
            href="https://www.codeit.kr/faq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-regular"
          >
            FAQ
          </Link>
        </div>

        <div className="flex gap-[1.2rem] mobile:mt-[1.2rem]">
          <Link
            href="https://www.facebook.com/codeit.kr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/image/facebook.svg"
              alt="페이스북 링크"
              width={20}
              height={20}
            />
          </Link>
          <Link href="https://x.com/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/image/twitter.svg"
              alt="트위터 링크"
              width={20}
              height={20}
            />
          </Link>
          <Link
            href="https://www.youtube.com/channel/UCCM79CPm2WbBYTRaiNEExbg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/image/youtube.svg"
              alt="유튜브 링크"
              width={20}
              height={20}
            />
          </Link>
          <Link
            href="https://www.instagram.com/codeit_kr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/image/instargram.svg"
              alt="인스타그램 링크"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
