import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

// Layouts
import CustomerHome from '../components/Homes/CHome.js';
import StoreManagerHome from '../components/Homes/SHome.js';

// Common Pages
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

// Booking Management
import BookingCreateStep1 from '../components/CustomerInterfaces/Bookings/BookingCreateStep1.js';
import BookingCreateStep2 from '../components/CustomerInterfaces/Bookings/BookingCreateStep2.js';
import CustomerBookingListPage from '../components/CustomerInterfaces/Bookings/CustomerBookingListPage.js';
import BookingDetailPage from '../components/CustomerInterfaces/Bookings/BookingDetailPage/BookingDetailPage.js';

// Technician Management
import TechnicianListPage from '../components/CustomerInterfaces/Technicians/TechnicianListPage.js';
import TechnicianDetailPage from '../components/CustomerInterfaces/Technicians/TechnicianDetailPage.js';

// Store Management
import StoreListPage from '../components/CustomerInterfaces/Stores/StoreListPage.js';

// Specialty Management
import SpecialtyListPage from '../components/CustomerInterfaces/Specialties/SpecialtyListPage';

// Store Manager Interfaces
import WorkSchedulePage from '../components/StoreManagerInterfaces/WorkScheduleManagerPage/WorkSchedulePage.js';
import TechnicianManagerPage from '../components/StoreManagerInterfaces/TechnicianManagerPage/TechnicaianManagerPage.js';
import BookingManagerPage from '../components/StoreManagerInterfaces/BookingManagerPage/BookingManagerPage.js';

// Route Guards
import PrivateRoutes from './PrivateRoutes';
import PrivateStoreManagerRoutes from './PrivateStoreManagerRoutes.js';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Customer Layout Routes */}
            <Route path="/" element={<CustomerHome />}>
                <Route index element={<TrangChu />} />
                <Route path="/about" element={<About />} />

                {/* Technician Routes */}
                <Route path="/ky-thuat-vien/tat-ca" element={<TechnicianListPage />} />
                <Route path="/ky-thuat-vien/:id/chi-tiet" element={<TechnicianDetailPage />} />

                {/* Store Routes */}
                <Route path="/cua-hang/tat-ca" element={<StoreListPage />} />

                {/* Specialty Routes */}
                <Route path="/chuyen-muc/tat-ca" element={<SpecialtyListPage />} />

                {/* Protected Routes */}
                <Route element={<PrivateRoutes />}>
                    {/* Booking Routes */}
                    <Route path="/dat-lich/:workScheduleId/tao-lich" element={<BookingCreateStep1 />} />
                    <Route path="/dat-lich/kiem-tra-thong-tin" element={<BookingCreateStep2 />} />
                    <Route path="/dat-lich/khach-hang/:userId/danh-sach" element={<CustomerBookingListPage />} />
                    <Route path="/dat-lich/:bookingId/thong-tin/chi-tiet" element={<BookingDetailPage />} />
                    <Route path="/dat-lich/:bookingId/thong-tin/huy-lich-hen" element={<BookingDetailPage />} />
                    <Route path="/dat-lich/:bookingId/thong-tin/cap-nhat-thong-tin" element={<BookingDetailPage />} />

                    {/* Profile Routes */}
                    <Route path="/profile/:email" element={<UserProfile />} />
                    <Route path="/profile/update-profile" element={<UpdateProfile />} />
                    <Route path="/profile/change-password" element={<ChangePassword />} />
                </Route>

                {/* Not Found */}
                <Route path="*" element={<NotFound />} />
            </Route>

            {/* Store Manager Layout Routes */}
            <Route element={<PrivateStoreManagerRoutes />}>
                <Route path="/" element={<StoreManagerHome />}>
						<Route path="cua-hang-truong/ky-thuat-vien/danh-sach" element={<TechnicianManagerPage />} />
						<Route path="cua-hang-truong/don-dat-lich/danh-sach" element={<BookingManagerPage />} />
						<Route path="cua-hang-truong/lich-lam-viec/danh-sach" element={<WorkSchedulePage />} />
						<Route path="cua-hang-truong/bao-cao" element={<WorkSchedulePage />} />
                </Route>
            </Route>

            {/* Standalone Routes */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
    );
};

export default AppRoutes;
