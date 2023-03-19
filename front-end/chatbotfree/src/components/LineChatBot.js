import React, {useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function LineChatBot() {
    const [showQRCode, setShowQRCode] = useState(false);

    const handleMouseEnter = () => {
        setShowQRCode(true);
    };

    const handleMouseLeave = () => {
        setShowQRCode(false);
    };

    return (
        <Box
            component="a"
            href="https://line.me/R/ti/p/@554wsnwa"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                display: "flex", flexDirection: "column", alignItems: "center", mr: "20px", textDecoration: "none",
                color: "inherit",
            }}
        >
            <Typography
                variant="subtitle2"
                sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".2rem",
                    color: "inherit",
                    textDecoration: "none",
                }}
            >
                LINE
            </Typography>
            <Typography
                variant="subtitle2"
                sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".2rem",
                    color: "inherit",
                }}
            >
                ChatBot
            </Typography>
            {showQRCode && (
                <img
                    src="https://qr-official.line.me/sid/L/554wsnwa.png"
                    alt="QR Code"
                    style={{position: "absolute", bottom: "-100px", width: "100px"}}
                />
            )}
        </Box>
    );
}

export default LineChatBot;
