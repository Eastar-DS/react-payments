import styled from '@emotion/styled';

interface CardNumbersSegmentProps {
  numbers: string;
  index: number;
}

export default function CardNumbersSegment({ numbers, index }: CardNumbersSegmentProps) {
  const isMasked = index > 1;
  const formattedNumbers = isMasked ? '•'.repeat(numbers.length) : numbers;

  return <Numbers isMasked={isMasked}>{formattedNumbers}</Numbers>;
}

const Numbers = styled.div<{ isMasked: boolean }>`
  display: flex;
  align-items: center;
  width: 35px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: ${({ isMasked }) => (isMasked ? '-4px' : 'normal')};
  color: #fff;
`;
