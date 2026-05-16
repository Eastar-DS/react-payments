import { useState } from 'react';
import styled from '@emotion/styled';
import CardPreview from '../CardPreview/CardPreview';
import FieldSection from '../Common/Section/FieldSection';
import { makeCvcValidator, passwordValidator } from '../../utils/validate';

import InputFieldGroup from './InputFieldGroup';
import {
  INPUT_FIELD_CONFIG,
  KOREAN_CARD_COMPANIES,
  ROUTES,
  VALIDATION_RULE,
} from '../../constants';
import { KoreanCardCompany } from '../../types';
import { getCvcLength } from '../../utils/cardBrand';
import { isCardCompanyComplete, isCvcComplete, isPasswordComplete } from '../../utils/formStatus';
import CardCompanyField from './CardCompanyField';
import { useNavigate } from 'react-router';
import SubmitButton from '../Common/Button/SubmitButton';
import useCardNumbers from '../../hooks/useCardNumbers';
import useExpirationDate from '../../hooks/useExpirationDate';

export default function PaymentForm() {
  const navigate = useNavigate();
  const cardNumbers = useCardNumbers();
  const [cardCompany, setCardCompany] = useState<KoreanCardCompany | null>(null);
  const expirationDate = useExpirationDate();
  const [cvc, setCvc] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const previewBackgroundColor = cardCompany ? KOREAN_CARD_COMPANIES[cardCompany].color : '#333333';

  const showCardCompany = cardNumbers.isComplete;
  const showExpiration = showCardCompany && isCardCompanyComplete(cardCompany);
  const showCvc = showExpiration && expirationDate.isComplete;
  const showPassword = showCvc && isCvcComplete(cvc, cardNumbers.cardBrand);

  const isFormValid = showPassword && isPasswordComplete(password);

  const handleCardCompanyChange = (value: KoreanCardCompany) => {
    setCardCompany(value);
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
        cardNumberPrefix: cardNumbers.value[0],
        cardCompanyName: KOREAN_CARD_COMPANIES[cardCompany].label,
      },
    });
  };

  return (
    <FormContainer>
      <CardPreview
        cardBrand={cardNumbers.cardBrand}
        cardNumbers={cardNumbers.value}
        expirationDate={`${expirationDate.value.month}/${expirationDate.value.year}`}
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
            fieldMaxLengths={[getCvcLength(cardNumbers.cardBrand)]}
            values={[cvc]}
            validator={makeCvcValidator(cardNumbers.cardBrand)}
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
            values={expirationDate.expirationDateSegments}
            validator={expirationDate.validator}
            onChange={expirationDate.handleSegmentChange}
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
          fieldMaxLengths={cardNumbers.segmentLengths}
          values={cardNumbers.value}
          validator={cardNumbers.validator}
          onChange={cardNumbers.handleSegmentChange}
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
