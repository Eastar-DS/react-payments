import { Navigate, useLocation, useNavigate } from 'react-router';
import { ROUTES } from '../constants';
import styled from '@emotion/styled';
import SubmitButton from '../components/Common/Button/SubmitButton';

interface CardRegistrationCompletePageState {
  cardNumberPrefix: string;
  cardCompanyName: string;
}

export default function CardRegistrationCompletePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as CardRegistrationCompletePageState | null;

  if (!state?.cardCompanyName || !state?.cardNumberPrefix)
    return <Navigate to={ROUTES.HOME} replace />;
  return (
    <Wrapper>
      <CheckIcon>✓</CheckIcon>
      <Message>
        {state.cardNumberPrefix}로 시작하는
        <br />
        {state.cardCompanyName}가 등록되었어요.
      </Message>
      <SubmitButton onClick={() => navigate(ROUTES.HOME)}>확인</SubmitButton>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 376px;
  padding: 60px 30px;
`;

const CheckIcon = styled.div`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: #333333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 700;
`;

const Message = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 25px;
  font-weight: 700;
  line-height: 1.45;
  text-align: center;
  color: #353c49;
`;
