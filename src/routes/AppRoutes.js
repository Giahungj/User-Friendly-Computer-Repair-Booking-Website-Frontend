import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

// Trang test
import TestComponent from "../components/TestComponent"
// Trang chính
import Home from '../components/Home/Home';
import TrangChu from '../components/About/TrangChu';
import DoctorHome from '../components/Home/DoctorHome';
import About from '../components/About/About';
import NotFound from '../components/NotFound/NotFound';
import Search from '../components/Search/Search';

// Quản lý người dùng
import Login from '../components/Login/Login';
import ForgotPassword from '../components/ForgotPassword/ForgotPassword';
import VerifyOTP from '../components/ForgotPassword/VerifyOTP';
import ResetPassword from '../components/Profile/ResetPassword';
import ChangePassword from '../components/Profile/ChangePassword';
import RegisterPatient from '../components/Register/RegisterPatient';
import RegisterDoctor from '../components/Register/RegisterDoctor';
import RegisterDoctorStep1 from '../components/Register/RegisterDoctorStep1';
import RegisterDoctorStep2 from '../components/Register/RegisterDoctorStep2';
import RegisterDoctorStep3 from '../components/Register/RegisterDoctorStep3';
import RegisterDoctorStep4 from '../components/Register/RegisterDoctorStep4';
import RegisterDoctorStep5 from '../components/Register/RegisterDoctorStep5';
import Users from '../components/Users/Users'; 
import UserProfile from '../components/Profile/UserProfile'; 
import UpdateProfile from '../components/Profile/UpdateProfile'; 
// import UpdateEmail from '../components/Profile/UpdateEmail'; 
// import UpdatePhone from '../components/Profile/UpdatePhone'; 

// ===============================================================================================
// ===============================================================================================
// ===============================================================================================
// Hệ thống bác sĩ
import DoctorBookingsToday from "../components/Booking/DoctorBookingsToday"
import DoctorPatientManager from "../components/Patients/DoctorManagerPatient"
import DoctorScheduleForm from "../components/DoctorViews/Schedules/DoctorScheduleForm"
import DoctorScheduleManager from "../components/DoctorViews/Schedules/DoctorManagerSchedule"
import DoctorUpdateScheduleForm from "../components/DoctorViews/Schedules/DoctorUpdateScheduleForm"
import DoctorPayments from "../components/DoctorViews/Payments/DoctorPayments"
import DoctorDetailPayment from "../components/DoctorViews/Payments/DoctorDetailPayment"

import DoctorServicePricing from "../components/DoctorViews/Payments/DoctorServicePricing"
import DoctorServiceManagement from "../components/DoctorViews/Payments/DoctorServiceManagement"

import DoctorBookingHistory from "../components/DoctorViews/Bookings/DoctorBookingHistory"
import DoctorBookingHistoryDetail from "../components/DoctorViews/Bookings/DoctorBookingHistoryDetail"
import StatiscalMain from "../components/DoctorViews/Statistical/StatiscalMain"

import DoctorSpecialtyAndFacility from "../components/DoctorViews/DoctorSpecialtyAndFacility"
// ===============================================================================================
import NotAllow from "../components/NotFound/NotAlow"
// ===============================================================================================
// ===============================================================================================

// Bác sĩ
import DoctorList from '../components/Doctors/Doctors';
import DoctorDetail from '../components/Doctors/DoctorDetail';
import VisitedDoctors from '../components/Doctors/VisitedDoctors ';

// Phòng khám
import FacilityList from '../components/Facilities/FacilityList';
import FacilityDetail from '../components/Facilities/FacilityDetail';

// Chuyên khoa
import SpecialtyList from '../components/Specialties/SpecialtyList';
import SpecialtyDetail from '../components/Specialties/SpecialtyDetail';

// Đặt lịch hẹn
import ConfirmBooking from '../components/Booking/ConfirmBooking';
import BookingDetail from '../components/Booking/BookingDetail';
import BookingsHistory from '../components/Booking/BookingsHistory';
import BookingHistoryDetail from '../components/Booking/BookingHistoryDetail';

import UpcomingBookings from '../components/Booking/UpcomingBookings';

