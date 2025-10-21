import { ChakraProvider, Box, Heading, Text, Center, VStack } from '@chakra-ui/react';
import './App.css';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Center height="100vh" bg="background">
        <Box
          textAlign="center"
          p={8}
          borderRadius="md"
          boxShadow="lg"
          bg="background"
          maxW="md"
          w="90%"
        >
          <Heading as="h1" size="2xl" mb={4} color="text" fontFamily="heading">
            Bienvenido a EcoSign.
          </Heading>

          <Text fontSize="lg" mb={6} color="primary" textAlign="center">
            Probando texto 1.
          </Text>

          <Text fontSize="sm" color="accent" textAlign="center">
            Probando texto 2.
          </Text>

          <VStack spacing={4} mt={6}>
            <Text fontSize="lg" color="primary">Primary.</Text>
            <Text fontSize="lg" color="secondary">Secondary.</Text>
            <Text fontSize="lg" color="accent">Accent.</Text>
          </VStack>
        </Box>
      </Center>
    </ChakraProvider>
  );
}

export default App;
