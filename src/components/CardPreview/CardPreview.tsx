import styled from '@emotion/styled';
import CardNumbersSegment from './CardNumbersSegment';
import { BRAND_LOGO_MAP } from '../../constants';
import { CardBrandOrNone, CardNumbers } from '../../types';

interface CardPreviewProps {
  cardNumbers: CardNumbers;
  expirationDate: string;
  cardBrand: CardBrandOrNone;
  backgroundColor?: string;
}

export default function CardPreview({
  cardNumbers,
  expirationDate,
  cardBrand,
  backgroundColor = '#333',
}: CardPreviewProps) {
  const [month = '', year = ''] = expirationDate.split('/');

  return (
    <Card $bgColor={backgroundColor}>
      <Header>
        <Magenetic />
        {BRAND_LOGO_MAP[cardBrand] && (
          <BrandImageWrapper>
            <BrandImage src={BRAND_LOGO_MAP[cardBrand]} alt="card-brand-image" />
          </BrandImageWrapper>
        )}
      </Header>

      <ContentWrapper>
        <CardNumberList>
          {cardNumbers.map((segment, index) => (
            <CardNumbersSegment key={`cardNumbers-${index}`} numbers={segment} index={index} />
          ))}
        </CardNumberList>
        <ExpirationDate>
          {month.length > 0 || year.length > 0 ? `${month} / ${year}` : ''}
        </ExpirationDate>
      </ContentWrapper>
    </Card>
  );
}

const Card = styled.div<{ $bgColor: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 212px;
  height: 132px;
  padding: 8px 12px;
  border-radius: 4px;
  box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.25);
  background-color: ${({ $bgColor }) => $bgColor};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 14px;
`;

const Magenetic = styled.div`
  width: 36px;
  height: 22px;
  background-color: #ddcd78;
  border-radius: 4px;
`;

const BrandImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 22px;

  border: 1px solid #d9d9d9;
  border-radius: 4px;
`;

const BrandImage = styled.img`
  width: 100%;
  height: auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CardNumberList = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 170px;
  height: 20px;
`;

const ExpirationDate = styled.div`
  display: flex;
  justify-content: space-around;
  width: 44px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
`;
