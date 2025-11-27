import {
    Text, Box, Image, Flex, Button, useToast, Tooltip,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton,
    Select, useDisclosure
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import EcoSign from "../../assets/EcoSign.PNG";
import { useNavigate } from 'react-router-dom';

import UserSidebar from '../../components/layout/Usersidebar';
import Header from '../../components/layout/Header';
import { UserDocumentTable } from '../../components/documents/user/UserDocumentTable';
import UserSearchInput from '../../components/forms/user/UserSearchInput';

import { useSearchFilterDocuments } from '../../hooks/useSearchFilterDocuments';
import {useFetchDocumentsForUser} from '../../hooks/useFetchDocuments';
import { uploadDocument } from '../../services/documentService';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const WARNING_FILE_SIZE_BYTES = 7 * 1024 * 1024; // 7 MB

const FILE_CATEGORIES = [
    { value: "MACHOTE", label: "Machote / Plantilla" },
    { value: "AVISO", label: "Aviso General" },
    { value: "AVISO_URGENTE", label: "Aviso Urgente" },
    { value: "AUSENCIA_DOCENTE", label: "Ausencia Docente" }
];

function UserArchivo() {

    const { documents, isLoading, error, refetch } = useFetchDocumentsForUser();
    const { filteredDocuments, searchTerm, setSearchTerm } = useSearchFilterDocuments(documents);

    const hiddenFileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleStartUpload = () => {
        setSelectedCategory(""); // Resetear selección.
        onOpen();
    };

    const handleContinueToUpload = () => {
        if (!selectedCategory) {
            toast({
                title: "Categoría requerida",
                description: "Por favor selecciona el tipo de documento.",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
            return;
        }
        onClose();
        hiddenFileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validación PDF.
        if (file.type !== 'application/pdf') {
            toast({
                title: "Formato incorrecto.",
                description: "Solo se permiten archivos PDF.",
                status: "error",
                duration: 4000,
                isClosable: true,
                position: 'top-right'
            });
            event.target.value = null;
            return;
        }

        if (file.size > MAX_FILE_SIZE_BYTES) {
            toast({
                title: "Archivo demasiado pesado",
                description: `El archivo excede el límite de 10MB.`,
                status: "error",
                position: 'top-right',
                duration: 5000
            });
            event.target.value = null;
            return;
        }

        if (file.size > WARNING_FILE_SIZE_BYTES) {
            toast({
                title: "Archivo pesado detectado",
                description: "El archivo pesa más de 5MB. Podría tardar un poco en subir/visualizar.",
                status: "info",
                position: 'top-right',
                duration: 4000
            });
        }

        try {
            setIsUploading(true);

            await uploadDocument(file, selectedCategory);

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
            event.target.value = null;
        }
    };

    return (
        <Flex minH="100vh" bg="bg-default" w="full">
            <UserSidebar />
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
                    <input
                        type="file"
                        ref={hiddenFileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept="application/pdf"
                    />
                    <Tooltip label="Máximo 10MB por archivo (PDF)" placement="top" hasArrow>
                        <Button
                            as="b"
                            borderRadius="md"
                            bg="secondary-default"
                            w={{ base: 'auto', md: '20%' }}
                            p={4}
                            color="bg-default"
                            _hover={{ bg: 'text-default' }}
                            isLoading={isUploading}
                            loadingText="Subiendo..."
                            onClick={handleStartUpload} 
                        >
                            Subir
                            <Box as="span" display={{ base: 'none', md: 'inline' }} ml={1}>
                                documento
                            </Box>
                        </Button>
                    </Tooltip>
                    <Tooltip
                        label="Buscar documento por nombre, tipo o estado."
                        placement="top">
                        <UserSearchInput
                            placeholder="Buscar documento"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            mb={4}
                        />
                    </Tooltip>

                </Flex>

                <Text as="b" fontSize="30px" mt={8} mb={4} color="text-default" textAlign="left">
                    Todos los documentos
                </Text>
                <UserDocumentTable documents={filteredDocuments} isLoading={isLoading} error={error} />
            </Box>
            <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent bg="bg-default">
                    <ModalHeader color="text-default">Tipo de Documento</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text mb={2} color="secondary-default">Selecciona una categoría para el archivo:</Text>
                        <Select
                            placeholder="Seleccionar categoría..."
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            bg="white"
                            _dark={{ bg: "gray.700" }}
                        >
                            {FILE_CATEGORIES.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </Select>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>Cancelar</Button>
                        <Button
                            colorScheme="blue"
                            onClick={handleContinueToUpload}
                            isDisabled={!selectedCategory} // Deshabilitado si no elige nada
                        >
                            Continuar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}

export default UserArchivo;