'use client';

import { useEffect, ReactNode, useState, ChangeEvent, useRef, useMemo } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FieldPath, FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Check, ChevronDown } from 'lucide-react';
import { useDebounceFn } from 'ahooks';
import { ScrollArea } from '@/components/ui/scroll-area';

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
] as const;

type TKeyValue<TOption> = {
  key: keyof TOption;
  value: keyof TOption;
};

type FieldValue<T> = T extends { [K: string]: infer U } ? U : never;

type ComboBoxProps<TFieldValues extends FieldValues, OptionType> = {
  className?: string;
  name: FieldPath<TFieldValues>;
  label: string;
  searchTerm?: string;
  selectPlaceholder?: string;
  inputPlaceholder?: string;
  form: UseFormReturn<TFieldValues>;
  isLoading?: boolean;
  description?: string | ReactNode;
  onChange?: (value: OptionType[NonNullable<keyof OptionType>]) => void;
  options: OptionType[];
  optionKeyValue: TKeyValue<OptionType>;
};

// Utility function to get the type of a field in a form
function getFieldTypeByName<TFieldValues extends FieldValues, K extends FieldPath<TFieldValues>>(
  form: TFieldValues,
  fieldName: K,
): FieldValue<TFieldValues[K]> {
  return form[fieldName];
}

export const InputComboBox = <T extends FieldValues, OptionType>({
  className,
  name,
  label,
  selectPlaceholder,
  inputPlaceholder,
  form,
  isLoading = false,
  description,
  onChange,
  options,
  optionKeyValue,
}: ComboBoxProps<T, OptionType>) => {
  const { register, setValue } = form;

  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  // Handle search event
  const filteredOptions =
    search === ''
      ? options
      : options.filter((option) =>
          String(option[optionKeyValue.value])
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(search.toLowerCase().replace(/\s+/g, '')),
        );

  // Handle change event when an option is selected
  const handleSelect = (value: string | number, fieldType: string) => {
    const selectedOption = options.find(
      (option) => String(option[optionKeyValue.key]) === String(value),
    );
    if (selectedOption) {
      setSelectedLabel(selectedOption[optionKeyValue.value] as string);
      if (fieldType === 'object') {
        const value = {
          [optionKeyValue.key]: selectedOption[optionKeyValue.key],
        } as PathValue<T, FieldPath<T>>;

        setValue(name, value);
      } else {
        setValue(name, selectedOption[optionKeyValue.key] as PathValue<T, FieldPath<T>>);
      }
      setPopoverOpen(false);
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full flex flex-col', className)}>
          <FormLabel>{label}</FormLabel>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'w-full justify-between text-base',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {selectedLabel ?? selectPlaceholder}
                  <ChevronDown className="ml-2 h-6 w-6 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="center" className="popover-content-width-same-as-its-trigger">
              {isLoading ? (
                <div className="h-24 w-full flex flex-col items-center">
                  <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
                </div>
              ) : (
                <Command className="w-full" filter={() => 1}>
                  <CommandInput
                    autoFocus
                    placeholder={inputPlaceholder ?? 'Tìm kiếm...'}
                    value={search}
                    onValueChange={setSearch}
                  />
                  <CommandList>
                    <ScrollArea>
                      {filteredOptions.length === 0 && <CommandEmpty>Không tìm thấy.</CommandEmpty>}
                      <CommandGroup>
                        {filteredOptions.map((item) => {
                          const isSelected =
                            typeof field.value === 'object'
                              ? item[optionKeyValue.key] === field.value[optionKeyValue.key]
                              : item[optionKeyValue.key] === field.value;

                          return (
                            <CommandItem
                              key={String(item[optionKeyValue.key])}
                              value={String(item[optionKeyValue.key])}
                              onSelect={(value) => {
                                handleSelect(value, typeof field.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  isSelected ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                              {String(item[optionKeyValue.value])}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </ScrollArea>
                  </CommandList>
                </Command>
              )}
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
