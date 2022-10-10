import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { Button, Select, TextInput } from '@tih/ui';

export type SortOption = {
  label: string;
  value: string;
};

export type QuestionSearchBarProps<SortOptions extends Array<SortOption>> = {
  onFilterOptionsToggle: () => void;
  onSortChange?: (sortValue: SortOptions[number]['value']) => void;
  sortOptions: SortOptions;
  sortValue: SortOptions[number]['value'];
};

export default function QuestionSearchBar<
  SortOptions extends Array<SortOption>,
>({
  onSortChange,
  sortOptions,
  sortValue,
  onFilterOptionsToggle,
}: QuestionSearchBarProps<SortOptions>) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 pt-1">
        <TextInput
          isLabelHidden={true}
          label="Search by content"
          placeholder="Search by content"
          startAddOn={MagnifyingGlassIcon}
          startAddOnType="icon"
        />
      </div>
      <span aria-hidden={true} className="pl-3 pr-1 pt-1 text-sm">
        Sort by:
      </span>
      <Select
        display="inline"
        isLabelHidden={true}
        label="Sort by"
        options={sortOptions}
        value={sortValue}
        onChange={onSortChange}
      />
      <div className="lg:hidden">
        <Button
          addonPosition="start"
          icon={AdjustmentsHorizontalIcon}
          label="Filter options"
          variant="tertiary"
          onClick={onFilterOptionsToggle}
        />
      </div>
    </div>
  );
}
