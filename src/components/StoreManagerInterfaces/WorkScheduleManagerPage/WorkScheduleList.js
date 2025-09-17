import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import vi from "date-fns/locale/vi";
import dayjs from "dayjs";

const locales = {
    vi: vi,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
});

function WorkScheduleList({ schedules }) {
    if (!schedules || schedules.length === 0) {
        return <p className="text-muted">Chưa có lịch làm việc nào.</p>;
    }

    // map từ schedules sang events cho calendar
    const events = schedules.map((sch) => {
        const date = dayjs(sch.work_date);
        const start =
            sch.shift === 1
                ? date.hour(7).minute(0).toDate()
                : date.hour(13).minute(0).toDate();

        const end =
            sch.shift === 1
                ? date.hour(11).minute(0).toDate()
                : date.hour(17).minute(0).toDate();

        return {
            id: sch.work_schedule_id,
            title: `${sch.Technician?.User?.name} - Ca ${sch.shift}`,
            start,
            end,
        };
    });

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                messages={{
                    next: "➡ Sau",
                    previous: "⬅ Trước",
                    today: "Hôm nay",
                    month: "Tháng",
                    week: "Tuần",
                    day: "Ngày",
                }}
            />
        </div>
    );
}

export default WorkScheduleList;
