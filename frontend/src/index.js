import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';

import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { store } from './app/store';
import { SnackbarProvider } from 'notistack';
import GlobalStyles from 'Components/GlobalStyles';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: '"Roboto", sans-serif',
            textTransform: 'none',
        },
    },
    palette: {
        primary: {
            main: '#db1d24',
        },
        secondary: {
            main: '#1A1A1A',
        },
    },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <GlobalStyles>
            <StyledEngineProvider injectFirst>
                <Provider store={store}>
                    <Router>
                        <SnackbarProvider
                            maxSnack={3}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <App />
                        </SnackbarProvider>
                    </Router>
                </Provider>
            </StyledEngineProvider>
        </GlobalStyles>
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
