import styled from '@emotion/styled';
import { Route, Routes } from 'react-router';
import { ROUTES } from './constants';
import PaymentPage from './pages/PaymentPage';
import CompletePage from './pages/CompletePage';

function App() {
  return (
    <RootLayout>
      <Routes>
        <Route path={ROUTES.HOME} element={<PaymentPage />} />
        <Route path={ROUTES.COMPLETE} element={<CompletePage />} />
      </Routes>
    </RootLayout>
  );
}

const RootLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: 0;
`;

export default App;
