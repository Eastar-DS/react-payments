import { useState } from 'react';
import styled from '@emotion/styled';
import CardPreview from '../CardPreview/CardPreview';
import FieldSection from '../Common/Section/FieldSection';
import {
  makeCvcValidator,
  makeExpirationDateValidator,
  passwordValidator,
} from '../../utils/validate';

import InputFieldGroup from './InputFieldGroup';
import {
  INPUT_FIELD_CONFIG,
  KOREAN_CARD_COMPANIES,
  ROUTES,
  VALIDATION_RULE,
} from '../../constants';
import { ExpirationDate, KoreanCardCompany } from '../../types';
import { getCvcLength } from '../../utils/cardBrand';
import {
  isCvcComplete,
  isExpirationDateComplete,
  isPasswordComplete,
} from '../../utils/formStatus';
import CardCompanyField from './CardCompanyField';
import { useNavigate } from 'react-router';
import SubmitButton from '../Common/Button/SubmitButton';
import useCardNumbers from '../../hooks/useCardNumbers';

export default function PaymentForm() {
  const navigate = useNavigate();
  const cardNumber = useCardNumbers();
  const [cardCompany, setCardCompany] = useState<KoreanCardCompany | null>(null);
  const [expirationDate, setExpirationDate] = useState<ExpirationDate>({ month: '', year: '' });
  const [cvc, setCvc] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const previewBackgroundColor = cardCompany ? KOREAN_CARD_COMPANIES[cardCompany].color : '#333333';

  const showCardCompany = cardNumber.isComplete;
  const showExpiration = showCardCompany && cardCompany !== null;
  const showCvc = showExpiration && isExpirationDateComplete(expirationDate);
  const showPassword = showCvc && isCvcComplete(cvc, cardNumber.cardBrand);

  const isFormValid = showPassword && isPasswordComplete(password);

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

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = () => {
    if (!isFormValid || !cardCompany) return;
    navigate(ROUTES.COMPLETE, {
      state: {
        cardNumberPrefix: cardNumber.cardNumbers[0],
        cardCompanyName: KOREAN_CARD_COMPANIES[cardCompany].label,
      },
    });
  };

  return (
    <FormContainer>
      <CardPreview
        cardBrand={cardNumber.cardBrand}
        cardNumbers={cardNumber.cardNumbers}
        expirationDate={`${expirationDate['month']}/${expirationDate['year']}`}
        backgroundColor={previewBackgroundColor}
      />
      {showPassword && (
        <FieldSection
          sectionTitle={INPUT_FIELD_CONFIG['PASSWORD'].sectionTitle}
          hintText={INPUT_FIELD_CONFIG['PASSWORD'].hintText}
        >
          <InputFieldGroup
            id="password"
            label={INPUT_FIELD_CONFIG['PASSWORD'].label}
            placeholders={INPUT_FIELD_CONFIG['PASSWORD'].placeholder}
            fieldMaxLengths={[VALIDATION_RULE.PASSWORD_LENGTH]}
            values={[password]}
            validator={passwordValidator}
            onChange={handlePasswordChange}
            inputType="password"
          />
        </FieldSection>
      )}

      {showCvc && (
        <FieldSection sectionTitle={INPUT_FIELD_CONFIG['CVC'].sectionTitle}>
          <InputFieldGroup
            id="cvc"
            label={INPUT_FIELD_CONFIG['CVC'].label}
            placeholders={INPUT_FIELD_CONFIG['CVC'].placeholder}
            fieldMaxLengths={[getCvcLength(cardNumber.cardBrand)]}
            values={[cvc]}
            validator={makeCvcValidator(cardNumber.cardBrand)}
            onChange={handleCvcChange}
          />
        </FieldSection>
      )}

      {showExpiration && (
        <FieldSection
          sectionTitle={INPUT_FIELD_CONFIG['EXPIRATION_DATE'].sectionTitle}
          hintText={INPUT_FIELD_CONFIG['EXPIRATION_DATE'].hintText}
        >
          <InputFieldGroup
            id="expirationDate"
            label={INPUT_FIELD_CONFIG['EXPIRATION_DATE'].label}
            placeholders={INPUT_FIELD_CONFIG['EXPIRATION_DATE'].placeholder}
            fieldMaxLengths={[2, 2]}
            values={[expirationDate.month, expirationDate.year]}
            validator={makeExpirationDateValidator(expirationDate)}
            onChange={handleExpirationDateChange}
          />
        </FieldSection>
      )}

      {showCardCompany && (
        <FieldSection sectionTitle={INPUT_FIELD_CONFIG['CARD_COMPANY'].sectionTitle}>
          <CardCompanyField
            id="cardCompany"
            label={INPUT_FIELD_CONFIG['CARD_COMPANY'].label}
            placeholder={INPUT_FIELD_CONFIG['CARD_COMPANY'].placeholder[0]}
            value={cardCompany}
            onChange={handleCardCompanyChange}
          />
        </FieldSection>
      )}

      <FieldSection
        sectionTitle={INPUT_FIELD_CONFIG['CARD_NUMBERS'].sectionTitle}
        hintText={INPUT_FIELD_CONFIG['CARD_NUMBERS'].hintText}
      >
        <InputFieldGroup
          id="cardNumbers"
          label={INPUT_FIELD_CONFIG['CARD_NUMBERS'].label}
          placeholders={INPUT_FIELD_CONFIG['CARD_NUMBERS'].placeholder}
          fieldMaxLengths={cardNumber.segmentLengths}
          values={cardNumber.cardNumbers}
          validator={cardNumber.validator}
          onChange={cardNumber.handleSegmentChange}
        />
      </FieldSection>

      {isFormValid && (
        <SubmitButtonContainer>
          <SubmitButton disabled={!isFormValid} onClick={handleSubmit}>
            확인
          </SubmitButton>
        </SubmitButtonContainer>
      )}
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 45px;
`;

const SubmitButtonContainer = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  margin-top: auto;
  padding: 12px 0;
  background: #fff;
`;
