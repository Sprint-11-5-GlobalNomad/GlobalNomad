import Button from "../../../common/ui/button";
import FilterDropdown from "../../../common/ui/dropdown/filter-dropdown";
// import { useActivities } from "@/app/react-query/activity-state";
// import { useQueryClient } from "@tanstack/react-query";

const categories = ["문화・예술", "식음료", "스포츠", "투어", "관광", "웰빙"];

export default function CategoryPriceFilter() {
  // const queryClient = useQueryClient();

  // const handleCategoryChange = (category: string | null) => {
  //   queryClient.setQueryData("activityFilters", (prev) => ({
  //     ...prev,
  //     category,
  //   }));
  // };

  return (
    <div className="flex-between gap-[1rem] w-[120rem]">
      <div className="flex-between gap-[2.4rem]">
        {categories.map((category) => (
          <Button
            key={category}
            type="category"
            label={category}
            variant="category"
            // onClick={() => handleCategoryChange(category)}
          />
        ))}
      </div>

      <FilterDropdown
        description="가격"
        options={["가격이 낮은 순", "가격이 높은 순"]}
        size="small"
        // onSelect={}
      />
    </div>
  );
}
