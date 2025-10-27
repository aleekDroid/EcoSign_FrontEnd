import { border, Input, Icon, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from 'react';
import { Search } from 'lucide-react';

// Se utiliza React.forwardRef para poder usar 'ref' si es necesario en el futuro.
const SearchInput = React.forwardRef((props, ref) => {
    const defaultStyles = {
        size: "md",
        borderRadius: "lg",
        borderWidth: "2px",
        bg: "background",
        color: "secondary",
        borderColor: "accent",
        _focus: {
            boxShadow: '0 0 0 1px #34553F'
        }
    };

    return (
        <InputGroup>
            <InputRightElement marginEnd={1}>
            <Icon as={Search} boxSize={5} color="secondary" />
            </InputRightElement>
            <Input
                {...defaultStyles}
                {...props}
                ref={ref}
            />
        </InputGroup>
    );
});

SearchInput.displayName = 'SearchInput';
export default SearchInput;