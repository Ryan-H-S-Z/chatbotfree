import DialogTitle from "@mui/material/DialogTitle";
import {FormattedMessage, useIntl} from "react-intl";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import React, {useImperativeHandle, useState} from "react";
import validator from "../utils/validator";
import {ContactMailItem} from "../model";
import {useSnackbar} from "notistack";

const ContactMail = React.forwardRef((props, ref) => {
        const [open, setOpen] = useState(false);
        const [email, setEmail] = useState("");
        const [emailError, setEmailError] = useState(null);
        const [suggestion, setSuggestion] = useState("");
        const [suggestionError, setSuggestionError] = useState(null);
        const [canSubmit, setCanSubmit] = useState(true);
        const {enqueueSnackbar} = useSnackbar();
        const intl = useIntl();

        useImperativeHandle(ref, () => ({
            handleDialogOpen,
        }));

        const handleDialogOpen = () => {
            setOpen(true);
        };

        const handleDialogClose = () => {
            setSuggestion("");
            setEmail("");
            setEmailError(null);
            setOpen(false);
        };

        const checkSubmit = () => {
            const suggestionValidatorR = validator.required(suggestion, (error) => {
                setSuggestionError(error);
            });
            const emailValidatorR = validator.required(email, (error) => {
                setEmailError(error);
            });
            const emailValidatorF = validator.validateEmail(email, (error) => {
                setEmailError(error);
            });
            return emailValidatorF && emailValidatorR && suggestionValidatorR;
        };

        const handleDialogSubmit = () => {
            if (!canSubmit) {
                const msg = intl.formatMessage({id: "contact_interval_error"});
                enqueueSnackbar(msg, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                    autoHideDuration: 1000,
                });
                return ;
            }
            if (!checkSubmit()) {
                return;
            }
            setCanSubmit(false);
            setTimeout(() => {
                setCanSubmit(true);
            }, 10 * 60 * 1000);

            const data = new ContactMailItem(email, suggestion);
            const requestOptions = {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: data.toJSON(),
            };
            const officalUrl = "/contact/mail";
            const url = "http://localhost:8080/contact/mail";
            fetch(url, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        props.handleAlertMsg('warning');
                    } else {
                        props.handleAlertMsg('success');
                    }
                })
                .catch(error => {
                    console.error(error);
                    props.handleAlertMsg('error');

                });
            handleDialogClose();
        };

        const handleClose = () => {
            setSuggestion("");
            setEmail("");
            setEmailError(null);
        };

        const handleEmailChange = (event) => {
            const email = event.target.value;
            setEmail(email);
            validator.email(email, (emailError) => {
                setEmailError(emailError);
            });
        };

        const handleSuggestionChange = (event) => {
            const suggestion = event.target.value;
            setSuggestion(suggestion);
            validator.required(suggestion, (error) => {
                setSuggestionError(error);
            });
        };

        return (
            <>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle sx={{color: 'grey', fontFamily: 'monospace'}}><FormattedMessage
                        id="contact_email_contact"/></DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{color: 'black', fontFamily: 'monospace', mb: 2}}>
                            <FormattedMessage id="contact_email_text"/>
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label={<FormattedMessage id="contact_email_label"/>}
                            type="email"
                            value={email}
                            error={emailError !== null}
                            helperText={emailError}
                            fullWidth
                            variant="standard"
                            InputProps={{
                                style: {
                                    color: "#000000",
                                    fontFamily: 'monospace'
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "grey",
                                    fontFamily: 'monospace'
                                },
                            }}
                            onChange={handleEmailChange}
                        />
                        <TextField
                            margin="dense"
                            id="suggestion"
                            label={<FormattedMessage id="contact_email_suggestion"/>}
                            multiline
                            maxRows={4}
                            fullWidth
                            variant="standard"
                            value={suggestion}
                            error={suggestionError !== null}
                            helperText={suggestionError}
                            InputProps={{
                                style: {
                                    color: "#000000",
                                    fontFamily: 'monospace'
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "grey",
                                    fontFamily: 'monospace'
                                },
                            }}
                            onChange={handleSuggestionChange}
                        />
                    </DialogContent>
                    <DialogActions sx={{mr: 2, mb: 2}}>
                        <Button onClick={handleDialogSubmit} sx={{
                            color: 'black', fontFamily: 'monospace',
                            '&:hover': {
                                borderRadius: "10%",
                                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                            },
                        }}><FormattedMessage id="common_submit"/></Button>
                        <Button onClick={handleDialogClose} sx={{
                            color: 'black', fontFamily: 'monospace',
                            '&:hover': {
                                borderRadius: "10%",
                                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                            },
                        }}><FormattedMessage id="common_cancel"/></Button>
                    </DialogActions>
                </Dialog>
            </>

        );
    }
);

export default ContactMail;