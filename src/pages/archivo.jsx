import { Text, Box, Image, Flex, Button, useToast } from '@chakra-ui/react';
import EcoSign from "../assets/EcoSign.PNG";
import AdminSidebar from '../components/layout/AdminSidebar';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import SearchInput from '../components/forms/SearchInput';
import { DocumentTable } from '../components/documents/DocumentTable';

import { useFetchDocuments } from '../hooks/useFetchDocuments';
import { uploadDocument } from '../services/documentService';
import React, { useRef, useState } from 'react';

function Archivo() {

    const { documents, isLoading, error, refetch } = useFetchDocuments();
    const hiddenFileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleButtonClick = () => {
        hiddenFileInputRef.current.click();
    };

    // Al seleccionar archivo.
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validación PDF.
        if (file.type !== 'application/pdf') {
            toast({
                title: "Formato incorrecto.",
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

            // Llamamos al servicio (ya no pasamos userId aquí, el servicio lo busca solo).
            await uploadDocument(file);

            toast({
                title: "Documento subido",
                description: "El archivo se ha guardado exitosamente.",
                status: "success",
                duration: 4000,
                isClosable: true,
                position: 'top-right'
            });
            refetch();

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
            event.target.value = null; // Limpiar input.
        }
    };

    return (
        <Flex minH="100vh" bg="bg-default" w="full">
            <AdminSidebar />
            <Box
                w="full"
                p={10}
                maxW="full"
                pl={{ base: '90px', md: '290px' }}
            >
                <Box display="flex" justifyContent="flex-end" mb={4}>
                    <Header />
                </Box>
                <Image 
                    src={EcoSign} 
                    alt="EcoSign Logo" 
                    w="40%" 
                    mb={4} 
                />
                <Flex
                    gap={4}>
                    {/* Input Oculto */}
                    <input
                        type="file"
                        ref={hiddenFileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept="application/pdf"
                    />
                    <Button
                        as="b"
                        borderRadius="md"
                        bg="accent-default"
                        w={{ base: 'auto', md: '20%' }}
                        p={4}
                        color="bg-default"
                        _hover={{ bg: 'primary-default' }}
                        isLoading={isUploading}
                        loadingText="Cargando..."
                        onClick={handleButtonClick}
                    >
                        Subir
                        <Box as="span" display={{ base: 'none', md: 'inline' }} ml={1}>
                            documento
                        </Box>
                    </Button>
                    <SearchInput
                        placeholder="Buscar documento"
                        // value={searchTerm}
                        // onChange={(e) => setSearchTerm(e.target.value)}
                        mb={4}
                    />

                </Flex>

                <Text as="b" fontSize="30px" mt={8} mb={4} color="text-default" textAlign="left">
                    Todos los documentos
                </Text>
                <DocumentTable documents={documents} isLoading={isLoading} error={error} />
            </Box>
        </Flex>
    )
}

export default Archivo;