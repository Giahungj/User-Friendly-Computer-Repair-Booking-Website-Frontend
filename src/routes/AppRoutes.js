import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

// Layouts
import CustomerHome from '../components/Homes/CHome.js';
import StoreManagerHome from '../components/Homes/SHome.js';
import TechnicianHome from '../components/Homes/THome.js';

// Pages
import TrangChu from '../components/About/TrangChu';
import About from '../components/About/About';
import TestColorPage from '../components/commons/TestColorPage.js';
import NotFound from '../components/NotFound/NotFound';

// Auth/Profile
import ForgotPassword from '../components/ForgotPassword/ForgotPassword';
import VerifyOTP from '../components/ForgotPassword/VerifyOTP';
import ResetPassword from '../components/Profile/ResetPassword';
import ChangePassword from '../components/Profile/ChangePassword';
import UserProfile from '../components/Profile/UserProfile';
import UpdateProfile from '../components/Profile/UpdateProfile';

// Customer Bookings
import BookingCreateStep1 from '../components/CustomerInterfaces/Bookings/BookingCreateStep1.js';
import BookingCreateStep2 from '../components/CustomerInterfaces/Bookings/BookingCreateStep2.js';
import CustomerBookingListPage from '../components/CustomerInterfaces/Bookings/CustomerBookingListPage.js';
import BookingDetailPage from '../components/CustomerInterfaces/Bookings/BookingDetailPage/BookingDetailPage.js';

// Customer Views
import TechnicianListPage from '../components/CustomerInterfaces/Technicians/TechnicianListPage.js';
import TechnicianDetailPage from '../components/CustomerInterfaces/Technicians/TechnicianDetailPage.js';
import StoreListPage from '../components/CustomerInterfaces/Stores/StoreListPage.js';
import StoreDetailPage from '../components/CustomerInterfaces/Stores/StoreDetailPage.js';
import SpecialtyListPage from '../components/CustomerInterfaces/Specialties/SpecialtyListPage';

// Store Manager
import WorkSchedulePage from '../components/StoreManagerInterfaces/WorkScheduleManagerPage/WorkSchedulePage.js';
import TechnicianManagerPage from '../components/StoreManagerInterfaces/TechnicianManagerPage/TechnicaianManagerPage.js';
import BookingManagerPage from '../components/StoreManagerInterfaces/BookingManagerPage/BookingManagerPage.js';
import ManagerBookingDetailPage from '../components/StoreManagerInterfaces/BookingManagerPage/BookingDetailPage.js';
import StatisticsPage from '../components/StoreManagerInterfaces/StatisticPages/StatisticsPage.js';
import ReassignTechnicianPage from '../components/StoreManagerInterfaces/BookingManagerPage/ReassignTechnicianPage.js';

// Technician Interface
import TechnicianDashboardPage from '../components/TechnicianInterfaces/Dashboard/TechnicianDashboardPage.js';
import TechnicianRepairBookingListPage from '../components/TechnicianInterfaces/RepairBookings/TechnicianRepairBookingListPage.js';
import TechnicianSchedulePage from '../components/TechnicianInterfaces/WorkSchedules/TechnicianSchedulePage.js';
import TechnicianScheduleDetailPage from '../components/TechnicianInterfaces/WorkSchedules/TechnicianScheduleDetailPage.js';
import TechnicianProfilePage from '../components/TechnicianInterfaces/Profile/TechnicianProfilePage.js';
import TechnicianReviewsPage from '../components/TechnicianInterfaces/Reviews/TechnicianReviewsPage.js';

// Route Guards
import PrivateRoutes from './PrivateRoutes';
import PrivateStoreManagerRoutes from './PrivateStoreManagerRoutes.js';
import PrivateTechnicianRoutes from './PrivateTechnicianRoutes.js';

const AppRoutes = () => (
    <Routes>
        {/* Customer Layout */}
        <Route path="/" element={<CustomerHome />}>
            <Route index element={<TrangChu />} />
            <Route path="gioi-thieu/ve-chung-toi" element={<About />} />

            {/* Customer Browsing */}
            <Route path="ky-thuat-vien/tat-ca" element={<TechnicianListPage />} />
            <Route path="ky-thuat-vien/:id/chi-tiet" element={<TechnicianDetailPage />} />
            <Route path="cua-hang/tat-ca" element={<StoreListPage />} />
            <Route path="cua-hang/:storeId/chi-tiet" element={<StoreDetailPage />} />
            <Route path="chuyen-muc/tat-ca" element={<SpecialtyListPage />} />

            {/* Protected Customer Routes */}
            <Route element={<PrivateRoutes />}>
                <Route path="dat-lich/:workScheduleId/tao-lich" element={<BookingCreateStep1 />} />
                <Route path="dat-lich/kiem-tra-thong-tin" element={<BookingCreateStep2 />} />
                <Route path="dat-lich/khach-hang/:userId/danh-sach" element={<CustomerBookingListPage />} />
                <Route path="dat-lich/:bookingId/thong-tin/chi-tiet" element={<BookingDetailPage />} />
                <Route path="dat-lich/:bookingId/thong-tin/huy-lich-hen" element={<BookingDetailPage />} />
                <Route path="dat-lich/:bookingId/thong-tin/cap-nhat-thong-tin" element={<BookingDetailPage />} />

                <Route path="profile/:email" element={<UserProfile />} />
                <Route path="profile/update-profile" element={<UpdateProfile />} />
                <Route path="profile/change-password" element={<ChangePassword />} />
            </Route>

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
        </Route>

        {/* Store Manager Layout */}
        <Route element={<PrivateStoreManagerRoutes />}>
            <Route path="/" element={<StoreManagerHome />}>
                <Route path="cua-hang-truong/ky-thuat-vien/danh-sach" element={<TechnicianManagerPage />} />
                <Route path="cua-hang-truong/don-dat-lich/danh-sach" element={<BookingManagerPage />} />
                <Route path="cua-hang-truong/don-dat-lich/:repair_booking_id/chi-tiet" element={<ManagerBookingDetailPage />} />
                <Route path="cua-hang-truong/don-dat-lich/:repair_booking_id/doi-nguoi-sua-chua" element={<ReassignTechnicianPage />} />
                <Route path="cua-hang-truong/lich-lam-viec/danh-sach" element={<WorkSchedulePage />} />
                <Route path="cua-hang-truong/bao-cao" element={<StatisticsPage />} />
            </Route>
        </Route>

        {/* Technician Layout */}
        <Route element={<PrivateTechnicianRoutes />}>
            <Route path="/ky-thuat-vien" element={<TechnicianHome />}>
                <Route path="dashboard" element={<TechnicianDashboardPage />} />
                <Route path="don-dat-lich/danh-sach" element={<TechnicianRepairBookingListPage />} />
                <Route path="lich-lam-viec" element={<TechnicianSchedulePage />} />
                <Route path="lich-lam-viec/:work_schedule_id/chi-tiet" element={<TechnicianScheduleDetailPage />} />
                <Route path="ho-so" element={<TechnicianProfilePage />} />
                <Route path="danh-gia" element={<TechnicianReviewsPage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Route>

        {/* Standalone Routes */}
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
        <Route path="reset-password" element={<ResetPassword />} />

        <Route path="test" element={<TestColorPage />} />
    </Routes>
);

export default AppRoutes;
