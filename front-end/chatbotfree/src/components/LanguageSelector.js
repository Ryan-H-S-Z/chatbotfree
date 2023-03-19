import React, {useContext, useEffect, useState} from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import GTranslateRoundedIcon from '@mui/icons-material/GTranslateRounded';


function LanguageSelector(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState("en");

    useEffect(() => {
        const storedLanguage = window.localStorage.getItem("selectedLanguage");
        if (storedLanguage) {
            setSelectedLanguage(storedLanguage);
        }
    },[]);

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.getAttribute("data-language");
        setSelectedLanguage(selectedLanguage);
        setAnchorEl(null);
        props.changeLocale(selectedLanguage);
        window.localStorage.setItem("selectedLanguage", selectedLanguage);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                variant="outlined"
                startIcon={<GTranslateRoundedIcon/>}
                onClick={handleMenuClick}
                sx={{
                    color: 'inherit', fontFamily: 'monospace', width: '5vw'
                }}

            >
                {selectedLanguage === "en"
                    ? "English"
                    : selectedLanguage === "zh"
                        ? "中文"
                        : "ไทย"}
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}
            >
                <MenuItem onClick={handleLanguageChange} data-language="en"
                          sx={{color: selectedLanguage === 'en' ? 'black' : 'inherit', fontFamily: 'monospace'}}>
                    English
                </MenuItem>
                <MenuItem onClick={handleLanguageChange} data-language="zh"
                          sx={{color: selectedLanguage === 'zh' ? 'black' : 'inherit', fontFamily: 'monospace'}}>
                    中文
                </MenuItem>
                <MenuItem onClick={handleLanguageChange} data-language="th"
                          sx={{color: selectedLanguage === 'th' ? 'black' : 'inherit', fontFamily: 'monospace'}}>
                    ไทย
                </MenuItem>
            </Menu>
        </>
    );
}

export default LanguageSelector;
