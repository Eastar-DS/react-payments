import styled from '@emotion/styled';
import Label from '../Common/Label/Label';
import InputField from '../Common/InputField/InputField';
import { ChangeEvent } from 'react';
import { CardNumbersType, ExpirationDateType } from './PaymentForm';

interface InputFieldFormProps<T extends CardNumbersType | ExpirationDateType | string> {
  id: string;
  inputLength: number;
  label: string;
  value: T;
  onChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
}

export default function InputFieldForm<T extends CardNumbersType | ExpirationDateType | string>({
  id,
  inputLength,
  label,
  value,
  onChange,
}: InputFieldFormProps<T>) {
  const convertValueToStringArray = (value: T): string[] => {
    if (typeof value === 'string') return [value];
    if (Array.isArray(value)) return value;
    return Object.values(value);
  };

  return (
    <FormContainer>
      <Label htmlFor={id}>{label}</Label>
      
      <InputFieldWrapper>
        {Array.from({ length: inputLength }).map((_, index) => (
          <InputField
            isError={false}
            id={index === 0 ? id : String(index)}
            type="number"
            value={convertValueToStringArray(value)[index]}
            onChange={(e) => onChange(e, index)}
          />
        ))}
      </InputFieldWrapper>
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
