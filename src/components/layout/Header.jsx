import { Menu, MenuButton, MenuList, MenuItem, Button, Icon, Box, Flex } from "@chakra-ui/react";
import { User, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";

function Header() {
  const navigate = useNavigate();

  const logOut = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    navigate('/login', { replace: true });
  };

  return (
    <Flex w="full" align="center" justify="flex-end">
      <Box>
        <Menu>
          <MenuButton
            as={Button}
            leftIcon={<Icon as={User} boxSize={5} />}
            rightIcon={<Icon as={ChevronDown} boxSize={5} />}
            bg="background"
          >
            Nombre de usuario
          </MenuButton>
          <MenuList>
            <MenuItem onClick={logOut} color="#BD0606">
              Cerrar sesión
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}

export default Header;