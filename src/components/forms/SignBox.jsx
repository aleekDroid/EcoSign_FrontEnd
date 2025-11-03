import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';

const SignBox = React.forwardRef((props, ref) => {
    return (
        <Box
            w="full"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            bg="background"
            borderColor="accent"
            borderWidth="2px"
            borderRadius="lg"
            fontFamily="body"
            color="secondary"
            mb="4">
            <Text color="secondary" fontWeight="medium">Firmar documento</Text>
            <Button
                as="b"
                size="sm"
                borderRadius="md"
                bg="accent"
                w="20%"
                color="background"
                _hover={{ bg: 'primary' }}>
                Subir archivo
            </Button>
        </Box>
    );

});

SignBox.displayName = 'SignBox';
export default SignBox;