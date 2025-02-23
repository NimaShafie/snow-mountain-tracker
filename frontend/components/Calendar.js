import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
                label="Pick a date"
                value={selectedDate} 
                onChange={(newValue) => setSelectedDate(newValue)} 
            />
        </LocalizationProvider>
    );
};

export default Calendar;
