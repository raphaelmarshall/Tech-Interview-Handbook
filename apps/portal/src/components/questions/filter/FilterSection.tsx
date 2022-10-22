import { useMemo } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { CheckboxInput, Collapsible, RadioList } from '@tih/ui';

export type FilterChoice<V extends string = string> = {
  id: string;
  label: string;
  value: V;
};

export type FilterOption<V extends string = string> = FilterChoice<V> & {
  checked: boolean;
};

export type FilterChoices<V extends string = string> = ReadonlyArray<
  FilterChoice<V>
>;

type FilterSectionType<FilterOptions extends Array<FilterOption>> =
  | {
      isSingleSelect: true;
      onOptionChange: (optionValue: FilterOptions[number]['value']) => void;
    }
  | {
      isSingleSelect?: false;
      onOptionChange: (
        optionValue: FilterOptions[number]['value'],
        checked: boolean,
      ) => void;
    };

export type FilterSectionProps<FilterOptions extends Array<FilterOption>> =
  FilterSectionType<FilterOptions> & {
    label: string;
    options: FilterOptions;
  } & (
      | {
          renderInput: (props: {
            field: UseFormRegisterReturn<'search'>;
            onOptionChange: FilterSectionType<FilterOptions>['onOptionChange'];
            options: FilterOptions;
          }) => React.ReactNode;
          showAll?: never;
        }
      | {
          renderInput?: never;
          showAll: true;
        }
    );

export type FilterSectionFormData = {
  search: string;
};

export default function FilterSection<
  FilterOptions extends Array<FilterOption>,
>({
  label,
  options,
  showAll,
  onOptionChange,
  isSingleSelect,
  renderInput,
}: FilterSectionProps<FilterOptions>) {
  const { register, reset } = useForm<FilterSectionFormData>();

  const registerSearch = register('search');

  const field: UseFormRegisterReturn<'search'> = {
    ...registerSearch,
    onChange: async (event) => {
      await registerSearch.onChange(event);
      reset();
    },
  };

  const autocompleteOptions = useMemo(() => {
    return options.filter((option) => !option.checked) as FilterOptions;
  }, [options]);

  return (
    <div className="mx-2">
      <Collapsible defaultOpen={true} label={label}>
        <div className="-mx-2 flex flex-col items-stretch gap-2">
          {!showAll && (
            <div className="z-10">
              {renderInput({
                field,
                onOptionChange: async (
                  optionValue: FilterOptions[number]['value'],
                ) => {
                  reset();
                  return onOptionChange(optionValue, true);
                },
                options: autocompleteOptions,
              })}
            </div>
          )}
          {isSingleSelect ? (
            <div className="px-1.5">
              <RadioList
                label=""
                value={options.find((option) => option.checked)?.value}
                onChange={(value) => {
                  onOptionChange(value);
                }}>
                {options.map((option) => (
                  <RadioList.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </RadioList>
            </div>
          ) : (
            <div className="px-1.5">
              {options
                .filter((option) => showAll || option.checked)
                .map((option) => (
                  <CheckboxInput
                    key={option.value}
                    label={option.label}
                    value={option.checked}
                    onChange={(checked) => {
                      onOptionChange(option.value, checked);
                    }}
                  />
                ))}
            </div>
          )}
        </div>
      </Collapsible>
    </div>
  );
}
