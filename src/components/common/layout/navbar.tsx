import Image from "next/image";
import Link from "next/link";
import UserMenu from "@/components/common/layout/navigation/user-menu";

export default function Navbar() {
  return (
    <header
      className="bg-white border-solid border-b border-gray-300
      flex justify-center z-50 fixed top-0 left-0 right-0
      mx-auto w-full h-[7rem] p-[1rem]
      tablet:px-[2.4rem] tablet:py-[2rem]
      mobile:p-[2rem]"
    >
      <nav
        className="flex-between mx-auto w-full h-auto max-w-[120rem]
        tablet:max-w-[69.6rem]"
      >
        <Link href="/">
          <Image src="/image/logo-md.svg" alt="Logo" width={172} height={30} />
        </Link>
        <UserMenu />
      </nav>
    </header>
  );
}
