import styled from '@emotion/styled';

interface CardNumbersProps {
  numbers: number[];
  index: number;
}

export default function CardNumbers({ numbers, index }: CardNumbersProps) {
  const formattedNumbers = index > 1 ? numbers.map(() => '•').join('') : numbers.join('');

  return <Numbers>{formattedNumbers}</Numbers>;
}

const Numbers = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #fff;
`;
