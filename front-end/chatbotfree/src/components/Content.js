import React, {useEffect, useRef, useState} from "react";
import {InputBox, DialogBox} from "./index";
import Stack from "@mui/material/Stack";
import {MessageItem} from "../model";
import { useIntl } from 'react-intl';
import {useSnackbar} from "notistack";

function Content() {
    const intl = useIntl();
    const { enqueueSnackbar } = useSnackbar();
    const wsRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const officalUrl = "wss://chatbotfree.xyz/ws";
        const url = "ws://localhost:8080/ws";
        // wsRef.current =  new WebSocket("ws://localhost:8080/ws");
        wsRef.current =  new WebSocket(url);
        wsRef.current.onopen = () => {
            console.log("WebSocket connection established");
            setErrorMessage(null);
        };
        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            let msg = new MessageItem(data.type, data.content, data.targetUser,data.timestamp);
            handleMessage(msg.toJSON());
        };
        wsRef.current.onclose = () => {
            console.log("WebSocket connection closed");
        };
        wsRef.current.onerror = (error) => {
            console.error(error);
            const errorMessage = intl.formatMessage({ id: 'websocket_failed' });
            setErrorMessage(errorMessage);
            errorSnackBar(errorMessage);
        };

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        }
    }, []);

    const errorSnackBar = (msg) => {
        enqueueSnackbar(msg, {
            variant: 'error',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
            autoHideDuration: 2000,
        });
    };

    const handleSend = (message) => {
        if (errorMessage) {
            errorSnackBar(errorMessage);
            return ;
        }
        wsRef.current.send(message);
        handleMessage(message);
    };

    const handleMessage = (message) => {
        const msg = JSON.parse(message);
        setMessages((preMessages) => [...preMessages, msg])
    };

    return (
        <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            sx={{width:"100vw", height:"86vh", p: 1}}
        >
            <DialogBox messages={messages}/>
            <InputBox onSend={handleSend}/>
        </Stack>
    )
}

export default Content;