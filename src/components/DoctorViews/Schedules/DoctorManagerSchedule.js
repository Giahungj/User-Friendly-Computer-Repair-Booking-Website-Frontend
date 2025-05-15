import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RevolvingDot } from "react-loader-spinner";
import { fetchDoctorSchedules } from "../../../services/ScheduleService";
import { Box, Typography, TextField, Select, MenuItem, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const DoctorScheduleManager = () => {
    const [rows, setRows] = useState([]);
    const { auth } = useContext(AuthContext);
    const [filter, setFilter] = useState({
        date: '',
        status: 'all',
    });
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    useEffect(() => {
        if (!auth || !auth.isAuthenticated) {
            toast.error("Bạn cần đăng nhập để thực hiện hành động này!");
            navigate("/login");
            return;
        }
        const fetchSchedule = async () => {
            try {
                const data = await fetchDoctorSchedules(id);
                if (data.EC === 0) {
                    const formattedData = data.DT.map((item) => {
                        const rawDate = item.date;
                        const parsedDate = new Date(rawDate);
        
                        // Kiểm tra ngày hợp lệ
                        if (isNaN(parsedDate.getTime())) {
                            console.error("Invalid date:", rawDate);
                            return null;
                        }
        
                        // Lấy thời gian hiện tại
                        const today = new Date();
                        const currentTime = today.toTimeString().slice(0, 5); // HH:MM hiện tại
                        // So sánh ngày, bỏ giờ
                        const parsedDateOnly = new Date(parsedDate.setHours(0, 0, 0, 0));
                        const todayOnly = new Date(today.setHours(0, 0, 0, 0));
                        const isSameDay = parsedDateOnly.getTime() === todayOnly.getTime();
                        const isPastDay = parsedDateOnly < todayOnly;

                        // Lấy startTime và endTime từ Timeslot
                        const startTime = item.Timeslot?.startTime?.slice(0, 5); // HH:MM
                        const endTime = item.Timeslot?.endTime?.slice(0, 5); // HH:MM

                        // Xác định isPastDate: ngày trước hôm nay hoặc ngày hiện tại đã qua endTime
                        const isPastDate = isPastDay || (isSameDay && endTime && currentTime > endTime);
                        // Xác định trạng thái dựa trên ngày và thời gian
                        let status;
                        if (isPastDate) {
                            status = 'Đã qua';
                        } else if (isSameDay && startTime && endTime) {
                            if (currentTime < startTime) {
                                status = 'Chưa đến';
                            } else {
                                status = 'Đang diễn ra';
                            }
                        } else {
                            status = item.currentNumber >= item.maxNumber ? 'Đã đầy' : 'Còn trống';
                        }

                        console.log('Id - ', item.id);
                        console.log('Ngày của lịch hẹn - ', item.date);
                        console.log('Ngày hôm nay - ', today.toISOString().split('T')[0]);
                        console.log('Ngày đã qua - ', isPastDate);
                        console.log('Thời gian hiện tại - ', currentTime);
                        console.log('Thời gian lịch hẹn - ', startTime, '-', endTime);
                        
                        return {
                            id: item.id,
                            date: parsedDate.toLocaleString("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit" }),
                            dateedit: item.date,
                            time: item.Timeslot ? `${item.Timeslot.startTime?.slice(0, 5)} - ${item.Timeslot.endTime?.slice(0, 5)}` : "N/A",
                            patient: `${item.currentNumber ?? 0}/${item.maxNumber ?? 0} bệnh nhân`,
                            reason: 'Lịch khám',
                            status: isPastDate ? 'Đã qua' : 
                                    (item.currentNumber >= item.maxNumber ? 'Đã đầy' : 'Còn trống'),
                            isPastDate,
                        };
                    }).filter(item => item !== null);
                    setRows(formattedData);
                } else {
                    setError(data.EM || "Lỗi khi tải lịch làm việc.");
                }
            } catch (err) {
                setError("Lỗi khi tải lịch làm việc.");
            } finally {
                setLoading(false);
            }
        };

        fetchSchedule();
    }, [id]);

    // Lọc dữ liệu theo bộ lọc
    const filteredRows = rows.filter((row) => {
        const matchesDate = filter.date ? row.date.includes(filter.date) : true;
        const matchesStatus = filter.status === 'all' || row.status === filter.status;
        return matchesDate && matchesStatus;
    });

    // Xử lý chỉnh sửa
    const handleEdit = (rowId, rowDate) => {
        const formattedDate = new Date(rowDate).toISOString().split('T')[0];
        const today = new Date().toISOString().split('T')[0];
    
        if (formattedDate < today) {
            alert("Không thể chỉnh sửa lịch đã qua ngày.");
            return;
        }
    
        navigate(`/doctor/update-schedule/${rowId}/${id}/${formattedDate}`);
    };

    // Xử lý mở hộp thoại xóa
    const handleDelete = (rowId) => {
        setSelectedRow(rowId);
        setOpenDeleteDialog(true);
    };

    // Xử lý xác nhận xóa
    const confirmDelete = () => {
        console.log("Xóa lịch hẹn có ID:", selectedRow);
        setRows(rows.filter(row => row.id !== selectedRow)); // Cập nhật UI tạm thời
        setOpenDeleteDialog(false);
    };

    if (loading) return (
        <div className="loading-container">
            <RevolvingDot color="#6edff6" />
            <div className="loading-content">Đang tải chờ xíu ...</div>
        </div>
    );
    if (error)
        return (
        <div className="p-4 bg-white shadow rounded">
            <h3 className="text-center mb-3">Có lỗi xảy ra</h3>
            <p className="text-muted text-center">{error}</p>
        </div>
    );  
    return (
        <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Lịch làm việc của bác sĩ
            </Typography>

            {/* Bộ lọc */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                    label="Ngày (YYYY-MM-DD)"
                    variant="outlined"
                    size="small"
                    value={filter.date}
                    onChange={(e) => setFilter({ ...filter, date: e.target.value })}
                    sx={{ width: 150 }}
                />
                <Select
                    value={filter.status}
                    onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                    size="small"
                    sx={{ width: 200 }}
                >
                    <MenuItem value="all">Tất cả trạng thái</MenuItem>
                    <MenuItem value="Còn trống">Còn trống</MenuItem>
                    <MenuItem value="Đã đầy">Đã đầy</MenuItem>
                </Select>
                <Button
                    variant="outlined"
                    onClick={() => setFilter({ date: '', status: 'all' })}
                >
                    Xóa bộ lọc
                </Button>
            </Box>

            {/* DataGrid */}
            <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={filteredRows}
                    columns={[
                        { field: 'id', headerName: 'id', width: 50 },
                        { field: 'date', headerName: 'Ngày', width: 120 },
                        { field: 'time', headerName: 'Giờ', width: 150 },
                        { field: 'patient', headerName: 'Bệnh nhân', width: 180 },
                        { field: 'reason', headerName: 'Lý do', width: 150 },
                        { field: 'status', headerName: 'Trạng thái', width: 120 },
                        {
                            field: 'actions',
                            headerName: 'Hành động',
                            width: 100,
                            sortable: false,
                            renderCell: (params) => {
                                return (
                                    <Box direction="row" spacing={1}>
                                        <IconButton 
                                            onClick={() => handleEdit(params.row.id, params.row.dateedit)} 
                                            disabled={params.row.isPastDate} 
                                            style={{ opacity: params.row.isPastDate ? 0.5 : 1 }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(params.row.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                );
                            }
                        },
                    ]}
                    pageSize={10}
                    rowsPerPageOptions={[10, 20, 50]}
                    checkboxSelection
                    disableSelectionOnClick
                    getRowClassName={(params) => params.row.isPastDate ? 'past-date-row' : ''}
                    sx={{
                        '& .MuiDataGrid-row:hover': { backgroundColor: '#e0e0e0' },
                        '& .past-date-row': { backgroundColor: '#ffebee' }, // Định nghĩa style trực tiếp
                    }}
                />
            </Box>

            {/* Dialog xác nhận xóa */}
            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
            >
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa lịch làm việc này? Hành động này không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={confirmDelete} color="error">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
export default DoctorScheduleManager;

