import { Select } from "@chakra-ui/react";
import React from 'react';

const EcoSignSelect = React.forwardRef((props, ref) => {
    const defaultStyles = {
        size: "md",
        borderRadius: "lg",
        borderWidth: "2px",
        bg: "bg-default",
        color: "secondary-default",
        borderColor: "accent-default",
        mb: 4,
        _focus: {
            boxShadow: '0 0 0 1px primary-default',
        }
    };

    return (
        <Select
            {...defaultStyles}
            {...props}
            ref={ref}
        />
    );
});

EcoSignSelect.displayName = 'EcoSignSelect';
export default EcoSignSelect;