import { Box, Flex, Heading, Image, Table, Thead, Tr, Th, TableContainer, Td, Tbody, Text, Button, Icon, Menu, MenuButton, MenuList, MenuItem, navigate } from "@chakra-ui/react";
import EcoSign from "../../assets/EcoSign.PNG";

import { User, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import Header from "../../components/layout/Header";
import SearchInput from "../../components/forms/SearchInput";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { useFetchUsers } from "../../hooks/useFetchUsers";
import { useSearchFilterUsers } from "../../hooks/useSearchFilterUsers";
import { UserTable } from "../../components/users/UserTable";

function Usuario() {

    const { users, isLoading, error } = useFetchUsers();
    const { filteredUsers, searchTerm, setSearchTerm } = useSearchFilterUsers(users);

    const navigate = useNavigate();
    const location = useLocation();
    const handleNavigation = (path) => {
        navigate(path);
    }

    const logOut = (e) => {
        if (e & e.preventDefault) e.preventDefault();
        navigate('/login', { replace: true });
    }

    const onClick = () => {
        navigate('/register');
    }

    return (
        <Flex minH="100vh" bg="bg-default" w="full">
            <AdminSidebar />
            <Box flex="1" p={10} maxW="full" marginLeft="250px">
                <Box display="flex" justifyContent="flex-end" mb={4}>
                    <Header />
                </Box>
                <Image src={EcoSign} alt="EcoSign Logo" w="40%" mb={4} />
                <Flex
                    gap={4}>
                    <Button
                        isActive={location.pathname === '/register'}
                        onClick={() => handleNavigation('/register')}
                        as="b"
                        borderRadius="md"
                        bg="accent-default"
                        w="20%"
                        color="bg-default"
                        _hover={{ bg: 'primary-default' }}
                    >Registrar Usuario</Button>
                    <SearchInput 
                    placeholder="Buscar usuario" 
                    mb={4} 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Flex>
                <Text as="b" fontSize="30px" mt={8} mb={4} color="text-default" textAlign="left">
                    Usuarios
                </Text>
                <UserTable users={filteredUsers} isLoading={isLoading} error={error} />
            </Box>
        </Flex>
    )
}

export default Usuario;