import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchDoctorPatients } from "../../services/PatientService"; // Giả định có service này
import { Box, Button, Typography, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const DoctorPatientManager = () => {
    const [rows, setRows] = useState([]);
    const [filter, setFilter] = useState({
        name: '',
        status: 'all',
    });
    const { doctorId } = useParams(); // ID của bác sĩ
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const data = await fetchDoctorPatients(doctorId); // Giả định API trả về danh sách bệnh nhân
                if (data.EC === 0) {
                    const formattedData = data.DT.map((patient) => ({
                        id: patient.patientId,
                        name: patient.name,
                        dateOfBirth: patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleString("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit" }) : 'Chưa cập nhật',
                        phone: patient.phoneNumber,
                        bookingCount: patient.bookingCount,
                    }));
                    setRows(formattedData);
                }
            } catch (err) {
                setError("Lỗi khi tải danh sách bệnh nhân.");
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, [doctorId]);

    // Lọc dữ liệu theo bộ lọc
    const filteredRows = rows.filter((row) => {
        const matchesName = filter.name ? row.name.toLowerCase().includes(filter.name.toLowerCase()) : true;
        return matchesName;
    });

    const handleView = (id) => {
        toast.success(`Xem chi tiết bệnh nhân ID: ${id}`);
        // Thêm logic xem chi tiết (ví dụ: mở modal, chuyển hướng)
    };

    return (
        <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Quản lý bệnh nhân
            </Typography>

            {/* Bộ lọc */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                    label="Tên bệnh nhân"
                    variant="outlined"
                    size="small"
                    value={filter.name}
                    onChange={(e) => setFilter({ ...filter, name: e.target.value })}
                    sx={{ width: 200 }}
                />
                <Button
                    variant="outlined"
                    onClick={() => setFilter({ name: '', status: 'all' })}
                >
                    Xóa bộ lọc
                </Button>
            </Box>

            {/* DataGrid */}
            <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={filteredRows}
                    columns={[
                        { field: 'name', headerName: 'Tên bệnh nhân', width: 120 },
                        { field: 'dateOfBirth', headerName: 'Ngày sinh', width: 120 },
                        { field: 'phone', headerName: 'Số điện thoại', width: 150 },
                        { field: 'bookingCount', headerName: 'Số lần khám', width: 150 },
                        {
                            field: 'actions',
                            headerName: 'Hành động',
                            width: 200,
                            renderCell: (params) => (
                                <>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleView(params.row.id)}
                                        style={{ marginRight: 8 }}
                                    >
                                        Xem
                                    </Button>
                                </>
                            ),
                        },
                    ]}
                    pageSize={10}
                    rowsPerPageOptions={[10, 20, 50]}
                    checkboxSelection
                    disableSelectionOnClick
                    sx={{ '& .MuiDataGrid-row:hover': { backgroundColor: '#f5f5f5' } }}
                />
            </Box>
        </Box>
    );
};

export default DoctorPatientManager;