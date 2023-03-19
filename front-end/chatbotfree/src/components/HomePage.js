import React, {useEffect, useState} from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import {Header, Footer, Content, InputBox} from "./index";
import theme from "../utils/theme";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {IntlProvider} from "react-intl";
import messages from "../locales/messages";
import {SnackbarProvider} from 'notistack';

function HomePage() {
    const storedLanguage = window.localStorage.getItem("selectedLanguage") ? window.localStorage.getItem("selectedLanguage") : "en";
    const [locale, setLocale] = useState(storedLanguage);

    const handleLanguageChange = (selectedLanguage) => {
        setLocale(selectedLanguage);
    };

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <SnackbarProvider maxSnack={1}>
                <ThemeProvider theme={theme}>
                    <Box sx={{width: '100vw', height: '100vh'}}>
                        <Stack
                            direction="column"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{height: "100vh"}}
                        >
                            <Header changeLocale={handleLanguageChange}/>
                            <Content/>
                            <Footer/>
                        </Stack>
                    </Box>

                </ThemeProvider>
            </SnackbarProvider>
        </IntlProvider>
    )
}

export default HomePage;