import styled from '@emotion/styled';
import SectionTitle from '../SectionTitle/SectionTitle';
import HintText from '../HintText/HintText';

export default function FieldSection({
  sectionTitle,
  hintText,
  children,
}: {
  sectionTitle: React.ReactNode;
  hintText?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Section>
      <Header>
        <SectionTitle>{sectionTitle}</SectionTitle>
        {hintText ? <HintText>{hintText}</HintText> : null}
      </Header>
      <ContentWrapper>{children}</ContentWrapper>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
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
