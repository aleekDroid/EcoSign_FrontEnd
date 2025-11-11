import { Input } from "@chakra-ui/react";
import React from 'react';

// Se utiliza React.forwardRef para poder usar 'ref' si es necesario en el futuro.
const UserEcoSignInput = React.forwardRef((props, ref) => {
    const defaultStyles = {
        size: "md",

        borderRadius: "lg",
        borderWidth: "2px",
        bg: "background",
        color: "accent-default",
        borderColor: "secondary-default",
        mb: 4,
        _focus: {
            borderColor: 'secondary-default',
            boxShadow: '0 0 0 1px secondary-default',
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

UserEcoSignInput.displayName = 'UserEcoSignInput';
export default UserEcoSignInput;