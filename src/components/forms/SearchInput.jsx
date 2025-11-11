import { Input, InputGroup, InputRightElement, Icon } from "@chakra-ui/react";
import { Search } from "lucide-react";
import React from 'react';

// Se utiliza React.forwardRef para poder usar 'ref' si es necesario en el futuro.
const SearchInput = React.forwardRef((props, ref) => {
    const defaultStyles = {
        size: "md",

        borderRadius: "lg",
        borderWidth: "2px",
        bg: "bg-default",
        color: "secondary",
        borderColor: "accent-default",
        mb: 4,
        _focus: {
            borderColor: 'accent-default',
            boxShadow: '0 0 0 1px primary-default',
        }
    };

    return (
        <InputGroup>
        <Input 
            {...defaultStyles}  
            {...props}       
            ref={ref}     
        />
        <InputRightElement pointerEvents="none">
            <Icon as={Search} color="secondary" boxSize={5} /> 
        </InputRightElement>
    </InputGroup>
    );
});

SearchInput.displayName = 'SearchInput';
export default SearchInput;