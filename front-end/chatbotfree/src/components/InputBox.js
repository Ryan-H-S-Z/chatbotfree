import React, {useState} from "react";
import {Box, Button, Input} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import IconButton from "@mui/material/IconButton";
import {MessageItem} from "../model";
import {useIntl} from 'react-intl';

function InputBox(props) {
    const [msg, setMsg] = useState("");
    const {formatMessage} = useIntl();
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const handleSendClick = () => {
        sendMessage();
    };

    const sendMessage = () => {
        const message = new MessageItem("sent", msg.trim());
        if (message.content) {
            props.onSend(message.toJSON());
            setMsg("");
        }
    };

    const handleInputChange = (event) => {
        setMsg(event.target.value);
    };


    return (
        <Box
            sx={{
                width: "90vw",
                height: "8vh",
                display: "flex",
                alignItems: "center",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "4px",
                px: 4,
                py: 1,
                boxSizing: "border-box",
                my: '10px'
            }}
        >
            <Input
                sx={{
                    width: "100%",
                    marginRight: "16px",
                    borderRadius: "4px",
                    padding: "8px",
                    color: "inherit",
                    fontFamily: 'Roboto Mono, monospace',
                }}
                placeholder={formatMessage({
                    id: 'inputBox_placeholder',
                })}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
                value={msg}
            />
            <IconButton
                sx={{
                    width: "5%",
                    '&:hover': {
                        borderRadius: "10%",
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                    },
                }}
                onClick={handleSendClick}
            >
                <SendIcon/>
            </IconButton>
        </Box>
    );
}

export default InputBox;
