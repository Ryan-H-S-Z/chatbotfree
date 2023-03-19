import React, {useEffect} from "react";
import {Box, Button, Container, Input} from "@mui/material";
import Typography from "@mui/material/Typography";
import ReactMarkdown from 'react-markdown';

function DialogBox(props) {
    return (
        <Box
            sx={{
                width: "90vw",
                height: "72vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "4px",
                px: 2,
                boxSizing: "border-box",
                my: '10px',
                overflow: 'auto',
            }}
        >
                {props.messages.map((message, index) => {
                    const isSent = message.type === "sent";
                    const justifyContent = isSent ? "flex-end" : "flex-start";
                    const textAlign = isSent ? "right" : "left";

                    return (
                        <Box
                            key={index}
                            sx={{
                                position: "relative",
                                alignSelf: justifyContent,
                                mt: "10px",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                width: "80vw",
                                justifyContent: isSent ? "flex-end" : "flex-start",
                            }}>
                            <Box
                                sx={{
                                    textAlign: textAlign,
                                    mr: isSent ? 0 : 1,
                                    ml: isSent ? 1 : 0,
                                }}>
                                <Typography
                                    component={ReactMarkdown}
                                    sx={{
                                        backgroundColor: isSent ? "#C8E6C9" : "#BBDEFB",
                                        borderRadius: "4px",
                                        p: 2,
                                        wordBreak: "break-word",
                                        fontFamily: 'Roboto Mono, monospace',
                                        textAlign: textAlign,
                                        color: "inherit",
                                    }}
                                >
                                    {message.content}
                                </Typography>
                                <Typography
                                    component="div"
                                    sx={{
                                        fontSize: "0.8rem",
                                        color: "#808080",
                                        textAlign: textAlign,
                                    }}
                                >
                                    {new Date(message.timestamp).toLocaleTimeString()}
                                </Typography>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
    );
}

export default DialogBox;
