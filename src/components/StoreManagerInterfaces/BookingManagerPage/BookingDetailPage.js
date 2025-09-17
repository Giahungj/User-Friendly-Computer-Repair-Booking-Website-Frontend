import {
	CalendarMonth as CalendarMonthIcon,
	Devices as DevicesIcon,
	Event as EventIcon,
	GetApp as GetAppIcon,
	Person as PersonIcon,
	Store as StoreIcon,
} from "@mui/icons-material";
import { Button, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getRepairBookingDetailForStoreManager } from "../../../services/RepairBookingService";
import exportRepairBooking from "../../utils/exportRepairBooking";


const BookingDetailPage = () => {
	const navigate = useNavigate();
	const { repair_booking_id } = useParams();
	const [repairBooking, setRepairBooking] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

  
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			if (!repair_booking_id) {
				toast.warn("repair_booking_id không tồn tại");
				setError(true);
				return;
			}
			try {
				setLoading(true);
				setError(false);
				const res = await getRepairBookingDetailForStoreManager(repair_booking_id);
				res?.EC === 0 ? setRepairBooking(res.DT) : setError(true);
			} catch (err) {
				console.error(err);
				setError(true);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [repair_booking_id]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleExport = (format) => {
        if (format === 'word') {
            exportRepairBooking.toWord(repairBooking);
        } else if (format === 'excel') {
            exportRepairBooking.toExcel(repairBooking);
        }
        handleClose();
    };
    
	const formatDate = (date) =>
		date ? new Date(date).toLocaleDateString("vi-VN") : "Chưa có";
	const formatTime = (time) => (time ? time.slice(0, 5) : "Chưa có");

	const customer = repairBooking?.Customer?.User || {};
	const customerData = repairBooking?.Customer || {};
	const ws = repairBooking?.WorkSchedule || {};
	const technician = ws?.Technician?.User || {};
	const store = ws?.Technician?.Store || {};

	const InfoCard = ({ title, icon, children }) => (
		<div className="col">
			<div className="card border rounded h-100 d-flex flex-column">
                <div 
                    className="card-header text-white"
                    style={{ background: "linear-gradient(135deg, #8654f1ff, #513c7fff)" }}
                >
                    <h5 className="mb-0 lead d-flex align-items-center">
                        {icon} <span className="ms-1">{title}</span>
                    </h5>
                </div>
                <div className="card-body flex-grow-1">
                    {children}
                </div>
            </div>
		</div>
	);

	return (
		<div className="container py-5">
            <div className="shadow-sm border-0 rounded bg-white p-3 mb-3">
                <div className="d-flex justify-content-between align-items-center">
                    <p className="lead fs-3 m-0">Thông tin đặt lịch sửa chữa</p>
                    <div>
                    <Button
                        className="export-button"
                        variant="contained"
                        size="large"
                        startIcon={<GetAppIcon />}
                        onClick={handleClick}
                    >
                        Xuất thông tin
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <MenuItem onClick={() => handleExport('word')}>Xuất dạng Word</MenuItem>
                        <MenuItem onClick={() => handleExport('excel')}>Xuất dạng Excel</MenuItem>
                    </Menu>
                    </div>
                </div>
            </div>

			<div className="shadow-sm border-0 rounded bg-white p-3 mb-3">
				<div className="row g-4">
                    <InfoCard title="Đặt lịch" icon={<CalendarMonthIcon className="me-2" />}>
                        <div className="d-flex mb-2">
                            <div className="w-50 me-2 ps-2 border-0 rounded text-white" 
                                style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}
                            >Mã đặt lịch:</div>
                            <div className="bg-white w-50">{repairBooking.booking_id}</div>
                        </div>
                        <div className="d-flex">
                            <div className="w-50 me-2 ps-2 border-0 rounded text-white" 
                                style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}
                            >Trạng thái:</div>
                            <div className="bg-white w-50">{repairBooking.status}</div>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            <small className="text-muted"><i>Ngày tạo: {formatDate(repairBooking.createdAt)}</i></small>
                            <small className="text-muted"><i>Cập nhật: {formatDate(repairBooking.updatedAt)}</i></small>
                        </div>
                    </InfoCard>

                    <InfoCard title="Khách hàng" icon={<PersonIcon className="me-2" />}>
                        <div className="d-flex mb-2">
                            <div className="w-50 me-2 ps-2 rounded text-white" style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}>Tên:</div>
                            <div className="bg-white w-50">{customer.name || "Chưa có"}</div>
                        </div>
                        <div className="d-flex mb-2">
                            <div className="w-50 me-2 ps-2 rounded text-white" style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}>Điện thoại:</div>
                            <div className="bg-white w-50">{customer.phone || "Chưa có"}</div>
                        </div>
                        <div className="d-flex mb-2">
                            <div className="w-50 me-2 ps-2 rounded text-white" style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}>Email:</div>
                            <div className="bg-white w-50">{customer.email || "Chưa có"}</div>
                        </div>
                        <div className="d-flex mb-2">
                            <div className="w-50 me-2 ps-2 rounded text-white" style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}>Địa chỉ:</div>
                            <div className="bg-white w-50">{customer.address || "Chưa có"}</div>
                        </div>
                        <div className="d-flex mb-2">
                            <div className="w-50 me-2 ps-2 rounded text-white" style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}>Ngày sinh:</div>
                            <div className="bg-white w-50">{formatDate(customerData.date_of_birth)}</div>
                        </div>
                        <div className="d-flex mb-2">
                            <div className="w-50 me-2 ps-2 rounded text-white" style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}>Liên hệ:</div>
                            <div className="bg-white w-50">{customerData.preferred_contact || "Chưa có"}</div>
                        </div>
                        <div className="d-flex mb-2">
                            <div className="w-50 me-2 ps-2 rounded text-white" style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}>Điểm tích lũy:</div>
                            <div className="bg-white w-50">{customerData.loyalty_points || 0}</div>
                        </div>
                        {customer.avatar && (
                            <img
                                src={`http://localhost:8080${customer.avatar}`}
                                alt="Ảnh khách hàng"
                                className="img-fluid rounded mt-2 shadow-sm"
                                style={{ maxWidth: "100px", height: "100px", objectFit: "cover" }}
                            />
                        )}
                    </InfoCard>

                    <InfoCard title="Kỹ thuật viên" icon={<PersonIcon className="me-2" />}>
                        <div className="text-center mb-2">
                            {technician.avatar && (
                                <img
                                    src={`http://localhost:8080/images/${technician.avatar}`}
                                    alt="Ảnh KTV"
                                    className="img-fluid rounded-circle mt-2 shadow-sm"
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                />
                            )}
                        </div>
                        <div className="d-flex mb-2">
                            <div className="w-50 me-2 ps-2 rounded text-white" 
                                style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}
                            >Tên:</div>
                            <div className="bg-white w-50">{technician.name || "Chưa có"}</div>
                        </div>
                        <div className="d-flex mb-2">
                            <div className="w-50 me-2 ps-2 rounded text-white" 
                                style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}
                            >SĐT:</div>
                            <div className="bg-white w-50">{technician.phone || "Chưa có"}</div>
                        </div>
                        <div className="d-flex mb-2">
                            <div className="w-50 me-2 ps-2 rounded text-white" 
                                style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}
                            >Email:</div>
                            <div className="bg-white w-50">{technician.email || "Chưa có"}</div>
                        </div>
                    </InfoCard>
				</div>

				<div className="row mt-2 g-4">
                    <InfoCard title="Thiết bị" icon={<DevicesIcon className="me-2" />}>
                        <div className="row">
                            {repairBooking.issue_image && (
                                <div className="col-md-4 d-flex justify-content-center align-items-start">
                                    <img
                                        src={`http://localhost:8080/images/${repairBooking.issue_image}`}
                                        alt="Ảnh lỗi"
                                        className="img-fluid rounded shadow-sm"
                                        style={{ maxWidth: "150px" }}
                                    />
                                </div>
                            )}
                            <div className={repairBooking.issue_image ? "col-md-8" : "col-12"}>
                                <div className="d-flex mb-2">
                                    <div className="w-50 me-2 ps-2 border-0 rounded text-white" 
                                        style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}
                                    >Loại thiết bị:</div>
                                    <div className="bg-white w-50">{repairBooking.device_type || "Chưa có"}</div>
                                </div>
                                <div className="d-flex mb-2">
                                    <div className="w-50 me-2 ps-2 border-0 rounded text-white" 
                                        style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}
                                    >Thương hiệu:</div>
                                    <div className="bg-white w-50">{repairBooking.brand || "Chưa có"}</div>
                                </div>
                                <div className="d-flex mb-2">
                                    <div className="w-50 me-2 ps-2 border-0 rounded text-white" 
                                        style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}
                                    >Model:</div>
                                    <div className="bg-white w-50">{repairBooking.model || "Chưa có"}</div>
                                </div>
                                <div className="d-flex">
                                    <div className="w-50 me-2 ps-2 border-0 rounded text-white" 
                                        style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}
                                    >Mô tả lỗi:</div>
                                    <div className="bg-white w-50">{repairBooking.issue_description || "Chưa có"}</div>
                                </div>
                            </div>
                        </div>
                    </InfoCard>

                    <InfoCard title="Lịch làm việc & Cửa hàng" icon={<EventIcon className="me-2" />}>
                        <div className="d-flex mb-2">
                            <div className="w-50 me-2 ps-2 border-0 rounded text-white" 
                                style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}
                            >Giờ đặt:</div>
                            <div className="bg-white w-50">{formatTime(repairBooking.booking_time)}</div>
                        </div>
                        <div className="d-flex mb-2">
                            <div className="w-50 me-2 ps-2 border-0 rounded text-white" 
                                style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}
                            >Ngày đặt:</div>
                            <div className="bg-white w-50">{formatDate(repairBooking.booking_date)}</div>
                        </div>
                        <div className="d-flex mb-2">
                            <div className="w-50 me-2 ps-2 border-0 rounded text-white" 
                                style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}
                            >Ngày làm việc:</div>
                            <div className="bg-white w-50">{formatDate(ws.work_date)}</div>
                        </div>
                        <div className="d-flex mb-2">
                            <div className="w-50 me-2 ps-2 border-0 rounded text-white" 
                                style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}
                            >Ca:</div>
                            <div className="bg-white w-50">{ws.shift === "1" ? "Sáng" : ws.shift === "2" ? "Chiều" : "Chưa có"}</div>
                        </div>
                        <hr />
                        <div className="d-flex mb-2">
                            <div className="w-50 me-2 ps-2 border-0 rounded text-white" 
                                style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}
                            >Cửa hàng:</div>
                            <div className="bg-white w-50">{store.name || "Chưa có"}</div>
                        </div>
                        <div className="d-flex mb-2">
                            <div className="w-50 me-2 ps-2 border-0 rounded text-white" 
                                style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}
                            >Địa chỉ:</div>
                            <div className="bg-white w-50">{store.address || "Chưa có"}</div>
                        </div>
                        <div className="d-flex">
                            <div className="w-50 me-2 ps-2 border-0 rounded text-white" 
                                style={{ background: "linear-gradient(135deg, #00a8c2ff, #3c497fff)" }}
                            >SĐT:</div>
                            <div className="bg-white w-50">{store.phone || "Chưa có"}</div>
                        </div>
                    </InfoCard>
				</div>
			</div>
		</div>
	);
};

export default BookingDetailPage;