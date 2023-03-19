import React from "react";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import CropFreeIcon from '@mui/icons-material/CropFree';
import Box from "@mui/material/Box";
import {LineChatBot, LanguageSelector, Contact} from "./index";

function Header(props) {
    const changeLocale = props.changeLocale;
    return (
        <AppBar position="static" sx={{width:"100vw", height:"6vh", zIndex: 10}}>
                <Toolbar sx={{display: "flex", alignItems: "center"}}>
                    <CropFreeIcon sx={{mr: 5}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Chat Bot Free
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />

                    <LineChatBot />
                    <Contact/>
                    <LanguageSelector changeLocale={changeLocale}/>
                </Toolbar>
        </AppBar>
    );
}

export default Header;
