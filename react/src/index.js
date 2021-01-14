import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ChakraProvider, extendTheme} from '@chakra-ui/react'

const theme= extendTheme({
  components: {
    Button: {
      baseStyle: () => ({
        bg: "#ECC94B",
        color: "#472820",
        fontWeight: "900",
        letterSpacing: "0.02em",
        padding: "4px",
        borderRadius: "2px",
        fontSize: "12px",
        fontFamily: "Fraunces",
        borderColor: "none"
      }),
    },
    Input: {
      baseStyle: () => ({
        bg: "#f3f0e3",
        color: ""
      })
    }
  }
})

  ReactDOM.render(
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );



