import { Box, Flex, Heading, Image, Table, Thead, Center, VStack, Tr, Th, TableContainer, Td, Tbody, Text, Button, InputGroup, Input, InputRightElement, Icon, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import EcoSign from "../../assets/EcoSign.PNG";

import UserSignBox from "../../components/forms/user/UserSignBox";
import Header from "../../components/layout/Header";
import UserSidebar from "../../components/layout/Usersidebar";

import { useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { UserDocumentTable } from "../../components/documents/user/UserDocumentTable";
import { getRecentDocuments } from "../../utils/recentDocuments";

function UserHome() {

    const navigate = useNavigate();
    const { documents, isLoading, error } = useFetchDocuments();
    const recentDocuments = getRecentDocuments(documents);

    const { colorMode } = useColorMode();

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
                    filter={colorMode === 'dark' ? 'brightness(0) invert(1)' : 'none'}
                />
                <UserSignBox />
                <Text as="b" fontSize="30px" mt={8} mb={4} color="text-default" textAlign="left">
                    Documentos recientes
                </Text>
                <UserDocumentTable documents={recentDocuments} isLoading={isLoading} error={error} />
            </Box>
        </Flex>
    )
}

export default UserHome;