import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import InputField from '../Common/Field/InputField';
import Label from '../Common/Label/Label';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';
import { ValidatorResult } from '../../types';

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
  inputType,
  validator,
  onChange,
}: InputFieldGroupProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const errorMessage =
    focusedIndex !== null ? validator(values[focusedIndex], focusedIndex).errorMessage : '';

  const focusNextField = (value: string, currentIndex: number) => {
    const isFilled = value.length === fieldMaxLengths[currentIndex];
    const hasNext = currentIndex < values.length - 1;
    if (isFilled && hasNext) {
      inputRefs.current[currentIndex + 1]?.focus();
    }
  };

  const handleFieldChange = (
    value: string,
    index: number,
    validation: { error: boolean; errorMessage: string; block: boolean }
  ) => {
    if (validation.block) return;

    onChange(value, index);
    focusNextField(value, index);
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <GroupContainer>
      <Label htmlFor={id}>{label}</Label>

      <InputFieldWrapper>
        {values.map((value, index) => (
          <InputField
            key={`${label}-${index}`}
            id={index === 0 ? id : String(index)}
            index={index}
            value={value}
            fieldMaxLength={fieldMaxLengths[index]}
            inputType={inputType}
            inputRef={(el) => {
              inputRefs.current[index] = el;
            }}
            validator={validator}
            onChange={handleFieldChange}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            placeholder={placeholders[index]}
          />
        ))}
      </InputFieldWrapper>

      {<ErrorMessage>{errorMessage.trim().length > 0 && errorMessage}</ErrorMessage>}
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