// Bảo vệ đường dẫn
import PrivateRoutes from './PrivateRoutes';
import PrivateDoctorRoutes from './PrivateDoctorRoutes';
// import ResetPassword from '../components/Profile/ResetPassword';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Các route nằm trong layout Home bác sĩ */}
            <Route path="/doctor" element={<DoctorHome />}>
                {/* Routes bảo mật */}
                <Route element={<PrivateDoctorRoutes />}>
                    {/* Schedule-related routes */}
                    <Route path="manager-schedule/:id" element={<DoctorScheduleManager />} />
                    <Route path="register-schedule/:id" element={<DoctorScheduleForm />} />
                    <Route path="update-schedule/:scheduleId/:userId/:date" element={<DoctorUpdateScheduleForm />} />

                    {/* Booking-related route */}
                    <Route path="/doctor/manager-booking/bookings-today/:id" element={<DoctorBookingsToday />} />
                    <Route path="/doctor/manager-booking/bookings-upcoming/:id" element={<DoctorBookingsToday />} />

                    <Route path="/doctor/manager-booking/booking-history" element={<DoctorBookingHistory />} />
                    <Route path="/doctor/manager-booking/booking-history/detail/:bookingId" element={<DoctorBookingHistoryDetail />} />

                    {/* Doctor management routes */}
                    <Route path="/doctor/patient-manager/:doctorId" element={<DoctorPatientManager />} />
                    <Route path="/doctor/payments" element={<DoctorPayments />} />
                    <Route path="/doctor/payments/detail/:paymentId" element={<DoctorDetailPayment />} />
                    <Route path="/doctor/statistical" element={<StatiscalMain />} />
                    <Route path="/doctor/specialty-facility" element={<DoctorSpecialtyAndFacility />} />

                    {/* Doctor service route */}
                    <Route path="/doctor/service-pricing" element={<DoctorServicePricing />} />
                    <Route path="/doctor/service-management" element={<DoctorServiceManagement />} />
                    {/* <Route path="confirm-and-update/:bookingId/:patientId/:date" element={<ConfirmVisitCompletionForm />} /> */}
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>
            {/* Các route nằm trong layout Home */}
            <Route path="/" element={<Home />}>
                <Route index element={<TrangChu />} />
                <Route path="/search" element={<Search />} />
                <Route path="/not-allow" element={<NotAllow />} />
                <Route path="/about" element={<About />} />
                <Route path="/doctors" element={<DoctorList />} />
                <Route path="/doctors/:id" element={<DoctorDetail />} />
                <Route path="/facilities" element={<FacilityList />} />
                <Route path="/facilities/:id" element={<FacilityDetail />} />
                <Route path="/specialties" element={<SpecialtyList />} />
                <Route path="/specialties/:id" element={<SpecialtyDetail />} />
                {/* Routes bảo mật */}
                <Route element={<PrivateRoutes />}>
                    <Route path="/bookings/history" element={<BookingsHistory />} />
                    <Route path="/bookings/history/:bookingId" element={<BookingHistoryDetail />} />
                    <Route path="/bookings/upcoming" element={<UpcomingBookings />} />
                    <Route path="/booking/:bookingId" element={<BookingDetail />} />
                    <Route path="/doctors/visited" element={<VisitedDoctors />} />
                    <Route path="/confirm-booking" element={<ConfirmBooking />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/profile/:email" element={<UserProfile />} />
                    <Route path="/profile/update-profile" element={<UpdateProfile />} />
                    {/* <Route path="/profile/update-email" element={<UpdateEmail />} /> */}
                    {/* <Route path="/profile/update-phone" element={<UpdatePhone />} /> */}
                    <Route path="/profile/change-password" element={<ChangePassword />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>
            {/* Các route không nằm trong layout Home */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            <Route path="/register" element={<RegisterPatient />} />
            <Route path="/register-doctor" element={<RegisterDoctor />}>
                <Route index element={<RegisterDoctorStep1 />} />
                <Route path="step1" element={<RegisterDoctorStep1 />} />
                <Route path="step2" element={<RegisterDoctorStep2 />} />
                <Route path="step3" element={<RegisterDoctorStep3 />} />
                <Route path="step4" element={<RegisterDoctorStep4 />} />
                <Route path="step5" element={<RegisterDoctorStep5 />} />
            </Route>
            {/* Các route dùng để Test giao diện */}
            <Route path="/test" element={<TestComponent />} />
        </Routes>
    );
};

export default AppRoutes;
