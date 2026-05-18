import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import getCards from '../api/cards';
import styled from '@emotion/styled';
import { Card } from '../types';
import { ROUTES } from '../constants';

type CardsFetchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Card[] }
  | { status: 'error'; error: Error };

export default function CardListPage() {
  const navigate = useNavigate();
  const [fetchState, setFetchState] = useState<CardsFetchState>({ status: 'idle' });

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setFetchState({ status: 'loading' });
      try {
        const data = await getCards(controller.signal);
        setFetchState({ status: 'success', data: data });
      } catch (err) {
        const error = err as Error;
        if (error.name === 'AbortError') return;
        setFetchState({ status: 'error', error: error });
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  const handleAddCard = () => navigate(ROUTES.HOME);
  return (
    <PageContainer>
      <Header>보유 카드{fetchState.status === 'success' && ` ${fetchState.data.length}`}</Header>

      {/* TODO: idle, loading 상태 스켈레톤 */}

      {/* TODO: 카드가 0개일 때 empty. {fetchState.status === 'success' && fetchState.data.length === 0 && } */}

      {fetchState.status === 'success' && fetchState.data.length > 0 && (
        <>
          {/* TODO: 카드하나 컴포넌트{<CardRow key={Card.id} card={card} />} */}
          <AddButton onClick={handleAddCard}>+ 카드 추가</AddButton>
        </>
      )}

      {/* TODO: error 상태 {fetchState.status === 'error' && } */}
    </PageContainer>
  );
}

const PageContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 376px;
  padding: 28px;
`;

const Header = styled.h1`
  font-size: 18px;
  font-weight: 700;
`;

const AddButton = styled.button`
  /* + 카드 추가 outline 버튼 */
`;
