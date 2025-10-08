import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getRepairBookingsForStoreManager } from "../../../services/RepairBookingService";

import LoadingAndError from "../../commons/LoadingAndError";
import HeaderBar from "./HeaderBar";
import FilterPanel from "./FilterPanel";
import StatisticsCard from "./StatisticsCard";
import BookingTable from "./BookingTable";
import BookingDetailModal from "./BookingDetailModal";
import { AddButton } from "../../commons/ActionButtons";

function BookingManagementPage() {
	const { auth } = useContext(AuthContext);
	const storeManagerId = auth.user.storeManagerId;

	const [bookings, setBookings] = useState([]);
	const [originalBookings, setOriginalBookings] = useState([]);
	const [statistics, setStatistics] = useState({});
	const [selectedBooking, setSelectedBooking] = useState(null);
	const [openDetail, setOpenDetail] = useState(false);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

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
				setLoading(false);
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

	if (loading) return <LoadingAndError.Loading />;
	if (error) return <LoadingAndError.Error message={error}  />;

	return (
		<div className="container py-5">
			<div className="card shadow-sm mb-4" style={{ color: "#415A77", background: "none" }}>
				<div className="card-body text-center py-3 d-flex justify-content-between align-items-center gap-3">
					<h4 className="mb-0">Quản lý Đơn đặt lịch </h4>
					<div className="d-flex justify-content-between align-items-center gap-3" >
						<AddButton style={{ fontSize: 40 }} />
					</div>
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
			/>

			{openDetail && (
				<BookingDetailModal
					booking={selectedBooking}
					onClose={() => setOpenDetail(false)}
				/>
			)}
		</div>
	);
}

export default BookingManagementPage;
