import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from '@mui/material';

const localizer = momentLocalizer(moment);

const TechnicianScheduleCalendar = ({ schedules, onSelect }) => {
    const events = schedules.map(s => {
        const date = new Date(s.work_date);
        const startHour = s.shift === "1" ? 8 : 13;
        const endHour = s.shift === "1" ? 12 : 17;

        return {
            id: s.work_schedule_id,
            title: `${s.shift === "1" ? "Ca Sáng" : "Ca Chiều"} - ${s.Technician.Store.name}`,
            start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), startHour, 0),
            end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), endHour, 0),
            status: s.current_number >= s.max_number ? "Đã đầy" : "Còn trống",
            original: s
        };
    });

    const eventStyleGetter = (event) => {
        let backgroundColor = "#4caf50"; // Green for available
        if (event.status === "Đã đầy") backgroundColor = "#f44336"; // Red for full
        return {
            style: {
                backgroundColor,
                color: "white",
                borderRadius: "4px",
                border: "none",
                padding: "4px 8px",
                fontSize: "0.9rem"
            }
        };
    };

    return (
        <div className="card p-3 shadow-sm">
            <Box sx={{ height: 500, bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden' }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="month"
                    views={['month', 'week', 'day']}
                    eventPropGetter={eventStyleGetter}
                    onSelectEvent={(event) => onSelect?.(event.original)}
                    components={{
                        event: ({ event }) => (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        bgcolor: event.status === "Đã đầy" ? 'error.main' : 'success.main'
                                    }}
                                />
                                <span>{event.title}</span>
                            </Box>
                        )
                    }}
                    formats={{
                        timeGutterFormat: 'HH:mm',
                        eventTimeRangeFormat: ({ start, end }) =>
                            `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`
                    }}
                    sx={{
                        '& .rbc-event': { borderRadius: '4px', padding: '2px 4px' },
                        '& .rbc-time-view': { bgcolor: 'white' },
                        '& .rbc-month-view': { bgcolor: 'white' },
                        '& .rbc-header': { bgcolor: 'primary.main', color: 'white', p: 2 }
                    }}
                />
            </Box>
        </div>
    );
};

export default TechnicianScheduleCalendar;