'use client';

import { useEffect, ReactNode, useState, ChangeEvent, useRef } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
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

type TKeyValue<TOption> = {
  key: keyof TOption;
  value: keyof TOption;
};

type ComboBoxProps<TFieldValues extends FieldValues, OptionType> = {
  className?: string;
  name: FieldPath<TFieldValues>;
  label: string;
  selectPlaceholder?: string;
  form: UseFormReturn<TFieldValues>;
  isLoading?: boolean;
  description?: string | ReactNode;
  onChange?: (value: OptionType[NonNullable<keyof OptionType>]) => void;
  options: OptionType[];
  optionKeyValue: TKeyValue<OptionType>;
};

// Define the type for the ComboBox change event
export type ComboBoxChangeEvent = ChangeEvent<HTMLSelectElement>;

export const InputComboBox = <T extends FieldValues, OptionType>({
  className,
  name,
  label,
  selectPlaceholder,
  form,
  isLoading = false,
  description,
  onChange,
  options,
  optionKeyValue,
}: ComboBoxProps<T, OptionType>) => {
  const { register, setValue, watch } = form;
  const selectedValue = watch(name); // Get the selected value from the form

  console.log(options);
  // console.log(optionKeyValue.key);
  // console.log(optionKeyValue.value);
  // console.log(options[0][optionKeyValue.key]);
  // console.log(options[0][optionKeyValue.value]);

  // State to store the label of the selected option
  const [selectedLabel, setSelectedLabel] = useState<string>('');

  // Update the selected label when the selected value changes
  useEffect(() => {
    const selectedOption = options.find((option) => option[optionKeyValue.key] === selectedValue);
    if (selectedOption) {
      setSelectedLabel(selectedOption[optionKeyValue.value] as string);
    } else {
      setSelectedLabel('');
    }
  }, [selectedValue, options, optionKeyValue.key, optionKeyValue.value]);

  // Handle change event when an option is selected
  const handleChange = (value: string | number) => {
    const selectedOption = options.find((option) => option[optionKeyValue.key] === value);
    if (selectedOption) {
      const value = selectedOption[optionKeyValue.key] as PathValue<T, FieldPath<T>>;

      setValue(name, value);
    }
  };

  const anchorRef = useRef<HTMLButtonElement>(null);

  const baseWidth = anchorRef.current ? `w-[${anchorRef.current.clientWidth}px]` : 'w-[400px]';

  console.log(baseWidth);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        //console.log(field);

        return (
          <FormItem className={cn('w-full flex flex-col', className)}>
            <FormLabel>{label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      'w-full justify-between text-base',
                      !field.value && 'text-muted-foreground',
                    )}
                    ref={anchorRef}
                  >
                    {selectPlaceholder}
                    <ChevronDown className="ml-2 h-6 w-6 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent align='center' className={cn(baseWidth)}>
                {options.length === 0 ? (
                  <div className="h-24 w-full flex flex-col">
                    <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
                  </div>
                ) : (
                  <Command className='w-full'>
                    <CommandInput />
                    <CommandEmpty>Không tìm thấy.</CommandEmpty>
                    <CommandGroup>
                      {/* {options.map((item) => {
                        console.log(item[optionKeyValue.value]);

                        return (
                          <CommandItem
                            value={(item[optionKeyValue.key] as number | string).toString()}
                            key={item[optionKeyValue.key] as number | string}
                          >
                            <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          item[optionKeyValue.key] === field.value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                            {item[optionKeyValue.value] as string}
                          </CommandItem>
                        );
                      })} */}
                    </CommandGroup>
                  </Command>
                )}
              </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

const SelectItem = () => {

}