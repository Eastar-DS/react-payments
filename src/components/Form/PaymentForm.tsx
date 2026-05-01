import { ChangeEvent, useState } from 'react';
import styled from '@emotion/styled';
import CardPreview from '../CardPreview/CardPreview';
import InputFieldLayout from '../Layout/InputFieldLayout';
import InputField from '../Common/InputField/InputField';
import InputFieldForm from './InputFieldForm';
import { cardNumbersValidator } from '../../utils/validate';

export type CardNumbersType = [string, string, string, string];
export type ExpirationDateType = { month: string; year: string };

export default function PaymentForm() {
  const [cardNumbers, setCardNumbers] = useState<CardNumbersType>(['', '', '', '']);

  const handleCardNumbersChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setCardNumbers((prev) => {
      const newCardNumbers = [...prev] as CardNumbersType;
      newCardNumbers[index] = e.target.value;
      return newCardNumbers;
    });
  };

  return (
    <FormContainer>
      <CardPreview cardNumbers={cardNumbers} expirationDate={'04/21'} />

      <InputFieldLayout
        sectionTitle="결제할 카드 번호를 입력해 주세요"
        hintText="본인 명의의 카드만 결제 가능합니다."
      >
        <InputFieldForm<CardNumbersType>
          id="1"
          label="카드 번호"
          value={cardNumbers}
          validator={cardNumbersValidator}
          onChange={handleCardNumbersChange}
        />
      </InputFieldLayout>

      <InputFieldLayout
        sectionTitle="카드 유효기간을 입력해 주세요"
        hintText="월/년도(MMYY)를 순서대로 입력해 주세요."
      >
        <InputFieldWrapper>
          {cardNumbers.map((value, index) => (
            <InputField
              isError={false}
              type="number"
              value={value}
              onChange={(e) => handleCardNumbersChange(e, index)}
            />
          ))}
        </InputFieldWrapper>
      </InputFieldLayout>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 45px;
`;

const InputFieldWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
