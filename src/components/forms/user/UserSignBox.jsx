import React, { useRef, useState } from 'react';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import { uploadDocument } from '../../../services/documentService';

const UserSignBox = React.forwardRef(({ onUploadSuccess }, ref) => {
    
    const hiddenFileInputRef = useRef(null);
    
    const [isUploading, setIsUploading] = useState(false);
    
    const toast = useToast();

    const handleButtonClick = () => {
        hiddenFileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            toast({
                title: "Formato incorrecto",
                description: "Solo se permiten archivos PDF.",
                status: "warning",
                duration: 4000,
                isClosable: true,
                position: 'top-right'
            });
            return;
        }

        try {
            setIsUploading(true);

            await uploadDocument(file);

            toast({
                title: "Documento subido",
                description: "El archivo se ha guardado exitosamente.",
                status: "success",
                duration: 4000,
                isClosable: true,
                position: 'top-right'
            });

            if (onUploadSuccess) {
                onUploadSuccess();
            }

        } catch (err) {
            console.error(err);
            toast({
                title: "Error al subir",
                description: err.message || "No se pudo cargar el archivo.",
                status: "error",
                duration: 4000,
                isClosable: true,
                position: 'top-right'
            });
        } finally {
            setIsUploading(false);
            event.target.value = null;
        }
    };

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
            mb="4"
        >
            <Text color="secondary-default" fontWeight="medium">Firmar documento</Text>
            
            <input
                type="file"
                ref={hiddenFileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="application/pdf"
            />

            <Button
                as="b"
                size="sm"
                borderRadius="md"
                bg="secondary-default"
                w={{ base: 'auto', md: '20%' }}
                color="bg-default"
                _hover={{ bg: 'text-default' }}
                isLoading={isUploading}
                loadingText="Cargando..."
                onClick={handleButtonClick}
            >
                Subir
                <Box 
                    as="span" 
                    display={{ base: 'none', md: 'inline' }} 
                    ml={1}>
                    documento
                </Box>
            </Button>
        </Box>
    );
});

UserSignBox.displayName = 'UserSignBox';
export default UserSignBox;