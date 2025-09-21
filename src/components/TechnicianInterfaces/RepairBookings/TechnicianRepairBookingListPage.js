import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import TechnicianRepairBookingCard from "./TechnicianRepairBookingCard";
import TechnicianRepairBookingFilter from "./TechnicianRepairBookingFilter";
import TechnicianRepairBookingDetail from "./TechnicianRepairBookingDetail";

import { getData1, getData2 } from "../../../services/RepairBookingService";
import { AuthContext } from "../../../context/AuthContext";

const TechnicianRepairBookingListPage = () => {
	const { auth } = useContext(AuthContext);
	const technicianId = auth.user.technicianId;

	const today = new Date();
	const endDate = today.toISOString().split("T")[0];
	const startDate = new Date();
	startDate.setMonth(startDate.getMonth() - 5);
	const startDateStr = startDate.toISOString().split("T")[0];

	const [bookings, setBookings] = useState([]);
	const [filter, setFilter] = useState({ startDate: startDateStr, endDate });
	const [selectedBooking, setSelectedBooking] = useState(null);

	const fetchBookings = async (currentFilter) => {
		try {
			const res = await getData1({ technicianId, filter: currentFilter });
			if (res?.EC === 0 && res?.DT) {
				setBookings(res.DT);
			} else {
				toast.error(res?.EM || "Lỗi tải dữ liệu");
			}
		} catch (err) {
			console.error("Lỗi tải đơn:", err);
		}
	};

	const fetchBookingDetail = async (bookingId) => {
		try {
			const res = await getData2(bookingId);
			if (res?.EC === 0 && res?.DT) {
				setSelectedBooking(res.DT);
			} else {
				toast.error(res?.EM || "Lỗi tải chi tiết");
			}
		} catch (err) {
			console.error("Lỗi tải chi tiết:", err);
		}
	};

	useEffect(() => {
		fetchBookings(filter);
	}, [filter]);

	return (
		<div className="container py-5">
			<div className="card text-center p-4 mb-4">
				<h4 className="mb-3">Danh sách đơn sửa chữa Kỹ Thuật Viên</h4>
			</div>

			<div className="mb-3">
				<TechnicianRepairBookingFilter
					filter={filter}
					onFilter={(newFilter) => setFilter(newFilter)}
				/>
			</div>

			<div className="row">
				<div className={selectedBooking !== null ? "col-8" : "col-12"}>
					{bookings.length > 0 ? (
						<div className="row row-cols-1 row-cols-2 g-2">
							{bookings.map((b) => (
								<div key={b.booking_id} className="col">
									<TechnicianRepairBookingCard
										booking={b}
										onSelect={(booking_id) => fetchBookingDetail(booking_id)}
									/>
								</div>
							))}
						</div>
					) : (
						<div className="card text-center text-muted py-5 mb-4">
							<p>Không có đơn đặt lịch nào</p>
						</div>
					)}
				</div>

				{selectedBooking && (
					<div className="col-4 position-relative">
						<TechnicianRepairBookingDetail
							booking={selectedBooking}
							onClose={() => setSelectedBooking(null)}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default TechnicianRepairBookingListPage;
