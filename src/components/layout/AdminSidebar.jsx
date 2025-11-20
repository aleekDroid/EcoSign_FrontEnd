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
            bg={isActive ? 'accent-default' : 'transparent'}
            color={isActive ? 'white' : 'whiteAlpha.900'}
            _hover={{ bg: 'accent-default' }}
            borderRadius="lg"
            py={6}
            px={{ base: 4, md: 4 }}
            justifyContent= {{ base: 'center', md: 'flex-start' }}
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

function AdminSidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <Box
            minH="100vh"
            bg="primary-default"
            p={2}
            w= {{ base: '60px', md: '250px' }}
            position="fixed"
            top="0"
            zIndex="banner"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            transition= "0.2s"
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