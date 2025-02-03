// import Image from "next/image";

// interface PopularActivitiesTitleProps {
//   handleNextCursor: () => void;
//   handlePrevCursor?: () => void;
//   cursorId?: number | null;
// }

// export default function PopularActivitiesTitle({
//   handleNextCursor,
//   handlePrevCursor,
//   cursorId,
// }: PopularActivitiesTitleProps) {
//   return (
//     <div
//       className="flex-between w-[120rem] mt-[16rem] mb-[3.2rem]
//     tablet:w-[69.6rem] mobile:w-[34.3rem] mobile:mt-[9.4rem] mobile:mb-[1.6rem]"
//     >
//       <h2
//         className="text-3xl font-bold mobile:text-[1.8rem]
//       mobile:leading-[2.1rem]"
//       >
//         🔥 인기 체험
//       </h2>
//       <div className="flex gap-[1.2rem]">
//         <button
//           className="tablet:hidden mobile:hidden"
//           onClick={handleNextCursor}
//           disabled={!cursorId}
//         >
//           <Image
//             src="/image/unactivated_left_arrow.svg"
//             alt="인기체험 이전 목록"
//             width={44}
//             height={44}
//           />
//         </button>
//         <button
//           className="tablet:hidden mobile:hidden"
//           onClick={handlePrevCursor}
//         >
//           <Image
//             src="/image/activated_right_arrow.svg"
//             alt="인기체험 다음 목록"
//             width={44}
//             height={44}
//           />
//         </button>
//       </div>
//     </div>
//   );
// }
