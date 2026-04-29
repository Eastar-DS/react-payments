import styled from '@emotion/styled';

export default function Label({ children }: { children: React.ReactNode }) {
  return <Text>{children}</Text>;
}

const Text = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  color: #0a0d13;
`;
