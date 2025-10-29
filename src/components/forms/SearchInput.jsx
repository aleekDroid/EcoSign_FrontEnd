import { Input, InputGroup, InputRightElement, Icon } from "@chakra-ui/react";
import { Search } from "lucide-react";
import React from 'react';

// Se utiliza React.forwardRef para poder usar 'ref' si es necesario en el futuro.
const EcoSignInput = React.forwardRef((props, ref) => {
    const defaultStyles = {
        size: "md",

        borderRadius: "lg",
        borderWidth: "2px",
        bg: "background",
        color: "secondary",
        borderColor: "accent",
        mb: 4,
        _focus: {
            borderColor: 'accent',
            boxShadow: '0 0 0 1px #34553F'
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

EcoSignInput.displayName = 'EcoSignInput';
export default EcoSignInput;