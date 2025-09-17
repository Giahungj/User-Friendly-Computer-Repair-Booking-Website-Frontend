import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getRepairBookingsForStoreManager } from "../../../services/RepairBookingService";

import LoadingAndError from "../../commons/LoadingAndError";
import HeaderBar from "./HeaderBar";
import FilterPanel from "./FilterPanel";
import StatisticsCard from "./StatisticsCard";
import BookingTable from "./BookingTable";
import BookingDetailModal from "./BookingDetailModal";
import ReassignTechnicianModal from "./ReassignTechnicianModal";

function BookingManagementPage() {
	const { auth } = useContext(AuthContext);
	const storeManagerId = auth.user.storeManagerId;

	const [bookings, setBookings] = useState([]);
	const [originalBookings, setOriginalBookings] = useState([]);
	const [statistics, setStatistics] = useState({});
	const [selectedBooking, setSelectedBooking] = useState(null);
	const [openDetail, setOpenDetail] = useState(false);
	const [openReassign, setOpenReassign] = useState(false);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await getRepairBookingsForStoreManager(storeManagerId);
				if (res?.EC === 0) {
					setBookings(res.DT);
					setOriginalBookings(res.DT);
					setStatistics(calcStatistics(res.DT));
					setError(null);
				} else {
					setBookings([]);
					setOriginalBookings([]);
					setStatistics(calcStatistics([]));
					setError(res?.EM || "Không tải được dữ liệu");
				}
			} catch (err) {
				setBookings([]);
				setOriginalBookings([]);
				setStatistics(calcStatistics([]));
				setError("Lỗi kết nối server");
			} finally {
				setLoading(true);
			}
		};
		fetchData();
	}, [storeManagerId]);

	const calcStatistics = (list) => {
		return {
			total: list.length,
			pending: list.filter(b => b.status === "pending").length,
			confirmed: list.filter(b => b.status === "confirmed").length,
			completed: list.filter(b => b.status === "completed").length,
			cancelled: list.filter(b => b.status === "cancelled").length,
		};
	};

	const handleOpenDetail = (booking) => {
		setSelectedBooking(booking);
		setOpenDetail(true);
	};

	const handleOpenReassign = (booking) => {
		setSelectedBooking(booking);
		setOpenReassign(true);
	};

	const handleFilter = ({ status, technician, customer, date }) => {
		let filtered = originalBookings;

		if (status) {
			filtered = filtered.filter(b => b.status === status);
		}
		if (technician) {
			filtered = filtered.filter(b =>
				b.WorkSchedule.Technician.User.name.toLowerCase().includes(technician.toLowerCase())
			);
		}
		if (customer) {
			filtered = filtered.filter(b =>
				b.Customer.User.name.toLowerCase().includes(customer.toLowerCase())
			);
		}
		if (date) {
			filtered = filtered.filter(b => b.booking_date === date);
		}

		setBookings(filtered);
		setStatistics(calcStatistics(filtered));
	};

	{loading && <LoadingAndError.Loading />}
	{error && <LoadingAndError.Error />}

	return (
		<div className="container py-5">
			<div className="card border-0 shadow-sm rounded mb-3">
                <div className="card-body text-center">
                    <p className="lead fs-3 m-0">Quản lý Lịch làm việc</p>
                </div>
            </div>
			<HeaderBar
				onToday={() => handleFilter({ date: "2025-08-20" })}
				onThisWeek={() => console.log("Filter this week (TODO)")}
				onAll={() => {
					setBookings(originalBookings);
					setStatistics(calcStatistics(originalBookings));
				}}
			/>

			<FilterPanel onFilter={handleFilter} />
			<StatisticsCard data={statistics} />

			<BookingTable
				bookings={bookings}
				onViewDetail={handleOpenDetail}
				onReassign={handleOpenReassign}
			/>

			{openDetail && (
				<BookingDetailModal
					booking={selectedBooking}
					onClose={() => setOpenDetail(false)}
				/>
			)}

			{openReassign && (
				<ReassignTechnicianModal
					booking={selectedBooking}
					onClose={() => setOpenReassign(false)}
				/>
			)}
		</div>
	);
}

export default BookingManagementPage;
