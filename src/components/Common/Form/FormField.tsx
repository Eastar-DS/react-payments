import { ChangeEvent, FocusEvent, useState } from 'react';
import styled from '@emotion/styled';
import InputField from '../InputField/InputField';
import { validateNaN } from '../../../utils/validate';
import { ValidationResult, ValidatorResult } from '../../../types';
import { ERROR_MESSAGE } from '../../../constants';

interface FormFieldProps {
  id: string;
  index: number;
  numbers: string;
  fieldMaxLength: number;
  validator: (value: string, index: number) => ValidatorResult;
  onChange: (value: string, index: number, validation: ValidationResult) => void;
  onFocus: (validation: ValidationResult) => void;
  onBlur: () => void;
  placeholder: string;
}

export default function FormField({
  id,
  index,
  numbers,
  fieldMaxLength,
  validator,
  onChange,
  onFocus,
  onBlur,
  placeholder,
}: FormFieldProps) {
  const [isError, setIsError] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (validateNaN(value)) {
      setIsError(true);
      onChange(value, index, { error: true, errorMessage: ERROR_MESSAGE.NAN, block: true });
      return;
    }

    const { error, errorMessage } = validator(value, index);

    setIsError(error);

    onChange(value, index, { error, errorMessage, block: false });
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length === 0) return;

    const { error, errorMessage } = validator(e.target.value, index);
    onFocus({ error, errorMessage, block: false });
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') setIsError(false);
    onBlur();
  };

  return (
    <FormFieldContainer>
      <InputField
        isError={isError}
        id={index === 0 ? id : String(index)}
        type="text"
        maxLength={fieldMaxLength}
        inputMode="numeric"
        autoComplete="off"
        value={numbers}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </FormFieldContainer>
  );
}

const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;
