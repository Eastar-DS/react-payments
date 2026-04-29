import styled from '@emotion/styled';

export default function InputFieldLayout({
  label,
  inputs,
  errorMessage,
}: {
  label: React.ReactNode;
  inputs: React.ReactNode;
  errorMessage: React.ReactNode;
}) {
  return (
    <FormContainer>
      {label}
      {inputs}
      {errorMessage}
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
