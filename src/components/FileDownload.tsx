import React from "react"
import Button from "@mui/material/Button"
import GetAppIcon from "@mui/icons-material/GetApp"

interface FileDownloadProps {
    texto: string
    enabled: boolean
    download: () => void
}

export default function FileDownload({
    download,
    texto,
    enabled,
}: FileDownloadProps) {
    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<GetAppIcon />}
            onClick={download}
            disabled={!enabled}
        >
            {texto}
        </Button>
    )
}
