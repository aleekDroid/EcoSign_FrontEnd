import { Box, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  semanticTokens: {
    colors: {
      // Verde oscuro.
      // primary: '#34553F',
      // Azul grisáceo.
      secondary: '#648096',
      // Verde grisáceo-sade.
      // accent: '#909C86',
      // Neutro claro.
      // background: '#ECEFF1',
      // Texto oscuro.
      // text: '#1C3E5A',
      'primary-default' : {
        default: '#34553F',
        _dark: '#0a2511ff',
      },
      'accent-default' : {
        default: '#909C86',
        _dark: '#34553F',
      },
      'bg-default' : {
        default: '#ECEFF1',
        _dark: '#10202eff',
      },
      'text-default' : {
        default: '#001221',
        _dark: '#ECEFF1',
      },
      'user-default' : {
        default: '#1C3E5A',
        _dark: '#1c2a36ff',
      },

      // Extra.
      'red-default' : {
        default: '#E53E3E',
        _dark: '#FF6F6F',
      }

    },
    fonts: {
      heading: 'Cormorant Garamond, serif',
      body: 'Source Sans 3, sans-serif',
    },
    config : {
      initialColorMode: 'system',
      useSystemColorMode: true, 
    }
  },

  components: {
    Table: {
      baseStyle: {
        table: {
          borderCollapse: 'separate',
          borderSpacing: '0 8px',
        }
      },

      // Prueba para crear una variante con el estilo de EcoSign.
      variants: {
        ecosign: {
          thead: {
            th: {
              border: 'none',
              color: 'text',
              fontWeight: 'bold',
              fontFamily: 'body',
              fontSize: 'sm',
            },
          },
          tbody: {
            tr: {
              bg: 'bg-default',
              _hover: {
                bg: "gris.100",
                boxShadow: 'lg',
                transition: 'all 0.2s ease-in-out',
              },
              td: {

                borderColor: 'accent-default',
                py: 3,
                '&:first-of-type': {
                  borderTopLeftRadius: 'lg',
                  borderBottomLeftRadius: 'lg',
                },
                '&:last-of-type': {
                  borderTopRightRadius: 'lg',
                  borderBottomRightRadius: 'lg',
                },
              }
            }
          }
        }
      },
      defaultProps: {
        variant: 'ecosign',
      }
    }
  }
});

export default theme;
