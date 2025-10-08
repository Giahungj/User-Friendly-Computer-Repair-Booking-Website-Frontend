import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import TechnicianRepairBookingCard from "./TechnicianRepairBookingCard";
import TechnicianRepairBookingFilter from "./TechnicianRepairBookingFilter";
import TechnicianRepairBookingDetail from "./TechnicianRepairBookingDetail";

import { getData1, getData2 } from "../../../services/RepairBookingService";
import { AuthContext } from "../../../context/AuthContext";
import LoadMore from "../../../components/commons/LoadMore";

const ITEMS_PER_PAGE = 2;

const TechnicianRepairBookingListPage = () => {
	const { auth } = useContext(AuthContext);
	const technicianId = auth.user.technicianId;

	const today = new Date();
	const endDate = today.toISOString().split("T")[0];
	const startDate = new Date();
	startDate.setMonth(startDate.getMonth() - 5);
	const startDateStr = startDate.toISOString().split("T")[0];

	const [allBookings, setAllBookings] = useState([]);
	const [displayedBookings, setDisplayedBookings] = useState([]);
	const [filter, setFilter] = useState({ startDate: startDateStr, endDate });
	const [selectedBooking, setSelectedBooking] = useState(null);
	const [page, setPage] = useState(1);

	const fetchBookings = async (currentFilter) => {
		try {
			const res = await getData1({ technicianId, filter: currentFilter });
			if (res?.EC === 0 && res?.DT) {
				setAllBookings(res.DT);
				setDisplayedBookings(res.DT.slice(0, ITEMS_PER_PAGE));
				setPage(1);
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

	const handleLoadMore = () => {
		const nextPage = page + 1;
		const start = (nextPage - 1) * ITEMS_PER_PAGE;
		const end = start + ITEMS_PER_PAGE;
		setDisplayedBookings(prev => [...prev, ...allBookings.slice(start, end)]);
		setPage(nextPage);
	};

	useEffect(() => {
		fetchBookings(filter);
	}, [filter]);

	return (
		<div className="container py-5 row">
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
					<div className={selectedBooking ? "col-8" : "col-12"}>
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
											onSelect={(booking_id) => fetchBookingDetail(booking_id)}
										/>
									</motion.div>
								))}
							</AnimatePresence>
						</div>

						<LoadMore
							hasMore={displayedBookings.length < allBookings.length}
							onLoadMore={handleLoadMore}
						/>
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
		</div>
	);
};

export default TechnicianRepairBookingListPage;
