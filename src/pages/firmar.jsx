import { 
    Text, Box, Image, Flex, Button, VStack, Center, Icon,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, useToast
} from '@chakra-ui/react';
import { FileText, ExternalLink, PenTool } from 'lucide-react';
import EcoSignLogo from "../assets/EcoSign.PNG";
import AdminSidebar from '../components/layout/AdminSidebar';
import Header from '../components/layout/Header';
import { useColorMode } from "@chakra-ui/react";
import React from 'react';

function Firmar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const { colorMode } = useColorMode();

    const handleSignDocument = () => {
        onClose();
        toast({
            title: "Documento firmado",
            description: "El documento ha sido procesado correctamente.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: 'top-right'
        });
    };

    const openDocumentInNewTab = () => {
        window.open('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', '_blank');
    }

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
                    src={EcoSignLogo} 
                    alt="EcoSign Logo" 
                    w="180px" 
                    mb={8} 
                    filter={colorMode === 'dark' ? 'brightness(0) invert(1)' : 'none'}
                />

                <Text as="h2" fontSize="3xl" fontWeight="bold" mb={6} color="text-default">
                    Firma de Documento
                </Text>

                <Flex 
                    direction={{ base: 'column', lg: 'row' }} 
                    gap={8} 
                    align="start"
                    justify="center"
                >
                    
                    <Box 
                        flex="1" 
                        bg="gray.100" 
                        _dark={{ bg: "gray.700" }}
                        h="600px"
                        w="full"
                        maxW="800px"
                        borderRadius="md" 
                        boxShadow="lg"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        border="1px solid"
                        borderColor="gray.300"
                    >
                        <VStack spacing={4}>
                            <Icon as={FileText} w={20} h={20} color="gray.400" />
                            <Text color="gray.500">Vista previa del documento</Text>
                        </VStack>
                    </Box>

                    <VStack spacing={4} w={{ base: 'full', lg: '300px' }} align="stretch">
                        <Box p={1} bg="bg-default">
                            
                            <VStack spacing={3}>
                                <Button 
                                    variant="outline" 
                                    w="full"
                                    borderColor="secondary-default"
                                    color="secondary-default"
                                    _hover={{ bg: 'blackAlpha.50' }}
                                    onClick={openDocumentInNewTab}
                                >
                                    Abrir PDF
                                </Button>

                                <Button 
                                    bg="accent-default" 
                                    color="bg-default"
                                    w="full"
                                    _hover={{ bg: 'primary-default' }}
                                    onClick={onOpen}
                                >
                                    Firmar documento
                                </Button>
                            </VStack>
                        </Box>
                        
                        <Text fontSize="sm" color="gray.500" textAlign="center">
                            Asegúrese de revisar el contenido antes de firmar.
                        </Text>
                    </VStack>

                </Flex>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent bg="bg-default">
                    <ModalHeader color="text-default">Confirmar Firma</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text color="text-default">
                            ¿Estás seguro de que deseas firmar este documento? Esta acción no se puede deshacer.
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose} color="text-default">
                            Cancelar
                        </Button>
                        <Button 
                            bg="primary-default" 
                            color="white" 
                            _hover={{ bg: "accent-default" }}
                            onClick={handleSignDocument}
                        >
                            Confirmar y Firmar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Flex>
    );
}

export default Firmar;