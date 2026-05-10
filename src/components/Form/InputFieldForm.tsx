import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import FormField from '../Common/Form/FormField';
import Label from '../Common/Label/Label';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';
import { ValidatorResult } from '../../types';

interface InputFieldFormProps {
  id: string;
  label: string;
  placeholderArr: readonly string[];
  fieldMaxLengths: readonly number[];
  values: readonly string[];
  inputType?: 'text' | 'password';
  validator: (inputValue: string, index: number) => ValidatorResult;
  onChange: (value: string, index: number) => void;
}

export default function InputFieldForm({
  id,
  label,
  placeholderArr,
  fieldMaxLengths,
  values,
  inputType,
  validator,
  onChange,
}: InputFieldFormProps) {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

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
    setErrorMessage(validation.errorMessage);
    if (!validation.block) {
      onChange(value, index);
      focusNextField(value, index);
    }
  };

  const handleFocus = (validation: { error: boolean; errorMessage: string; block: boolean }) => {
    setErrorMessage(validation.errorMessage);
  };

  const handleBlur = () => {
    setErrorMessage('');
  };

  return (
    <FormContainer>
      <Label htmlFor={id}>{label}</Label>

      <InputFieldWrapper>
        {values.map((numbers, index) => (
          <FormField
            key={`${label}-${index}`}
            id={index === 0 ? id : String(index)}
            index={index}
            numbers={numbers}
            fieldMaxLength={fieldMaxLengths[index]}
            inputType={inputType}
            inputRef={(el) => {inputRefs.current[index] = el;}}
            validator={validator}
            onChange={handleFieldChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholderArr[index]}
          />
        ))}
      </InputFieldWrapper>

      {<ErrorMessage>{errorMessage.trim().length > 0 && errorMessage}</ErrorMessage>}
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputFieldWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
