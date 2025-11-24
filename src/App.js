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
import AdminFirmar from './pages/admin/adminFirmar';
import UserFirmar from './pages/user/UserFirmar'

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/adminHome" element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={[1]}>
                <AdminHome />
              </RoleRoute>
            </ProtectedRoute>
          } />

          <Route path="/userHome" element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={[2]}>
                <UserHome />
              </RoleRoute>
            </ProtectedRoute>
          } />

          <Route path="/usuario" element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={[1]}>
                <Usuario />
              </RoleRoute>
            </ProtectedRoute>
          } />

          <Route path="/archivo" element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={[1]}>
                <Archivo />
              </RoleRoute>
            </ProtectedRoute>
          } />

          <Route path="/archivoUser" element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={[2]}>
                <ArchivoUser />
              </RoleRoute>
            </ProtectedRoute>
          } />

          <Route path="/register" element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={[1]}>
                <Register />
              </RoleRoute>
            </ProtectedRoute>
          } />

          <Route path="/adminFirmar" element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={[1]}>
                <AdminFirmar />
              </RoleRoute>
            </ProtectedRoute>
          } />

          <Route path='/userFirmar' element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={[2]}>
                <UserFirmar />
              </RoleRoute>
            </ProtectedRoute>
          } />

        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
