import React from 'react'
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

export default function Date(props) {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoItem label={props.label} >
                    <DatePicker className="asset-date" value={props.value ? dayjs(props.value) : null} onChange={(newVal) => {
                        const formatted = newVal ? newVal.format("YYYY-MM-DD") : null;
                        props.handleChange(props.source, formatted);
                    }} />
                </DemoItem>
            </LocalizationProvider>
        </>
    )
}
