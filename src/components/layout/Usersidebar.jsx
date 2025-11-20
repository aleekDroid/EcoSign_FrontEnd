import { Box, VStack, Button, Icon, Text, Tooltip } from '@chakra-ui/react';
import { Home, Users, Folder, Edit } from 'lucide-react';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarLink = ({ icon, text, isActive, onClick }) => (
    <Tooltip
        label={text}
        placement="right"
        hasArrow
        openDelay={500}
    >
        <Button
            w="full"
            bg={isActive ? 'secondary-default' : 'transparent'}
            color={isActive ? 'white' : 'whiteAlpha.900'}
            _hover={{ bg: 'secondary-default' }}
            justifyContent="flex-start"
            borderRadius="lg"
            py={6}
            px={4}
            onClick={onClick}
        >
            <Icon 
                as={icon} 
                mr={{ base: 0, md: 3 }}
                boxSize={5} 
            />
            <Text
                display={{ base: 'none', md: 'block' }}
                fontSize="md"
                fontWeight="medium"
            >
                {text}
            </Text>        
            </Button>
    </Tooltip>
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
            p={2}
            w={{ base: '60px', md: '250px' }}
            position="fixed"
            top="0"
            zIndex="banner"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            transition="0.2s"
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