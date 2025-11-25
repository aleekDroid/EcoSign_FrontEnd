import React, { useState, useEffect } from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button, Icon, Box, Flex, useColorMode, IconButton } from "@chakra-ui/react";
import { User, ChevronDown, ChevronUp, Sun, Moon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import localforage from "localforage";

// Importamos la función de logout del servicio para limpiar llaves y tokens
import { logoutUser } from "../../services/authService";

function Header() {

    const navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();

    const [userName, setUserName] = useState("Usuario");

    // 2. useEffect Asíncrono para leer de IndexedDB
    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const storedName = await localforage.getItem('user_name');
                if (storedName) {
                    setUserName(storedName);
                }
            } catch (err) {
                console.error("Error cargando nombre de usuario:", err);
            }
        };

        fetchUserName();
    }, []);

    const iconVariants = {
        hidden: { opacity: 0, scale: 0.5, rotate: -90 },
        visible: { opacity: 1, scale: 1, rotate: 0 },
        exit: { opacity: 0, scale: 0.5, rotate: 90 }
    };

    // 3. Logout usando el servicio centralizado
    const handleLogOut = async (e) => {
        if (e && e.preventDefault) e.preventDefault();

        try {
            await logoutUser(); // Limpia tokens, llaves privadas y datos de usuario
            navigate('/login', { replace: true });
        } catch (error) {
            console.error("Error al cerrar sesión", error);
            navigate('/login');
        }
    };

    return (
        <Flex w="full" align="center" justify="flex-end" h="full" bg="bg-default">
            <IconButton
                aria-label="Cambiar tema de la interfaz."
                onClick={toggleColorMode}
                mr={4}
                bg="transparent"
                _hover={{ bg: 'transparent', color: 'accent-default' }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={colorMode === "light" ? 'moon' : 'sun'}
                        variants={iconVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.2 }}>
                        {colorMode === "light" ? <Moon /> : <Sun />}
                    </motion.div>
                </AnimatePresence>
            </IconButton>
            <Box>
                <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton
                                as={Button}
                                leftIcon={<Icon as={User} boxSize={5} />}
                                bg="bg-default"
                                _hover={{ bg: 'transparent', color: 'accent-default' }}
                            >
                                <Flex align="center">
                                    {userName}
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={isOpen ? 'up' : 'down'}
                                            variants={iconVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ duration: 0.17 }}
                                            style={{ display: 'flex', marginLeft: '8px' }}>
                                            {isOpen ? <ChevronUp /> : <ChevronDown />}
                                        </motion.div>
                                    </AnimatePresence>
                                </Flex>
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={handleLogOut} color="red-default">
                                    Cerrar sesión
                                </MenuItem>
                            </MenuList>
                        </>
                    )}
                </Menu>
            </Box>
        </Flex>
    );
}

export default Header;