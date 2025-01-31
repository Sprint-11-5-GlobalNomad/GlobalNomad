import Button from "../../common/ui/button";
import FilterDropdown from "../../common/ui/dropdown/filter-dropdown";

export default function CategoryPriceFilter() {
  return (
    <div className="flex-between gap-[1rem] w-[120rem]">
      <div className="flex-between gap-[2.4rem]">
        <Button type="category" label="문화・예술" variant="category" />
        <Button type="category" label="식음료" variant="category" />
        <Button type="category" label="스포츠" variant="category" />
        <Button type="category" label="투어" variant="category" />
        <Button type="category" label="관광" variant="category" />
        <Button type="category" label="웰빙" variant="category" />
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
