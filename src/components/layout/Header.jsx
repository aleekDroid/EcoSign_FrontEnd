import { Menu, MenuButton, MenuList, MenuItem, Button, Icon, Box, Flex, useColorMode, IconButton } from "@chakra-ui/react";
import { User, ChevronDown, ChevronUp, Sun, Moon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React from "react";

function Header() {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -90 },
    visible: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0.5, rotate: 90 }
  };

  const logOut = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    navigate('/login', { replace: true });
  };

  return (
    <Flex w="full" align="center" justify="flex-end">
      <IconButton
            aria-label="Cambiar tema de la interfaz."
            onClick={toggleColorMode}
            mr={4}
            bg="transparent"          >
            <AnimatePresence mode="wait">
              <motion.div
                key={colorMode === "light" ? 'moon' : 'sun'}
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2 }}>
                {colorMode === "light" ? <Moon/> : <Sun/>}
              </motion.div>
            </AnimatePresence>
          </IconButton>
      <Box>
        <Menu>
          {({ isOpen}) => (
            <>
          <MenuButton
            as={Button}
            leftIcon={<Icon as={User} boxSize={5} />}
            bg="background"
          >
            <Flex align="center">
            Nombre de usuario
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
            <MenuItem onClick={logOut} color="#BD0606">
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