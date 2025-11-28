import React, { useRef, useState } from 'react';
import { 
    Box, Button, Text, useToast, Tooltip,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton,
    Select, useDisclosure 
} from '@chakra-ui/react';
import { uploadDocument } from '../../../services/documentService';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const WARNING_FILE_SIZE_BYTES = 7 * 1024 * 1024; // 7 MB

const FILE_CATEGORIES = [
    { value: "MACHOTE", label: "Machote / Plantilla" },
    { value: "AVISO", label: "Aviso General" },
    { value: "AVISO_URGENTE", label: "Aviso Urgente" },
    { value: "AUSENCIA_DOCENTE", label: "Ausencia Docente" }
];

const UserSignBox = React.forwardRef(({ onUploadSuccess }, ref) => {
    
    const hiddenFileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleStartUpload = () => {
        setSelectedCategory(""); 
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
        if (hiddenFileInputRef.current) {
            hiddenFileInputRef.current.click();
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            toast({
                title: "Formato incorrecto",
                description: "Solo se permiten archivos PDF.",
                status: "error",
                duration: 4000,
                isClosable: true,
                position: 'top-right'
            });
            event.target.value = null;
            return;
        }

        // Validación Tamaño Máximo (10MB)
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

        // Validación Tamaño Advertencia (>7MB)
        if (file.size > WARNING_FILE_SIZE_BYTES) {
            toast({
                title: "Archivo pesado detectado",
                description: "El archivo pesa más de 7MB. Podría tardar un poco en subir.",
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

            window.location.reload();

            if (onUploadSuccess) {
                onUploadSuccess();
            }

        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || err.message || "No se pudo cargar el archivo.";
            toast({
                title: "Error al subir",
                description: msg,
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
        <>
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

                <Tooltip label="Máximo 10MB por archivo (PDF)" placement="top" hasArrow>
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
                        onClick={handleStartUpload}
                    >
                        Subir
                        <Box 
                            as="span" 
                            display={{ base: 'none', md: 'inline' }} 
                            ml={1}>
                            documento
                        </Box>
                    </Button>
                </Tooltip>
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
                            isDisabled={!selectedCategory} 
                        >
                            Continuar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
});

UserSignBox.displayName = 'UserSignBox';
export default UserSignBox;