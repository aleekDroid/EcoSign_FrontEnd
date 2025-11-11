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
            bg="bg-default"
            borderColor="secondary-default"
            borderWidth="2px"
            borderRadius="lg"
            fontFamily="body"
            color="secondary-default"
            mb="4">
            <Text color="secondary" fontWeight="medium">Firmar documento</Text>
            <Button
                as="b"
                size="sm"
                borderRadius="md"
                bg="secondary-default"
                w="20%"
                color="bg-default"
                _hover={{ bg: '#aac0c9ff' }}>
                Subir archivo
            </Button>
        </Box>
    );

});

SignBox.displayName = 'SignBox';
export default SignBox;