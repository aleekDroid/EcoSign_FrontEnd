import { Input } from "@chakra-ui/react";
import React from 'react';

// Se utiliza React.forwardRef para poder usar 'ref' si es necesario en el futuro.
const EcoSignInput = React.forwardRef((props, ref) => {
    const defaultStyles = {
        size: "md",
<<<<<<< Updated upstream
        borderRadius: "full",
        borderColor: "primary",
=======
        borderRadius: "lg",
        borderWidth: "2px",
        bg: "background",
        color: "secondary",
        borderColor: "accent",
        mb: 4,
>>>>>>> Stashed changes
        _focus: {
            borderColor: 'accent',
            boxShadow: '0 0 0 1px #34553F'
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