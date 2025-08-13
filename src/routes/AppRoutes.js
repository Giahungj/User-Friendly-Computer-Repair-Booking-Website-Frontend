import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

// Trang chính
import CustomerHome from '../components/Homes/CHome.js';
import TrangChu from '../components/About/TrangChu';
import About from '../components/About/About';
import NotFound from '../components/NotFound/NotFound';

// Quản lý người dùng
import ForgotPassword from '../components/ForgotPassword/ForgotPassword';
import VerifyOTP from '../components/ForgotPassword/VerifyOTP';
import ResetPassword from '../components/Profile/ResetPassword';
import ChangePassword from '../components/Profile/ChangePassword';
import UserProfile from '../components/Profile/UserProfile';
import UpdateProfile from '../components/Profile/UpdateProfile';

// Quản lý lịch hẹn
import BookingCreateStep1 from '../components/CustomerInterfaces/Bookings/BookingCreateStep1.js';
import BookingCreateStep2 from '../components/CustomerInterfaces/Bookings/BookingCreateStep2.js';
import CustomerBookingListPage from '../components/CustomerInterfaces/Bookings/CustomerBookingListPage.js';
import BookingDetailPage from '../components/CustomerInterfaces/Bookings/BookingDetailPage/BookingDetailPage.js';

// Quản lý kỹ thuật viên
import TechnicianListPage from '../components/CustomerInterfaces/Technicians/TechnicianListPage.js';
import TechnicianDetailPage from '../components/CustomerInterfaces/Technicians/TechnicianDetailPage.js';

// Quản lý cửa hàng
import StoreListPage from '../components/CustomerInterfaces/Stores/StoreListPage.js';

// Quản lý chuyên mục
import SpecialtyListPage from '../components/CustomerInterfaces/Specialties/SpecialtyListPage';

// Bảo vệ đường dẫn
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = () => {
	return (
		<Routes>
			{/* Các route nằm trong layout Home */}
			<Route path="/" element={<CustomerHome />}>
				<Route index element={<TrangChu />} />
				<Route path="/about" element={<About />} />
				
				<Route path="/ky-thuat-vien/tat-ca" element={<TechnicianListPage />} />
				<Route path="/ky-thuat-vien/:id/chi-tiet" element={<TechnicianDetailPage />} />

				<Route path="/cua-hang/tat-ca" element={<StoreListPage />} />
				<Route path="/chuyen-muc/tat-ca" element={<SpecialtyListPage />} />
				{/* <Route path="/chuyen-muc/:id/chi-tiet" element={<SpecialtyDetailPage />} /> */}

				{/* Routes bảo mật */}
				<Route element={<PrivateRoutes />}>
					<Route path="/dat-lich/:workScheduleId/tao-lich" element={<BookingCreateStep1 />} />
					<Route path="/dat-lich/kiem-tra-thong-tin" element={<BookingCreateStep2 />} />
					<Route path="/dat-lich/khach-hang/:userId/danh-sach" element={<CustomerBookingListPage />} />
					<Route path="/dat-lich/:bookingId/thong-tin/chi-tiet" element={<BookingDetailPage />} />
					<Route path="/dat-lich/:bookingId/thong-tin/huy-lich-hen" element={<BookingDetailPage />} />
					<Route path="/dat-lich/:bookingId/thong-tin/cap-nhat-thong-tin" element={<BookingDetailPage />} />

					<Route path="/profile/:email" element={<UserProfile />} />
					<Route path="/profile/update-profile" element={<UpdateProfile />} />
					<Route path="/profile/change-password" element={<ChangePassword />} />
				</Route>

				<Route path="*" element={<NotFound />} />
			</Route>

			{/* Các route không cần layout Home */}
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/verify-otp" element={<VerifyOTP />} />
			<Route path="/reset-password" element={<ResetPassword />} />
		</Routes>
	);
};

export default AppRoutes;
