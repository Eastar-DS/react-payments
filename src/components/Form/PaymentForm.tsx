import { ChangeEvent, useState } from 'react';
import styled from '@emotion/styled';
import CardPreview from '../CardPreview/CardPreview';
import InputFieldLayout from '../Layout/InputFieldLayout';
import { cardNumbersValidator, expirationDateValidator } from '../../utils/validate';
import CVCFieldForm from './CVCFieldForm';
import InputFieldForm from '../Common/Form/InputFieldForm';

export type CardNumbersType = [string, string, string, string];
export type ExpirationDateType = { month: string; year: string };

export default function PaymentForm() {
  const [cardNumbers, setCardNumbers] = useState<CardNumbersType>(['', '', '', '']);
  const [expirationDate, setExpirationDate] = useState<ExpirationDateType>({ month: '', year: '' });

  const handleCardNumbersChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setCardNumbers((prev) => {
      const newCardNumbers = [...prev] as CardNumbersType;
      newCardNumbers[index] = e.target.value;
      return newCardNumbers;
    });
  };

  const handleExpirationDateChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const key = index === 0 ? 'month' : 'year';

    setExpirationDate((prev) => {
      const newExpirationDate = { ...prev };
      newExpirationDate[key] = e.target.value;
      return newExpirationDate;
    });
  };

  return (
    <FormContainer>
      <CardPreview
        cardNumbers={cardNumbers}
        expirationDate={`${expirationDate['month']}/${expirationDate['year']}`}
      />

      <InputFieldLayout
        sectionTitle="결제할 카드 번호를 입력해 주세요"
        hintText="본인 명의의 카드만 결제 가능합니다."
      >
        <InputFieldForm<CardNumbersType>
          id="cardNumbers"
          label="카드 번호"
          fieldMaxLength={4}
          value={cardNumbers}
          validator={cardNumbersValidator}
          onChange={handleCardNumbersChange}
        />
      </InputFieldLayout>

      <InputFieldLayout
        sectionTitle="카드 유효기간을 입력해 주세요"
        hintText="월/년도(MMYY)를 순서대로 입력해 주세요."
      >
        <InputFieldForm<ExpirationDateType>
          id="expirationDate"
          label="유효기간"
          fieldMaxLength={2}
          value={expirationDate}
          validator={expirationDateValidator}
          onChange={handleExpirationDateChange}
        />
      </InputFieldLayout>

      <InputFieldLayout sectionTitle="CVC 번호를 입력해 주세요" hintText="">
        <CVCFieldForm />
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
