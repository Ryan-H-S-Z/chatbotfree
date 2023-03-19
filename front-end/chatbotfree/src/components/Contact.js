import React, {useRef, useState} from "react";
import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded';
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Link from "@mui/material/Link";
import {ContactMail} from "./index";
import {useSnackbar} from "notistack";
import { useIntl } from 'react-intl';



function Contact() {
    const [anchorEl, setAnchorEl] = useState(null);
    const contactMailRef = useRef(null);
    const {enqueueSnackbar} = useSnackbar();
    const intl = useIntl();

    const handleAlertMsg = (variant) => {
        let msg;

        if (variant === 'success') {
            msg = intl.formatMessage({id: "contact_email_success"});
        } else {
            msg = intl.formatMessage({id: "contact_email_failed"});
        }
        enqueueSnackbar(msg, {
            variant: variant,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
            autoHideDuration: 1000,
        });
    };

    const handleContactMailOpen = () => {
        contactMailRef.current.handleDialogOpen();
        setAnchorEl(null);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);

    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button variant="outlined"
                    startIcon={<InsertLinkRoundedIcon/>}
                    onClick={handleMenuClick}
                    sx={{
                        color: 'inherit', fontFamily: 'monospace', width: '5vw'
                    }}>
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} disableAutoFocusItem>
                <MenuItem sx={{color: 'black', fontFamily: 'monospace'}} onClick={handleContactMailOpen}>
                    Email
                </MenuItem>
                <MenuItem component={Link} href="https://t.me/RyanH9012" target="_blank"
                          sx={{color: 'black', fontFamily: 'monospace'}}>
                    Telegram
                </MenuItem>
                <MenuItem component={Link} href="https://instagram.com/ryanh.9012?igshid=YmMyMTA2M2Y=" target="_blank"
                          sx={{color: 'black', fontFamily: 'monospace'}}>
                    Instagram
                </MenuItem>
            </Menu>
            <ContactMail ref={contactMailRef} handleAlertMsg={handleAlertMsg}/>
        </>
    );
}

export default Contact;