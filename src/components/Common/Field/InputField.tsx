import { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import Input from '../Input/Input';
import { validateNaN } from '../../../utils/validate';
import { ValidationResult, ValidatorResult } from '../../../types';
import { ERROR_MESSAGE } from '../../../constants';

interface InputFieldProps {
  id: string;
  index: number;
  numbers: string;
  fieldMaxLength: number;
  placeholder: string;
  inputType?: 'text' | 'password';
  inputRef?: (el: HTMLInputElement | null) => void;
  validator: (value: string, index: number) => ValidatorResult;
  onChange: (value: string, index: number, validation: ValidationResult) => void;
  onFocus: () => void;
  onBlur: () => void;
}

export default function InputField({
  id,
  index,
  numbers,
  fieldMaxLength,
  placeholder,
  inputType = 'text',
  inputRef,
  validator,
  onChange,
  onFocus,
  onBlur,
}: InputFieldProps) {
  const isError = numbers.length > 0 && validator(numbers, index).error;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (validateNaN(value)) {
      onChange(value, index, { error: true, errorMessage: ERROR_MESSAGE.NAN, block: true });
      return;
    }

    const { error, errorMessage } = validator(value, index);

    onChange(value, index, { error, errorMessage, block: false });
  };

  return (
    <InputFieldContainer>
      <Input
        isError={isError}
        id={index === 0 ? id : String(index)}
        type={inputType}
        maxLength={fieldMaxLength}
        inputMode="numeric"
        ref={inputRef}
        autoComplete="off"
        value={numbers}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </InputFieldContainer>
  );
}

const InputFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;
