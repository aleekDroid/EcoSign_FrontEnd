import { Box, ChakraProvider, Center, Heading } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme';

import LoginPage from './pages/login';
<<<<<<< Updated upstream
import AdminHome from './pages/adminHome';
import UserHome from './pages/userHome';
import Usuario from './pages/usuario';
=======
import AdminHome from './pages/admin/adminHome';
import UserHome from './pages//user/userHome';
import Usuario from './pages/admin/usuario';
import Archivo from './pages/archivo';
import Register from './pages/admin/register';
>>>>>>> Stashed changes

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/userHome" element={<UserHome />} />
          <Route path="/usuario" element={<Usuario />} />
<<<<<<< Updated upstream
=======
          <Route path="/archivo" element={<Archivo />} />
          <Route path="/register" element={<Register />} />
>>>>>>> Stashed changes
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
