import { Box, VStack, Button, Icon, Text } from '@chakra-ui/react';
import { Home, Users, Folder, Edit } from 'lucide-react'; 
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SidebarLink = ({ icon, text, isActive }) => (
    <Button
        w="full"
        bg={isActive ? 'accent' : 'transparent'} 
        color={isActive ? 'white' : 'whiteAlpha.900'} 
        _hover={{ bg: 'accent' }} 
        justifyContent="flex-start" 
        borderRadius="lg"
        py={6}
        px={4}
    >
        <Icon as={icon} mr={3} boxSize={5} />
        <Text fontSize="md" fontWeight="medium">{text}</Text>
    </Button>
);

function AdminSidebar() {
    return (
        <Box
            minH="100vh"
            bg= "primary"
            p={4}
            w="250px"
            position="sticky"
            top="0"
            zIndex="banner"
            display="flex"
            flexDirection="column"
            justifyContent="center"
        >
            
            <VStack spacing={4} justifyItems="center">
                <SidebarLink icon={Home} text="Inicio"/>
                <SidebarLink icon={Users} text="Usuarios" />
                <SidebarLink icon={Folder} text= "Archivos" />
                <SidebarLink icon={Edit} text="Firmar" />
            </VStack>
        </Box>
    );
}

export default AdminSidebar;