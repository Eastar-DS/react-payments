import { useState } from 'react';
import styled from '@emotion/styled';
import CardPreview from '../CardPreview/CardPreview';
import InputFieldLayout from '../Layout/InputFieldLayout';
import { cardNumbersValidator, expirationDateValidator } from '../../utils/validate';
import CVCFieldForm from './CVCFieldForm';
import InputFieldForm from './InputFieldForm';
import { INPUT_FIELD_CONFIG } from '../../constants';
import { CardNumbers, ExpirationDateList, ExpirationDate } from '../../types';

export default function PaymentForm() {
  const [cardNumbers, setCardNumbers] = useState<CardNumbers>(['', '', '', '']);
  const [expirationDate, setExpirationDate] = useState<ExpirationDate>({ month: '', year: '' });

  const handleCardNumbersChange = (value: string, index: number) => {
    setCardNumbers((prev) => {
      const newCardNumbers = [...prev] as CardNumbers;
      newCardNumbers[index] = value;
      return newCardNumbers;
    });
  };

  const handleExpirationDateChange = (value: string, index: number) => {
    const key = index === 0 ? 'month' : 'year';

    setExpirationDate((prev) => {
      const newExpirationDate = { ...prev };
      newExpirationDate[key] = value;
      return newExpirationDate;
    });
  };

  return (
    <FormContainer>
      <CardPreview
        cardNumberList={cardNumbers}
        expirationDate={`${expirationDate['month']}/${expirationDate['year']}`}
      />

      <InputFieldLayout
        sectionTitle={INPUT_FIELD_CONFIG['CARD_NUMBERS'].sectionTitle}
        hintText={INPUT_FIELD_CONFIG['CARD_NUMBERS'].hintText}
      >
        <InputFieldForm<CardNumbers>
          id="cardNumbers"
          label={INPUT_FIELD_CONFIG['CARD_NUMBERS'].label}
          placeholderArr={INPUT_FIELD_CONFIG['CARD_NUMBERS'].placeholder}
          fieldMaxLength={4}
          value={cardNumbers}
          validator={cardNumbersValidator}
          onChange={handleCardNumbersChange}
        />
      </InputFieldLayout>

      <InputFieldLayout
        sectionTitle={INPUT_FIELD_CONFIG['EXPIRATION_DATE'].sectionTitle}
        hintText={INPUT_FIELD_CONFIG['EXPIRATION_DATE'].hintText}
      >
        <InputFieldForm<ExpirationDateList>
          id="expirationDate"
          label={INPUT_FIELD_CONFIG['EXPIRATION_DATE'].label}
          placeholderArr={INPUT_FIELD_CONFIG['EXPIRATION_DATE'].placeholder}
          fieldMaxLength={2}
          value={[expirationDate.month,expirationDate.year]}
          validator={expirationDateValidator}
          onChange={handleExpirationDateChange}
        />
      </InputFieldLayout>

      <InputFieldLayout sectionTitle={INPUT_FIELD_CONFIG['CVC'].sectionTitle}>
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
