'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ReactNode, memo } from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';
import { Options } from './form.type';
import { cn } from '@/lib/utils';

/**
 * InputSelectProps defines the props for the InputSelect component.
 *
 * @template TFieldValue - Type extending FieldValues for the control.
 * @template TOption - Type custom option for the control.
 *
 * @property {FieldPath<TFieldValue>} name - The name/path of the field in the form.
 * @property {string} label - The label for the select input field.
 * @property {string | ReactNode} [description] - Optional description or additional information for the input field.
 * @property {string} [className] - Optional class name for styling purposes.
 * @property {Options[] | TOption[]} options - Array of options for the select input field.
 * @property {'default' | 'custom' = 'default'} [typeOption] - Optional type of option.
 * @property {string} [displayLabel] - Optional field label for custom option.
 * @property {string} [displayValue] - Optional field value for custom option.
 * @property {string} [placeholder] - Optional placeholder text for the select input.
 * @property {boolean} [disabled] - Optional disabled the select input.
 * @property {(value: string): string } [onChange] - Optional onchange function for the select input.
 */

type TKeyValue<TOption> = {
  key: keyof TOption;
  value: keyof TOption;
};

type InputSelectProps<TFieldValue extends FieldValues, TOption> = {
  name: FieldPath<TFieldValue>;
  label: string;
  description?: string | ReactNode;
  className?: string;
  options: TOption[];
  optionKeyValue: TKeyValue<TOption>;
  typeOption?: 'default' | 'custom';
  displayLabel?: string;
  displayValue?: string;
  isObjectValue?: boolean;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

/**
 * InputSelect is a component used for rendering a select input field.
 * It integrates with React Hook Form for form management.
 *
 * @template TFieldValue - Type extending FieldValues for the control.
 * @param {InputSelectProps<TFieldValue>} props - Props object for the InputSelect component.
 * @returns {JSX.Element} - Returns the JSX element for the select input field.
 */
const InputSelect = <TFieldValue extends FieldValues, TOption = any>({
  name,
  label,
  description,
  className,
  options,
  optionKeyValue,
  displayLabel = 'name',
  displayValue = '_id',
  isObjectValue,
  typeOption = 'default',
  placeholder = 'Chọn',
  disabled,
  onChange,
}: InputSelectProps<TFieldValue, TOption>): JSX.Element => {
  const { control } = useFormContext<TFieldValue>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={cn('w-full', className)}>
          <FormLabel className="text-base">{label}</FormLabel>
          <Select
            onValueChange={(e) => {
              onChange ? onChange(e) : field.onChange(e);
            }}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className={cn('text-base', error && 'border-[#ee4949]')}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="overflow-y-auto max-h-[18rem] text-base">
              {typeOption === 'default'
                ? options.map(({ [optionKeyValue.key]: label, [optionKeyValue.value]: value }) => (
                    <SelectItem
                      key={label as string}
                      value={label as string}
                      className="cursor-pointer text-base"
                    >
                      {String(value)}
                    </SelectItem>
                  ))
                : options.map((option) => (
                    <SelectItem
                      key={(option as any)[displayLabel]}
                      value={isObjectValue ? JSON.stringify(option) : (option as any)[displayValue]}
                      className="cursor-pointer"
                    >
                      {(option as any)[displayLabel]}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-[13px]" />
        </FormItem>
      )}
    />
  );
};

const MemoizedInputSelect = memo(InputSelect) as <TFieldValue extends FieldValues, TOption = any>(
  props: InputSelectProps<TFieldValue, TOption>,
) => JSX.Element;

export { MemoizedInputSelect as InputSelect };
