import { Box, ChakraProvider, Center, Heading } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme';

import LoginPage from './pages/login';
import AdminHome from './pages/adminHome';
import UserHome from './pages/userHome';
import Usuario from './pages/usuario';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/userHome" element={<UserHome />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
