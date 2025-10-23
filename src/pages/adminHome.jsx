import { Center, Box, Heading, VStack, Button, Text } from "@chakra-ui/react";
import EcoSign from "../assets/EcoSign.PNG";

function adminHome() {
    return (
        <Center minHeight="100vh" bg="background"> 
        <Box
            textAlign="center"
            p={8}
            bg="background"
            maxW="md"
            w="60%"
            fontFamily= "body">
            <VStack spacing={8} mb={8}>
                <Text>Dashboard Admin</Text>
                </VStack>
        </Box>
        </Center>
    )
}

export default adminHome;