import React from "react";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import {FormattedMessage} from 'react-intl';

function Footer() {
    return (
        <AppBar position="static" color="primary" sx={{width: "100vw", height: "6vh"}}>
            <Container maxWidth="xl">
                <Toolbar sx={{justifyContent: "center"}}>
                    <Stack>
                        <Typography variant="subtitle2"
                                    noWrap
                                    component="a"
                                    // href="/"
                                    sx={{
                                        mr: 2,
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}>
                            <FormattedMessage id="footer_writer"/>
                        </Typography>
                        <Typography variant="subtitle2"
                                    noWrap
                                    component="a"
                                    href="https://platform.openai.com/overview"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        mr: 2,
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}>
                            <FormattedMessage id="footer_acknowledgment"/>
                        </Typography>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Footer;
