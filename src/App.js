import { Box, ChakraProvider, Center, Heading } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme';

import LoginPage from './pages/login';

function TestProtectedPage()  {
  return (
    <Center minHeight="100vh" bg="background">
      <Box
        textAlign="center"
        p={8}
        borderRadius="md"
        boxShadow="lg"
        bg="secondary"
        maxW="md"
        w="90%">
        <Heading color="background">
          Dashboard de prueba para el login.
        </Heading>
      </Box>
    </Center>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<TestProtectedPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
