import styled from '@emotion/styled';
import Label from '../Common/Label/Label';
import { ChangeEvent, useState } from 'react';
import { CardNumbersType, ExpirationDateType } from './PaymentForm';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';
import FormField from './FormField';

interface InputFieldFormProps<T extends CardNumbersType | ExpirationDateType | string> {
  id: string;
  label: string;
  value: T;
  validator: (
    inputValue: string,
    index: number
  ) => { error: boolean; errorMessage: string };
  onChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
}

export default function InputFieldForm<T extends CardNumbersType | ExpirationDateType | string>({
  id,
  label,
  value,
  validator,
  onChange,
}: InputFieldFormProps<T>) {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const convertValueToStringArray = (value: T): string[] => {
    if (typeof value === 'string') return [value];
    if (Array.isArray(value)) return value;
    return Object.values(value);
  };

  const numberList = convertValueToStringArray(value);

  return (
    <FormContainer>
      <Label htmlFor={id}>{label}</Label>

      <InputFieldWrapper>
        {Array.from({ length: numberList.length }).map((_, index) => (
          <FormField
            id={index === 0 ? id : String(index)}
            index={index}
            numbers={numberList[index]}
            validator={(value) => validator(value, index)}
            onChange={onChange}
            setErrorMessage={setErrorMessage}
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
