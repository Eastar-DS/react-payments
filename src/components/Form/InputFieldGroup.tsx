import styled from '@emotion/styled';
import { ChangeEvent, useRef, useState } from 'react';
import InputField from '../Common/InputField/InputField';
import Label from '../Common/Label/Label';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';
import { ValidatorResult } from '../../types';
import { validateNaN } from '../../utils/validate';

interface InputFieldGroupProps {
  id: string;
  label: string;
  placeholders: readonly string[];
  fieldMaxLengths: readonly number[];
  values: readonly string[];
  inputType?: 'text' | 'password';
  validator: (inputValue: string, index: number) => ValidatorResult;
  onChange: (value: string, index: number) => void;
}

export default function InputFieldGroup({
  id,
  label,
  placeholders,
  fieldMaxLengths,
  values,
  inputType = 'text',
  validator,
  onChange,
}: InputFieldGroupProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const errorMessage =
    focusedIndex !== null ? validator(values[focusedIndex], focusedIndex).errorMessage : '';

  const isErrors = values.map((value, index) => value.length > 0 && validator(value, index).error);

  const focusNextField = (value: string, currentIndex: number) => {
    const isFilled = value.length === fieldMaxLengths[currentIndex];
    const hasNext = currentIndex < values.length - 1;
    if (isFilled && hasNext) {
      inputRefs.current[currentIndex + 1]?.focus();
    }
  };

  const handleInputFieldChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateNaN(value)) return;
    onChange(value, index);
    focusNextField(value, index);
  };

  const handleFocus = (index: number) => () => setFocusedIndex(index);
  const handleBlur = () => setFocusedIndex(null);

  return (
    <GroupContainer>
      <Label htmlFor={id}>{label}</Label>

      <InputFieldWrapper>
        {values.map((value, index) => (
          <InputField
            key={`${label}-${index}`}
            id={index === 0 ? id : `${id}-${index}`}
            isError={isErrors[index]}
            type={inputType}
            maxLength={fieldMaxLengths[index]}
            inputMode="numeric"
            autoComplete="off"
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            value={value}
            placeholder={placeholders[index]}
            onChange={handleInputFieldChange(index)}
            onFocus={handleFocus(index)}
            onBlur={handleBlur}
          />
        ))}
      </InputFieldWrapper>

      <ErrorMessage>{errorMessage.trim().length > 0 && errorMessage}</ErrorMessage>
    </GroupContainer>
  );
}

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputFieldWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
