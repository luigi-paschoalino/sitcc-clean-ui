import * as React from "react"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

interface DateTimePickerComponentProps {
    selectedDate: Date
    handleDateChange: (date: Date | null) => void
}

const DateTimePickerComponent: React.FC<DateTimePickerComponentProps> = ({
    selectedDate,
    handleDateChange,
}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
                <DateTimePicker
                    label="Data da defesa"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </DemoContainer>
        </LocalizationProvider>
    )
}

export default DateTimePickerComponent
