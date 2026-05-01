import { ChangeEvent, FocusEvent, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import InputField from '../Common/InputField/InputField';

interface FormFieldProps {
  id: string;
  index: number;
  numbers: string;
  validator: (value: string) => {
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
  validator,
  onChange,
  setErrorMessage,
}: FormFieldProps) {
  const [isError, setIsError] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { error, errorMessage } = validator(e.target.value);

    setIsError(error);
    setErrorMessage(errorMessage);

    onChange(e, index);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length === 0) return;

    const { errorMessage } = validator(e.target.value);
    setErrorMessage(errorMessage);
  };

  const handleBlur = () => {
    setErrorMessage('');
  };

  return (
    <FormFieldContainer>
      <InputField
        isError={isError}
        id={index === 0 ? id : String(index)}
        type="text"
        maxLength={4}
        inputMode="numeric"
        value={numbers}
        onChange={(e) => handleChange(e, index)}
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
`;
