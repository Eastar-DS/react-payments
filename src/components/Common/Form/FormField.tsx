import { ChangeEvent, FocusEvent, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import InputField from '../InputField/InputField';

interface FormFieldProps {
  id: string;
  index: number;
  numbers: string;
  fieldMaxLength: number;
  validator: (
    value: string,
    index: number
  ) => {
    error: boolean;
    errorMessage: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  setErrorMessage: React.Dispatch<SetStateAction<string>>;
}

export default function FormField({
  id,
  index,
  numbers,
  fieldMaxLength,
  validator,
  onChange,
  setErrorMessage,
}: FormFieldProps) {
  const [isError, setIsError] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { error, errorMessage } = validator(e.target.value, index);

    setIsError(error);
    setErrorMessage(errorMessage);

    onChange(e, index);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length === 0) return;

    const { errorMessage } = validator(e.target.value, index);
    setErrorMessage(errorMessage);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') setIsError(false);
    setErrorMessage('');
  };

  return (
    <FormFieldContainer>
      <InputField
        isError={isError}
        id={index === 0 ? id : String(index)}
        type="text"
        maxLength={fieldMaxLength}
        inputMode="numeric"
        value={numbers}
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
