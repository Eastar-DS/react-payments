import styled from '@emotion/styled';
import { ComponentProps } from 'react';

export default function SubmitButton(props: ComponentProps<'button'>) {
  return <Button type="button" {...props} />;
}

const Button = styled.button`
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 4px;
  background: #333333;
  color: #f3f3f3;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
