import { Box, ChakraProvider, Center, Heading } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme';

import LoginPage from './pages/login';
import adminHome from './pages/adminHome';
import userHome from './pages/userHome';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/adminHome" element={<adminHome />} />
          <Route path="/userHome" element={<userHome />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
