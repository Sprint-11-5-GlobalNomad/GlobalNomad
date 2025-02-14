import { CategoryType } from "@/app/types/activity-schemas";

interface AllActivitiesTitleProps {
  category: CategoryType | undefined;
}

export default function AllActivitiesTitle({
  category,
}: AllActivitiesTitleProps) {
  return (
    <div
      className="flex-between w-[120rem] mt-[3.5rem] mb-[3.2rem]
    tablet:w-[69.6rem] mobile:w-[34.3rem] mobile:mt-[9.4rem] mobile:mb-[1.6rem]"
    >
      <h2
        className="text-3xl font-bold mobile:text-[1.8rem]
      mobile:leading-[2.1rem]"
      >
        {category || "🛼 모든 체험"}
      </h2>
    </div>
  );
}
