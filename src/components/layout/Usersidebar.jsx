import { Box, VStack, Button, Icon, Text } from '@chakra-ui/react';
import { Home, Users, Folder, Edit } from 'lucide-react';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarLink = ({ icon, text, isActive, onClick }) => (
    <Button
        w="full"
        bg={isActive ? 'secondary' : 'transparent'}
        color={isActive ? 'white' : 'whiteAlpha.900'}
        _hover={{ bg: 'secondary' }}
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

function UserSidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <Box
            minH="100vh"
            bg="user-default"
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
                <SidebarLink icon={Home} isActive={location.pathname === '/userHome'} onClick={() => handleNavigation('/userHome')} text="Inicio" />
                <SidebarLink icon={Folder} isActive={location.pathname === '/archivoUser'} onClick={() => handleNavigation('/archivoUser')} text="Archivos" />
                <SidebarLink icon={Edit} text="Firmar" />
            </VStack>
        </Box>
    );
}

export default UserSidebar;