import GetAppIcon from "@mui/icons-material/GetApp";
import { Button, Avatar, Menu, MenuItem } from "@mui/material";
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
                console.log("res", res);
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
	const ws = repairBooking?.WorkSchedule || {};
	const technician = ws?.Technician?.User || {};
	const store = ws?.Technician?.Store || {};

	return (
		<div className="container py-5">
            <div className="shadow-sm border-0 rounded bg-white p-3 mb-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3>Thông tin đặt lịch sửa chữa</h3>
                    <div>
                        <Button variant="contained" size="large" startIcon={<GetAppIcon />} onClick={(e) => setAnchorEl(e.currentTarget)}>Xuất thông tin</Button>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                            <MenuItem onClick={() => { exportRepairBooking.toWord(repairBooking); setAnchorEl(null); }}>Xuất dạng Word</MenuItem>
                            <MenuItem onClick={() => { exportRepairBooking.toExcel(repairBooking); setAnchorEl(null); }}>Xuất dạng Excel</MenuItem>
                        </Menu>
                    </div>
                </div>

                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <th className="text-end">Mã đặt lịch</th><td>{repairBooking.booking_id}</td>
                            <th className="text-end">Trạng thái</th><td>{repairBooking.status}</td>
                        </tr>
                        <tr>
                            <th className="text-end">Ngày tạo</th><td>{formatDate(repairBooking.createdAt)}</td>
                            <th className="text-end">Cập nhật</th><td>{formatDate(repairBooking.updatedAt)}</td>
                        </tr>

                        <tr><th colSpan={4} className="text-center bg-light">Khách hàng</th></tr>
                        <tr>
                            <th className="text-end">Tên</th><td>{customer.name || "Chưa có"}</td>
                            <th className="text-end">Điện thoại</th><td>{customer.phone || "Chưa có"}</td>
                        </tr>
                        <tr>
                            <th className="text-end">Email</th><td>{customer.email || "Chưa có"}</td>
                            <th className="text-end">Địa chỉ</th><td>{customer.address || "Chưa có"}</td>
                        </tr>

                        <tr><th colSpan={4} className="text-center bg-light">Kỹ thuật viên</th></tr>
                        <tr>
                            <th className="text-end">Tên</th><td>{technician.name || "Chưa có"}</td>
                            <th className="text-end">SĐT</th><td>{technician.phone || "Chưa có"}</td>
                        </tr>
                        <tr>
                            <th className="text-end">Email</th><td>{technician.email || "Chưa có"}</td>
                            <th className="text-end">Ảnh</th><td>{technician.avatar && <Avatar src={`http://localhost:8080/images/${technician.avatar}`} />}</td>
                        </tr>

                        <tr><th colSpan={4} className="text-center bg-light">Thiết bị</th></tr>
                        <tr>
                            <th className="text-end">Loại thiết bị</th><td>{repairBooking.device_type || "Chưa có"}</td>
                            <th className="text-end">Thương hiệu</th><td>{repairBooking.brand || "Chưa có"}</td>
                        </tr>
                        <tr>
                            <th className="text-end">Model</th><td>{repairBooking.model || "Chưa có"}</td>
                            <th className="text-end">Ảnh lỗi</th><td>{repairBooking.issue_image && <Avatar variant="square" src={`http://localhost:8080/images/${repairBooking.issue_image}`} sx={{ width: 100, height: 100 }} />}</td>
                        </tr>
                        <tr>
                            <th className="text-end">Mô tả lỗi</th><td colSpan={3}>{repairBooking.issue_description || "Chưa có"}</td>
                        </tr>

                        {repairBooking.RepairHistories?.length > 0 && <>
                            <tr><th colSpan={4} className="text-center bg-light">Lịch sử thay đổi</th></tr>
                            {repairBooking.RepairHistories.map(h => (
                                <tr key={h.history_id}>
                                    <th className="text-end">[{formatDate(h.action_date)}] {h.status.toUpperCase()}</th>
                                    <td>{h.notes}</td>
                                    <th></th><td></td>
                                </tr>
                            ))}
                        </>}

                        <tr><th colSpan={4} className="text-center bg-light">Lịch làm việc & Cửa hàng</th></tr>
                        <tr>
                            <th className="text-end">Giờ đặt</th><td>{formatTime(repairBooking.booking_time)}</td>
                            <th className="text-end">Ngày đặt</th><td>{formatDate(repairBooking.booking_date)}</td>
                        </tr>
                        <tr>
                            <th className="text-end">Ngày làm việc</th><td>{formatDate(ws.work_date)}</td>
                            <th className="text-end">Ca</th><td>{ws.shift==="1"?"Sáng":ws.shift==="2"?"Chiều":"Chưa có"}</td>
                        </tr>
                        <tr>
                            <th className="text-end">Cửa hàng</th><td>{store.name||"Chưa có"}</td>
                            <th className="text-end">Địa chỉ</th><td>{store.address||"Chưa có"}</td>
                        </tr>
                        <tr>
                            <th className="text-end">SĐT</th><td>{store.phone||"Chưa có"}</td>
                            <th></th><td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

	);
};

export default BookingDetailPage;