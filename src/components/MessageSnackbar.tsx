import MuiAlert, { AlertProps } from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import React from "react"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

interface MessageSnackbarProps {
    severity: "success" | "error" | "info" | "warning"
    message: string
    open: boolean
    handleClose: () => void
}

export default function MessageSnackbar({
    severity,
    message,
    open,
    handleClose,
}: MessageSnackbarProps): JSX.Element {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={severity}
                sx={{ width: "100%" }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}
