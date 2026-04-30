import styled from '@emotion/styled';
import CardPreview from '../CardPreview/CardPreview';
import InputFieldForm from '../Common/Form/InputFieldForm';

export default function ServiceLayout() {
  // TODO: 상태 추가

  return (
    <Layout>
      <CardPreview
        cardNumbers={[
          [1, 2, 3, 4],
          [1, 2, 3, 4],
          [1, 2, 3, 4],
          [1, 2, 3, 4],
        ]}
        expirationDate={'04/21'}
      />

      <InputFieldForm />
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 45px;
  width: 376px;
  height: 700px;
  padding: 77px; 30px; 19px; 30px;
  border: 1px solid #acacac;
`;
