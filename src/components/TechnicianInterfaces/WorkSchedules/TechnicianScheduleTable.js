import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const TechnicianScheduleTable = ({ schedules, onSelect }) => {
    const formatShift = (shift) => (shift === "1" ? "Sáng" : shift === "2" ? "Chiều" : shift);
    const shiftStyle = (shift) => ({
        fontWeight: 'bold',
        color: shift === "1" ? '#ffca28' : shift === "2" ? '#1976d2' : 'inherit'
    });

    return (
        <div className="card p-3 shadow-sm">
            {schedules.length === 0 ? (
                <Typography variant="body1" color="text.secondary" align="center" sx={{ my: 3 }}>
                    Không có lịch làm việc
                </Typography>
            ) : (
                <Table sx={{ minWidth: 650 }} aria-label="technician schedule table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#1e1e1e' }}>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Ngày</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Ca</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Trạng thái</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Cửa hàng</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {schedules.map((s, idx) => (
                            <TableRow
                                key={idx}
                                hover
                                onClick={() => onSelect?.(s)}
                                sx={{ cursor: 'pointer' }}
                            >
                                <TableCell>{new Date(s.work_date).toLocaleDateString("vi-VN")}</TableCell>
                                <TableCell sx={shiftStyle(s.shift)}>{formatShift(s.shift)}</TableCell>
                                <TableCell>
                                    {s.current_number >= s.max_number
                                        ? "Đã đầy"
                                        : `Còn ${s.current_number}/${s.max_number} slot`}
                                </TableCell>
                                <TableCell>{s.Technician.Store.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default TechnicianScheduleTable;