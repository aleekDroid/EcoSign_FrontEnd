import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    // Verde oscuro.
    primary: '#34553F',
    // Azul grisáceo.
    secondary: '#648096',
    // Verde grisáceo-sade.
    accent: '#909C86',
    // Neutro claro.
    background: '#ECEFF1',
    // Texto oscuro.
    text: '#1C3E5A',
  },
  fonts: {
    heading: 'Cormorant Garamond, serif',
    body: 'Source Sans 3, sans-serif',
  },
});

export default theme;
