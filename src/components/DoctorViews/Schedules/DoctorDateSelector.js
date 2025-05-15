import { useState, useEffect } from "react";

const DoctorDateSelector = ({ onSelectDate }) => {
    const [availableDates, setAvailableDates] = useState([]);
    const daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

    useEffect(() => {
        const today = new Date();
        let dates = [];
        
        for (let i = 0; i < 7; i++) {
            const optionDate = new Date();
            optionDate.setDate(today.getDate() + i);
            
            const weekdayName = daysOfWeek[optionDate.getDay()];
            const dd = String(optionDate.getDate()).padStart(2, '0');
            const mm = String(optionDate.getMonth() + 1).padStart(2, '0');
            const yyyy = optionDate.getFullYear();
            
            const formattedDate = `${weekdayName} (${dd}/${mm}/${yyyy})`;
            const valueDate = `${yyyy}-${mm}-${dd}`;
            
            dates.push({ label: formattedDate, value: valueDate });
        }
        
        setAvailableDates(dates);
    }, []);

    return (
        <select className="form-control" onChange={(e) => onSelectDate(e.target.value)}>
            {availableDates.map((date) => (
                <option key={date.value} value={date.value}>
                    {date.label}
                </option>
            ))}
        </select>
    );
};

export default DoctorDateSelector;
