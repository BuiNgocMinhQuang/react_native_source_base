import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Input, InputProps } from './Input';

export type FormInputProps<TFormValues extends FieldValues> = Omit<
  InputProps,
  'value' | 'onChangeText' | 'onBlur'
> & {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
};

export function FormInput<TFormValues extends FieldValues>({
  control,
  name,
  errorText,
  ...rest
}: FormInputProps<TFormValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState }) => (
        <Input
          value={(value ?? '') as string}
          onChangeText={onChange}
          onBlur={onBlur}
          errorText={errorText ?? fieldState.error?.message}
          {...rest}
        />
      )}
    />
  );
}

