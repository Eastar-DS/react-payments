import styled from '@emotion/styled';
import SectionTitle from '../Common/SectionTitle/SectionTitle';
import HintText from '../Common/HintText/HintText';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';

export default function InputFieldLayout({
  sectionTitle,
  hintText,
  children,
  errorMessage,
}: {
  sectionTitle: React.ReactNode;
  hintText: React.ReactNode;
  children: React.ReactNode;
  errorMessage: React.ReactNode;
}) {
  return (
    <Layout>
      <Header>
        <SectionTitle>{sectionTitle}</SectionTitle>
        <HintText>{hintText}</HintText>
      </Header>
      <ContentWrapper>
        {children}
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </ContentWrapper>
    </Layout>
  );
}

const Layout = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
