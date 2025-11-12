import { Input } from "@chakra-ui/react";
import React from 'react';

// Se utiliza React.forwardRef para poder usar 'ref' si es necesario en el futuro.
const EcoSignInput = React.forwardRef((props, ref) => {
    const defaultStyles = {
        size: "md",

        borderRadius: "lg",
        borderWidth: "2px",
        bg: "bg-default",
        color: "secondary-default",
        borderColor: "accent-default",
        mb: 4,
        _focus: {
            borderColor: 'accent-default',
            boxShadow: '0 0 0 1px primary-default',
        }
    };

    return (
        <Input 
            {...defaultStyles}  // Se aplican los estilos comunes primero.
            {...props}          // Sobrescribe con cualquier prop pasado (placeholder, type, etc.).
            ref={ref}     
        />
    );
});

EcoSignInput.displayName = 'EcoSignInput';
export default EcoSignInput;