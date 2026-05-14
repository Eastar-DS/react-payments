import { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import Input from '../Input/Input';
import { validateNaN } from '../../../utils/validate';
import { ValidationResult, ValidatorResult } from '../../../types';
import { ERROR_MESSAGE } from '../../../constants';

interface InputFieldProps {
  id: string;
  index: number;
  value: string;
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
  value,
  fieldMaxLength,
  placeholder,
  inputType = 'text',
  inputRef,
  validator,
  onChange,
  onFocus,
  onBlur,
}: InputFieldProps) {
  const isError = value.length > 0 && validator(value, index).error;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (validateNaN(inputValue)) {
      onChange(inputValue, index, { error: true, errorMessage: ERROR_MESSAGE.NAN, block: true });
      return;
    }

    const { error, errorMessage } = validator(inputValue, index);

    onChange(inputValue, index, { error, errorMessage, block: false });
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
        value={value}
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
