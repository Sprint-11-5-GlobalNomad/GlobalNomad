import Button from "../../ui/button";
import FilterDropdown from "../../ui/filter-dropdown";

export default function CategoryPriceFilter() {
  return (
    <div className="flex-between gap-[1rem] w-[120rem]">
      <div className="flex-between gap-[2.4rem]">
        <Button type="main" label="문화・예술" variant="main" />
        <Button type="main" label="식음료" variant="main" />
        <Button type="main" label="스포츠" variant="main" />
        <Button type="main" label="투어" variant="main" />
        <Button type="main" label="관광" variant="main" />
        <Button type="main" label="웰빙" variant="main" />
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
