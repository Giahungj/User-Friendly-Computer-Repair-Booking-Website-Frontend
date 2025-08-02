import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

// Trang test
import TestComponent from "../components/TestComponent";
import TestHeaderConmponent from "../components/TestHeaderConmponent";
import TestDeviceListComponent from "../components/TestDeviceListComponent";
import TestBookingFormComponent from "../components/TestBookingFormComponent";

// Trang chính
import Home from '../components/Home/Home';
import TrangChu from '../components/About/TrangChu';
import About from '../components/About/About';
import NotFound from '../components/NotFound/NotFound';
import Search from '../components/Search/Search';

// Quản lý người dùng
// import Login from '../components/Login/Login';
import ForgotPassword from '../components/ForgotPassword/ForgotPassword';
import VerifyOTP from '../components/ForgotPassword/VerifyOTP';
import ResetPassword from '../components/Profile/ResetPassword';
import ChangePassword from '../components/Profile/ChangePassword';
import UserProfile from '../components/Profile/UserProfile';
import UpdateProfile from '../components/Profile/UpdateProfile';

// Đặt lịch sửa chữa
import ConfirmBooking from '../components/Booking/ConfirmBooking';
import BookingDetail from '../components/Booking/BookingDetail';
import BookingsHistory from '../components/Booking/BookingsHistory';
import BookingHistoryDetail from '../components/Booking/BookingHistoryDetail';
import UpcomingBookings from '../components/Booking/UpcomingBookings';

// Quản lý lịch hẹn
import BookingCreateStep1 from '../components/Booking/BookingCreates/BookingCreateStep1';
import BookingCreateStep2 from '../components/Booking/BookingCreates/BookingCreateStep2';
import BookingConfirm from '../components/Booking/BookingConfirm';
import BookingStatus from '../components/Booking/BookingStatus';
import BookingInfo from '../components/Booking/BookingInfo';
import BookingCompleted from '../components/Booking/BookingCompleted';
import TechnicianListPage from '../components/Technicians/TechnicianListPage';
import TechnicianDetailPage from '../components/Technicians/TechnicianDetailPage';
import StoreList from '../components/Stores/StoreList';
import SpecialtyListPage from '../components/CustomerInterfaces/Specialties/SpecialtyListPage';

// Bảo vệ đường dẫn
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = () => {
	return (
		<Routes>
			{/* Các route nằm trong layout Home */}
			<Route path="/" element={<Home />}>
				<Route index element={<TrangChu />} />
				<Route path="/search" element={<Search />} />
				<Route path="/about" element={<About />} />
				
				<Route path="/ky-thuat-vien/tat-ca" element={<TechnicianListPage />} />
				<Route path="/ky-thuat-vien/:id/chi-tiet" element={<TechnicianDetailPage />} />

				<Route path="/cua-hang/tat-ca" element={<StoreList />} />
				<Route path="/chuyen-muc/tat-ca" element={<SpecialtyListPage />} />
				{/* <Route path="/chuyen-muc/:id/chi-tiet" element={<SpecialtyDetailPage />} /> */}

				{/* Routes bảo mật */}
				<Route element={<PrivateRoutes />}>
					{/* <Route path="/booking/confirm" element={<ConfirmBooking />} /> */}
					<Route path="/booking/detail/:bookingId" element={<BookingDetail />} />
					<Route path="/bookings/history" element={<BookingsHistory />} />
					<Route path="/bookings/history/:bookingId" element={<BookingHistoryDetail />} />
					<Route path="/bookings/upcoming" element={<UpcomingBookings />} />

					<Route path="/dat-lich/:workScheduleId/tao-lich" element={<BookingCreateStep1 />} />
					<Route path="/dat-lich/tao-buoc-2" element={<BookingCreateStep2 />} />
					<Route path="/booking/confirm" element={<BookingConfirm />} />
					<Route path="/booking/status" element={<BookingStatus />} />
					<Route path="/booking/info/:id" element={<BookingInfo />} />
					<Route path="/booking/completed" element={<BookingCompleted />} />

					<Route path="/profile/:email" element={<UserProfile />} />
					<Route path="/profile/update-profile" element={<UpdateProfile />} />
					<Route path="/profile/change-password" element={<ChangePassword />} />
				</Route>

				<Route path="*" element={<NotFound />} />
			</Route>

			{/* Các route không cần layout Home */}
			{/* <Route path="/login" element={<Login />} /> */}
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/verify-otp" element={<VerifyOTP />} />
			<Route path="/reset-password" element={<ResetPassword />} />

			{/* Các route test giao diện */}
			<Route path="/test" element={<TestComponent />} />
			<Route path="/test-header" element={<TestHeaderConmponent />} />
			<Route path="/test-card-service" element={<TestDeviceListComponent />} />
			<Route path="/test-booking-form" element={<TestBookingFormComponent />} />
		</Routes>
	);
};

export default AppRoutes;
