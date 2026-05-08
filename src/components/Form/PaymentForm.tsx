import { useState } from 'react';
import styled from '@emotion/styled';
import CardPreview from '../CardPreview/CardPreview';
import InputFieldLayout from '../Layout/InputFieldLayout';
import {
  cardNumbersValidator,
  makeCvcValidator,
  makeExpirationDateValidator,
} from '../../utils/validate';

import InputFieldForm from './InputFieldForm';
import { INPUT_FIELD_CONFIG, KOREAN_CARD_COMPANIES } from '../../constants';
import { CardNumbers, ExpirationDate, KoreanCardCompany } from '../../types';
import {
  detectCardBrand,
  getCvcLength,
  getSegmentLengths,
  joinUntilEmpty,
  replaceSegmentAt,
  reshapeCardNumbers,
} from '../../utils/cardBrand';
import { isCardNumbersComplete } from '../../utils/formStatus';
import CardCompanyFieldForm from './CardCompanyFieldForm';

export default function PaymentForm() {
  const [cardNumbers, setCardNumbers] = useState<CardNumbers>(['', '', '', '']);
  const [cardCompany, setCardCompany] = useState<KoreanCardCompany | null>(null);
  const [expirationDate, setExpirationDate] = useState<ExpirationDate>({ month: '', year: '' });
  const [cvc, setCvc] = useState<string>('');

  const cardBrand = detectCardBrand(joinUntilEmpty(cardNumbers));
  const segmentLengths = getSegmentLengths(cardBrand);

  const showCardCompany = isCardNumbersComplete(cardNumbers);
  const previewBackgroundColor = cardCompany ? KOREAN_CARD_COMPANIES[cardCompany].color : '#333333';

  const handleSegmentChange = (value: string, index: number) => {
    const next = replaceSegmentAt(cardNumbers, index, value);

    const newBrand = detectCardBrand(joinUntilEmpty(next));
    const newSegmentLengths = getSegmentLengths(newBrand);

    const adjusted: CardNumbers =
      next.length === newSegmentLengths.length ? next : reshapeCardNumbers(next, newSegmentLengths);

    setCardNumbers(adjusted);
  };

  const handleCardCompanyChange = (value: KoreanCardCompany) => {
    setCardCompany(value);
  };

  const handleExpirationDateChange = (value: string, index: number) => {
    const key = index === 0 ? 'month' : 'year';

    setExpirationDate((prev) => {
      const newExpirationDate = { ...prev };
      newExpirationDate[key] = value;
      return newExpirationDate;
    });
  };

  const handleCvcChange = (value: string) => {
    setCvc(value);
  };

  return (
    <FormContainer>
      <CardPreview
        cardBrand={cardBrand}
        cardNumberList={cardNumbers}
        expirationDate={`${expirationDate['month']}/${expirationDate['year']}`}
        backgroundColor={previewBackgroundColor}
      />

      {showCardCompany && (
        <InputFieldLayout sectionTitle={INPUT_FIELD_CONFIG['CARD_COMPANY'].sectionTitle}>
          <CardCompanyFieldForm
            id="cardCompany"
            label={INPUT_FIELD_CONFIG['CARD_COMPANY'].label}
            placeholder={INPUT_FIELD_CONFIG['CARD_COMPANY'].placeholder[0]}
            value={cardCompany}
            onChange={handleCardCompanyChange}
          />
        </InputFieldLayout>
      )}

      <InputFieldLayout
        sectionTitle={INPUT_FIELD_CONFIG['CARD_NUMBERS'].sectionTitle}
        hintText={INPUT_FIELD_CONFIG['CARD_NUMBERS'].hintText}
      >
        <InputFieldForm
          id="cardNumbers"
          label={INPUT_FIELD_CONFIG['CARD_NUMBERS'].label}
          placeholderArr={INPUT_FIELD_CONFIG['CARD_NUMBERS'].placeholder}
          fieldMaxLengths={segmentLengths}
          values={cardNumbers}
          validator={cardNumbersValidator}
          onChange={handleSegmentChange}
        />
      </InputFieldLayout>

      <InputFieldLayout
        sectionTitle={INPUT_FIELD_CONFIG['EXPIRATION_DATE'].sectionTitle}
        hintText={INPUT_FIELD_CONFIG['EXPIRATION_DATE'].hintText}
      >
        <InputFieldForm
          id="expirationDate"
          label={INPUT_FIELD_CONFIG['EXPIRATION_DATE'].label}
          placeholderArr={INPUT_FIELD_CONFIG['EXPIRATION_DATE'].placeholder}
          fieldMaxLengths={[2, 2]}
          values={[expirationDate.month, expirationDate.year]}
          validator={makeExpirationDateValidator(expirationDate)}
          onChange={handleExpirationDateChange}
        />
      </InputFieldLayout>

      <InputFieldLayout sectionTitle={INPUT_FIELD_CONFIG['CVC'].sectionTitle}>
        <InputFieldForm
          id="cvc"
          label={INPUT_FIELD_CONFIG['CVC'].label}
          placeholderArr={INPUT_FIELD_CONFIG['CVC'].placeholder}
          fieldMaxLengths={[getCvcLength(cardBrand)]}
          values={[cvc]}
          validator={makeCvcValidator(cardBrand)}
          onChange={handleCvcChange}
        />
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
