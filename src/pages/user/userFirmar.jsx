import React, { useState, useEffect } from 'react';
import {
    Text, Box, Image, Flex, Button, VStack, Icon,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    useDisclosure, useToast, Spinner, Alert, AlertIcon
} from '@chakra-ui/react';
import { AlertCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';

import EcoSignLogo from '../../assets/EcoSign.PNG';
import UserSidebar from '../../components/layout/Usersidebar';
import Header from '../../components/layout/Header';
import api from '../../services/api';
import { signDocument } from "../../services/signService";

function UserFirmar() {
    const { userFileId, status } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    
    const [isSigning, setIsSigning] = useState(false);

    const [pdfUrl, setPdfUrl] = useState(null);
    const [isLoadingPreview, setIsLoadingPreview] = useState(true);
    const [previewError, setPreviewError] = useState(null);
    const [fileName, setFileName] = useState("Documento");

    const isReadOnly = status === 'FIRMADO' || status === 'ACTIVO';

    useEffect(() => {
        let objectUrl = null;

        const loadFilePreview = async () => {
            if (!userFileId || !status) {
                setPreviewError("ID o Estatus del documento no encontrado en la URL.");
                setIsLoadingPreview(false);
                return;
            }

            setIsLoadingPreview(true);
            setPreviewError(null);

            try {
                const response = await api.get(`/api/file/preview/${userFileId}/${status}`, {
                    responseType: 'blob'
                });

                const disposition = response.headers['content-disposition'];
                if (disposition && disposition.includes('filename=')) {
                    const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(disposition);
                    if (matches != null && matches[1]) {
                        setFileName(matches[1].replace(/['"]/g, ''));
                    }
                }

                const fileType = response.headers['content-type'];
                const blob = new Blob([response.data], { type: fileType });
                objectUrl = URL.createObjectURL(blob);
                setPdfUrl(objectUrl);

            } catch (err) {
                console.error("Error cargando preview:", err);
                setPreviewError("No se pudo visualizar el documento.");
            } finally {
                setIsLoadingPreview(false);
            }
        };

        loadFilePreview();

        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [userFileId, status]);

    const handleSignDocument = async () => {
        // ✅ PROTECCIÓN: Evita doble clic
        if (isSigning) return;

        setIsSigning(true);
        try {
            await signDocument(userFileId);

            toast({
                title: "Documento firmado",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            onClose();
            
            window.location.reload(); 

        } catch (error) {
            console.error(error);
            toast({
                title: "Error al firmar",
                description: error.message || "Ocurrió un error inesperado.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSigning(false);
        }
    };

    const openDocumentInNewTab = () => {
        if (pdfUrl) window.open(pdfUrl, '_blank');
    };

    return (
        <Flex minH="100vh" bg="bg-default" w="full">
            <UserSidebar />

            <Box w="full" p={10} maxW="full" pl={{ base: '90px', md: '290px' }}>
                <Box display="flex" justifyContent="flex-end" mb={4}>
                    <Header />
                </Box>

                <Image src={EcoSignLogo} alt="EcoSign Logo" w="40%" mb={4} />

                <Text as="h2" fontSize="3xl" fontWeight="bold" mb={6} color="text-default">
                    {isReadOnly ? `Visualizando: ${fileName}` : `Firma de Documento: ${fileName}`}
                </Text>

                <Flex direction={{ base: 'column', lg: 'row' }} gap={8} align="start" justify="center">

                    <Box
                        flex="1" bg="gray.100" h="75vh" w="full" maxW="900px"
                        borderRadius="md" boxShadow="lg" border="1px solid" borderColor="gray.300"
                        display="flex" alignItems="center" justifyContent="center" overflow="hidden"
                        _dark={{ bg: "gray.700" }}
                    >
                        {isLoadingPreview && (
                            <VStack>
                                <Spinner size="xl" color="accent-default" thickness="4px"/>
                                <Text color="gray.500" mt={4}>Cargando vista previa segura...</Text>
                            </VStack>
                        )}

                        {previewError && (
                            <VStack color="red.500" p={8} textAlign="center">
                                <Icon as={AlertCircle} w={12} h={12} mb={2} />
                                <Text fontWeight="bold">Error</Text>
                                <Text>{previewError}</Text>
                            </VStack>
                        )}

                        {!isLoadingPreview && !previewError && pdfUrl && (
                            <iframe
                                src={pdfUrl}
                                width="100%" height="100%"
                                style={{ border: 'none' }}
                                title="Vista Previa"
                            />
                        )}
                    </Box>

                    <VStack spacing={4} w={{ base: 'full', lg: '300px' }} align="stretch">
                        <Box p={4} bg="bg-default" borderRadius="md" borderWidth="1px">
                            <VStack spacing={4}>
                                <Button variant="outline" w="full" borderColor="secondary-default" color="secondary-default"
                                        onClick={openDocumentInNewTab} isDisabled={!pdfUrl}>
                                    Abrir en Pestaña Nueva
                                </Button>

                                <Button 
                                    bg={isReadOnly ? "gray.400" : "accent-default"} 
                                    color="bg-default" 
                                    w="full" 
                                    _hover={isReadOnly ? { bg: "gray.400" } : { bg: 'primary-default' }}
                                    onClick={onOpen} 
                                    isDisabled={!pdfUrl || !!previewError || isReadOnly}
                                >
                                    {isReadOnly ? "Firmado - Solo Lectura" : "Firmar documento"}
                                </Button>
                            </VStack>
                        </Box>
                        <Alert status="info" borderRadius="md" fontSize="sm">
                            <AlertIcon />
                            El documento se visualiza de forma segura en memoria.
                        </Alert>
                    </VStack>

                </Flex>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={!isSigning}>
                <ModalOverlay />
                <ModalContent bg="bg-default">
                    <ModalHeader color="text-default">Confirmar Firma</ModalHeader>
                    {!isSigning && <ModalCloseButton />} 
                    
                    <ModalBody>
                        <Text color="text-default">
                            ¿Estás seguro de firmar <b>{fileName}</b>? <br/>
                            Se aplicará tu firma digital criptográfica.
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose} color="text-default" isDisabled={isSigning}>
                            Cancelar
                        </Button>
                        
                        <Button 
                            bg="primary-default" 
                            color="white" 
                            _hover={{ bg: "accent-default" }} 
                            onClick={handleSignDocument}
                            isLoading={isSigning}
                            loadingText="Firmando..."
                        >
                            Firmar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}

export default UserFirmar;