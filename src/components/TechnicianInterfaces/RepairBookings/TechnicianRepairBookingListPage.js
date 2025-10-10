// ⚙️ Thêm debounce & fix lọc logic, loadMore, check chi tiết
import { useState, useEffect, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import TechnicianRepairBookingCard from "./TechnicianRepairBookingCard";
import TechnicianRepairBookingFilter from "./TechnicianRepairBookingFilter";
import TechnicianRepairBookingDetail from "./TechnicianRepairBookingDetail";
import { getBookingsTechnicianId, getData2 } from "../../../services/RepairBookingService";
import { AuthContext } from "../../../context/AuthContext";
import LoadMore from "../../../components/commons/LoadMore";

const ITEMS_PER_PAGE = 10;

const TechnicianRepairBookingListPage = () => {
	const { auth } = useContext(AuthContext);
	const technicianId = auth.user.technicianId;

	const today = new Date();
	const endDate = today.toISOString().split("T")[0];
	const startDate = new Date();
	startDate.setMonth(startDate.getMonth() - 5);
	const startDateStr = startDate.toISOString().split("T")[0];

	const [allBookings, setAllBookings] = useState([]);
	const [filteredBookings, setFilteredBookings] = useState([]);
	const [displayedBookings, setDisplayedBookings] = useState([]);
	const [filter, setFilter] = useState({ startDate: startDateStr, endDate, status: "all" });
	const [selectedBooking, setSelectedBooking] = useState(null);
	const [page, setPage] = useState(1);
	const debounceTimer = useRef(null);

	const fetchBookings = async () => {
		try {
			const res = await getBookingsTechnicianId(technicianId);
			if (res?.EC === 0 && res?.DT) {
				setAllBookings(res.DT);
			} else {
				toast.error(res?.EM || "Lỗi tải dữ liệu");
			}
		} catch (err) {
			console.error("Lỗi tải đơn:", err);
		}
	};

	const fetchBookingDetail = async (bookingId) => {
		if (selectedBooking?.booking_id === bookingId) return; // tránh gọi lại
		try {
			const res = await getData2(bookingId);
			if (res?.EC === 0 && res?.DT) {
				setSelectedBooking(res.DT);
			} else toast.error(res?.EM || "Lỗi tải chi tiết");
		} catch (err) {
			console.error("Lỗi tải chi tiết:", err);
		}
	};

	const handleFilter = () => {
		let result = [...allBookings];

		// lọc theo trạng thái
		if (filter.status !== "all") {
			result = result.filter(b => b.status === filter.status);
		}

		// lọc theo ngày
		result = result.filter(b => {
			const date = new Date(b.booking_date);
			if (filter.startDate && date < new Date(filter.startDate)) return false;
			if (filter.endDate && date > new Date(filter.endDate)) return false;
			return true;
		});

		setFilteredBookings(result);
		setDisplayedBookings(result.slice(0, ITEMS_PER_PAGE));
		setPage(1);
	};

	const handleLoadMore = () => {
		const nextPage = page + 1;
		const start = (nextPage - 1) * ITEMS_PER_PAGE;
		const end = start + ITEMS_PER_PAGE;
		setDisplayedBookings(prev => [...prev, ...filteredBookings.slice(start, end)]);
		setPage(nextPage);
	};

	useEffect(() => {
		fetchBookings();
	}, []);

	useEffect(() => {
		clearTimeout(debounceTimer.current);
		debounceTimer.current = setTimeout(() => handleFilter(), 300);
	}, [filter, allBookings]);

	return (
		<div className="container py-5">
			<div className="row">
				<div className="col-3">
					<TechnicianRepairBookingFilter
						filter={filter}
						onFilter={(newFilter) => setFilter(newFilter)}
					/>
				</div>

				<div className="col-9">
					<div className="border-bottom mb-4 p-3">
						<p className="fs-4 m-0">Danh sách đơn sửa chữa Kỹ Thuật Viên</p>
					</div>

					<div className="row">
						{selectedBooking ? (
							<div className="col-12 position-relative">
								<AnimatePresence>
									<motion.div
										key={selectedBooking.booking_id}
										className="col"
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{ duration: 0.3 }}
									>
										<TechnicianRepairBookingDetail
											booking={selectedBooking}
											onClose={() => setSelectedBooking(null)}
										/>
									</motion.div>
								</AnimatePresence>
							</div>
						) : (
							<div className="col-12">
								{displayedBookings.length === 0 ? (
									<p className="text-center text-muted py-5">Không có dữ liệu</p>
								) : (
									<>
										<div className="row row-cols-1 row-cols-2 g-2">
											<AnimatePresence>
												{displayedBookings.map((b) => (
													<motion.div
														key={b.booking_id}
														className="col"
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														exit={{ opacity: 0, y: -20 }}
														transition={{ duration: 0.3 }}
													>
														<TechnicianRepairBookingCard
															booking={b}
															onSelect={(id) => fetchBookingDetail(id)}
														/>
													</motion.div>
												))}
											</AnimatePresence>
										</div>

										<LoadMore
											hasMore={displayedBookings.length < filteredBookings.length}
											onLoadMore={handleLoadMore}
										/>
									</>
								)}
							</div>
						)}
					</div>

				</div>
			</div>
		</div>
	);
};

export default TechnicianRepairBookingListPage;