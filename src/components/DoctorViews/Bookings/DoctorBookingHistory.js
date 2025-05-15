import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import { fetchDoctorBookingHistory } from "../../../services/BookingService";
import { Box, Typography, TextField, Select, MenuItem, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon } from "@mui/icons-material";

const DoctorBookingHistory = () => {
    const [rows, setRows] = useState([]);
    const [filter, setFilter] = useState({
        date: '',
        status: 'all',
    });
    const { auth } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                if (!auth?.account?.doctorId) return;
                const data = await fetchDoctorBookingHistory(auth.account.doctorId);
                if (data.EC === 0) {
                    const formattedData = data.DT.rows.map((item) => {
                        console.log("API item:", item); // Log toàn bộ item
                        return {
                            id: item.id,
                            date: new Date(item.date).toLocaleDateString("vi-VN"),
                            time: `${item.Schedule?.Timeslot?.startTime} - ${item.Schedule?.Timeslot?.endTime}`,
                            patient: item.Patient?.User?.name || "Không xác định",
                            phone: item.Patient?.User?.phone || "Không có",
                            status: item.status === 1 ? "Chờ khám" : item.status === 2 ? "Đã khám" : "Đã hủy",
                        };
                    });
                    setRows(formattedData);
                }
            } catch (err) {
                setError("Lỗi khi tải lịch sử đặt lịch.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [auth]);

    // Lọc dữ liệu theo bộ lọc
    const filteredRows = rows.filter((row) => {
        const matchesDate = filter.date ? row.date.includes(filter.date) : true;
        const matchesStatus = filter.status === "all" || row.status === filter.status;
        return matchesDate && matchesStatus;
    });

    // Xử lý mở hộp thoại xóa
    const handleDelete = (rowId) => {
        setSelectedRow(rowId);
        setOpenDeleteDialog(true);
    };

    // Xử lý xác nhận xóa
    const confirmDelete = () => {
        console.log("Xóa lịch sử khám ID:", selectedRow);
        setRows(rows.filter(row => row.id !== selectedRow)); // Cập nhật UI tạm thời
        setOpenDeleteDialog(false);
    };

    if (loading) return <div>Đang tải...</div>;
    return (
        <Box sx={{ maxWidth: 1200, margin: "auto", padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Lịch sử khám bệnh
            </Typography>

            {/* Bộ lọc */}
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                    label="Ngày (DD/MM/YYYY)"
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
                    <MenuItem value="Chờ khám">Chờ khám</MenuItem>
                    <MenuItem value="Đã khám">Đã khám</MenuItem>
                    <MenuItem value="Đã hủy">Đã hủy</MenuItem>
                </Select>
                <Button variant="outlined" onClick={() => setFilter({ date: "", status: "all" })}>
                    Xóa bộ lọc
                </Button>
            </Box>

            {/* DataGrid */}
            <Box sx={{ height: 500, width: "100%" }}>
                <DataGrid
                    rows={filteredRows}
                    columns={[
                        { field: "date", headerName: "Ngày khám", width: 120 },
                        { field: "time", headerName: "Giờ", width: 150 },
                        { field: "patient", headerName: "Bệnh nhân", width: 180 },
                        { field: "phone", headerName: "Số điện thoại", width: 150 },
                        { field: "status", headerName: "Trạng thái", width: 120 },
                        {
                            field: "actions",
                            headerName: "Hành động",
                            width: 100,
                            sortable: false,
                            renderCell: (params) => (
                                <Box direction="row" spacing={1}>
                                    <IconButton onClick={() => navigate(`/doctor/manager-booking/booking-history/detail/${params.row.id}`)}>
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(params.row.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ),
                        },
                    ]}
                    pageSize={10}
                    rowsPerPageOptions={[10, 20, 50]}
                    checkboxSelection
                    disableSelectionOnClick
                    sx={{ "& .MuiDataGrid-row:hover": { backgroundColor: "#f5f5f5" } }}
                />
            </Box>

            {/* Dialog xác nhận xóa */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa lịch sử khám này? Hành động này không thể hoàn tác.
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
};

export default DoctorBookingHistory;
