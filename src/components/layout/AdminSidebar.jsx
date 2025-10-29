import { Box, VStack, Button, Icon, Text } from '@chakra-ui/react';
import { Home, Users, Folder, Edit } from 'lucide-react';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarLink = ({ icon, text, isActive, onClick }) => (
    <Button
        w="full"
        bg={isActive ? 'accent' : 'transparent'}
        color={isActive ? 'white' : 'whiteAlpha.900'}
        _hover={{ bg: 'accent' }}
        justifyContent="flex-start"
        borderRadius="lg"
        py={6}
        px={4}
        onClick={onClick}
    >
        <Icon as={icon} mr={3} boxSize={5} />
        <Text fontSize="md" fontWeight="medium">{text}</Text>
    </Button>
);

function AdminSidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <Box
            minH="100vh"
            bg="primary"
            p={4}
            w="250px"
            position="fixed"
            top="0"
            zIndex="banner"
            display="flex"
            flexDirection="column"
            justifyContent="center"
        >

            <VStack spacing={4} justifyItems="center">
                <SidebarLink icon={Home} isActive={location.pathname === '/adminHome'} onClick={() => handleNavigation('/adminHome')} text="Inicio" />
                <SidebarLink icon={Users} isActive={location.pathname === '/usuario'} onClick={() => handleNavigation('/usuario')} text="Usuarios" />
                <SidebarLink icon={Folder} isActive={location.pathname === '/archivo'} onClick={() => handleNavigation('/archivo')} text="Archivos" />
                <SidebarLink icon={Edit} text="Firmar" />
            </VStack>
        </Box>
    );
}

export default AdminSidebar;