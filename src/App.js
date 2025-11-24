  import { Box, ChakraProvider, Center, Heading } from '@chakra-ui/react';
  import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
  import theme from './theme';

  import LoginPage from './pages/login';

  import AdminHome from './pages/admin/adminHome'
  import UserHome from './pages/user/userHome';
  import Usuario from './pages/admin/usuario';
  import Archivo from './pages/archivo';
  import Register from './pages/admin/register';
  import ArchivoUser from './pages/user/archivoUser';
  import Firmar from './pages/firmar';

  function App() {
    return (
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/adminHome" element={<AdminHome />} />
            <Route path="/userHome" element={<UserHome />} />
            <Route path="/usuario" element={<Usuario />} />
            <Route path="/archivo" element={<Archivo />} />
            <Route path="/archivoUser" element={<ArchivoUser />} />
            <Route path="/register" element={<Register />} />
            <Route path="/firmar" element={<Firmar />} />

            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
      </ChakraProvider>
    );
  }

  export default App;
