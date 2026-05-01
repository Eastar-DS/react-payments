import { styled } from 'storybook/theming';
import CardNumbers from './CardNumbers';
import { CardNumbersType } from '../Form/PaymentForm';

export const cardBrand = { Visa: 'Visa', MasterCard: 'MasterCard' } as const;

type CardBrandType = keyof typeof cardBrand;

interface CardPreviewProps {
  cardNumbers: CardNumbersType;
  expirationDate: string;
}

export default function CardPreview({ cardNumbers, expirationDate }: CardPreviewProps) {
  const [month, year] = expirationDate.split('/');
  return (
    <Card>
      <Header>
        <Magenetic />
        <BrandImage></BrandImage>
      </Header>

      <ContentWrapper>
        <CardNumberList>
          {cardNumbers.map((numbers, index) => (
            <CardNumbers numbers={numbers} index={index}></CardNumbers>
          ))}
        </CardNumberList>
        <ExpirationDate>
          {month.length > 0 || year.length > 0 ? `${month} / ${year}` : ''}
        </ExpirationDate>
      </ContentWrapper>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 212px;
  height: 132px;
  padding: 8px 12px;
  border-radius: 4px;
  box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.25);
  background-color: #333333;
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

const BrandImage = styled.div`
  width: 36px;
  height: 22px;
  background-color: #ddcd78;
  border-radius: 4px;
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
