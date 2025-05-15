import React, { useContext, useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchNotifications, markAsReadNotification } from '../../services/AuthService';

import Nav from 'react-bootstrap/Nav';

import { Button, Box, Avatar, Badge, Menu, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Payment, EmojiEventsOutlined, SignalCellularAltOutlined, LocalHospitalOutlined, HistoryOutlined, CalendarMonthOutlined, AddCircleOutline } from '@mui/icons-material';
import SearchBar from '../Search/SearchBarDoctor';
import { AuthContext } from '../../context/AuthContext';

const DoctorNavHeader = () => {
    const { auth, logoutContext } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const userId = auth.account.id
    const doctorId = auth.account.doctorId;

    // State cho thông báo và menu người dùng
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [anchorElNoti, setAnchorElNoti] = useState(null); // Menu thông báo
    const [anchorElUser, setAnchorElUser] = useState(null); // Menu người dùng
    const [anchorElSchedule, setAnchorElSchedule] = useState(null); // Menu quản lý lịch làm việc
    const [anchorElPayment, setAnchorElPayment] = useState(null); // Menu quản lý lịch làm việc

    // Memo hóa trạng thái mở menu
    const openNoti = useMemo(() => Boolean(anchorElNoti), [anchorElNoti]);
    const openUser = useMemo(() => Boolean(anchorElUser), [anchorElUser]);
    const openSchedule = useMemo(() => Boolean(anchorElSchedule), [anchorElSchedule]);
    const openPayment = useMemo(() => Boolean(anchorElPayment), [anchorElPayment]);

    useEffect(() => {
        const getNotifications = async () => {
            try {
                const response = await fetchNotifications(auth.account.id);
                if (response.EC === 0) {
                    setNotifications(response.DT);
                    setUnreadCount(response.DT.reduce((count, noti) => count + (noti.isRead ? 0 : 1), 0));
                } else {
                    console.warn("Lỗi lấy thông báo:", response.EM);
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông báo:', error);
            }
        };
        
        getNotifications()
    }, [auth.account.id]);

    // Xử lý khi người dùng đọc thông báo
    const handleReadNotification = async (notificationId) => {
        try {
            await markAsReadNotification(notificationId);
            setUnreadCount((prevCount) => Math.max(prevCount - 1, 0));
        } catch (error) {
            console.error('Lỗi khi đọc thông báo:', error);
        }
    };

    // Xử lý sự kiện mở/đóng menu
    const handleClickNoti = (event) => setAnchorElNoti(event.currentTarget);
    const handleCloseNoti = () => setAnchorElNoti(null);
    const handleClickUser = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUser = () => setAnchorElUser(null);
    const handleClickSchedule = (event) => setAnchorElSchedule(event.currentTarget);
    const handleCloseSchedule = () => setAnchorElSchedule(null);
    const handleClickPayment = (event) => setAnchorElPayment(event.currentTarget);
    const handleClosePayment = () => setAnchorElPayment(null);

    const handleLogout = () => {
        logoutContext();
        navigate('/login');
    };

    if (location.pathname === "/login" || location.pathname === "/register") return null;

    return (
        <Box className="py-2 d-flex text-white" sx={{ background: 'linear-gradient(to left, #b0bec5, #01579b, #b0bec5)' }}>
            <span className="fw-bold text-white fs-2 px-5">SKIBIDI</span>
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 0 }}>
                <Button sx={{ color: '#fff' }} onClick={() => { navigate(`/`)}}>Trang chủ</Button>
                <Button sx={{ color: '#fff' }} onClick={() => { navigate(`/doctor/manager-booking/bookings-today/${userId}`)}}>Lịch hẹn hôm nay</Button>
                <Button sx={{ color: '#fff' }} onClick={() => { navigate(`/doctor/patient-manager/${doctorId}`)}}>Quản lý bệnh nhân</Button>
                <Button sx={{ color: '#fff' }} onClick={handleClickSchedule}>Quản lý lịch làm việc</Button>
                <Button sx={{ color: '#fff' }} onClick={handleClickPayment} startIcon={<Payment />}>Thanh toán</Button>
                <Menu anchorEl={anchorElSchedule} open={openSchedule} onClose={handleCloseSchedule}>
                    <MenuItem onClick={() => { navigate(`/doctor/manager-schedule/${userId}`); handleCloseSchedule(); }}>
                        <CalendarMonthOutlined className="me-2" /> Lịch làm việc
                    </MenuItem>
                    <MenuItem onClick={() => { navigate(`/doctor/register-schedule/${userId}`); handleCloseSchedule(); }}>
                        <AddCircleOutline className="me-2" /> Đăng ký lịch mới
                    </MenuItem>
                </Menu>
                <Menu anchorEl={anchorElPayment} open={openPayment} onClose={handleClosePayment}>
                    <MenuItem onClick={() => { navigate(`/doctor/payments`); handleClosePayment(); }}>
                        <Payment className="me-2" />  Thanh toán của bệnh nhân
                    </MenuItem>
                    <MenuItem onClick={() => { navigate(`/doctor/service-pricing`); handleClosePayment(); }}>
                    <LocalHospitalOutlined className="me-2" /> Đăng ký dịch vụ
                    </MenuItem>
                    <MenuItem onClick={() => { navigate(`/doctor/service-management`); handleClosePayment(); }}>
                        <HistoryOutlined className="me-2" /> Quản lý gói
                    </MenuItem>
                </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <SearchBar doctorId={doctorId} />
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
                {auth && auth.isAuthenticated && auth.account.userType === "doctor" ? (
                    <>
                        {/* Menu thông báo */}
                        <Button onClick={handleClickNoti}>
                            <Badge badgeContent={unreadCount > 9 ? (`9+`) : (unreadCount)} color="error">
                                <NotificationsNoneIcon className="text-white" />
                            </Badge>
                        </Button>
                        <Menu
                            id="notification-menu"
                            anchorEl={anchorElNoti}
                            open={openNoti}
                            onClose={handleCloseNoti}
                            MenuListProps={{ 'aria-labelledby': 'notification-button' }}
                        >
                           {notifications.length > 0 ? (
                                notifications.map((noti) => (
                                    <MenuItem
                                        key={noti.id}
                                        className={noti.isRead === 0 ? "" : "text-muted"}
                                        onClick={() => {
                                            setAnchorElNoti(null);
                                            handleReadNotification(noti.id);
                                            if (noti.action) navigate(noti.action);
                                        }}
                                        sx={{ width: "300px", whiteSpace: "normal", padding: "12px" }}
                                    >
                                        {noti.message || "Thông báo mới"}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem onClick={() => setAnchorElNoti(null)}>Không có thông báo</MenuItem>
                            )}
                        </Menu>
                        {/* Hiển thị thông tin người dùng */}
                        <Button onClick={handleClickUser}>
                            <Avatar alt={auth.account.name} sx={{ width: 40, height: 40, bgcolor: "#616161" }}
                                src={
                                    auth.account.avatar
                                    ? `http://localhost:8080/images/uploads/${auth.account.avatar}`
                                    : '/default-avatar.jpg'
                                }
                            />
                        </Button>
                        <Menu id="user-menu" anchorEl={anchorElUser} open={openUser} onClose={handleCloseUser}>
                            <MenuItem onClick={() => { navigate(`/profile/${auth.account.email}`); handleCloseUser(); }}>
                                {auth.account.name}
                            </MenuItem>
                            {auth.account.serviceId === 0 ? (
                                <>
                                    <MenuItem onClick={() => { navigate(`/doctor/service-pricing`); handleCloseUser(); }}>
                                        Đăng ký dịch vụ
                                    </MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem onClick={() => { navigate(`/doctor/service-management`); handleCloseUser(); }}>
                                        <EmojiEventsOutlined
                                        className={`me-2 ${
                                            auth.account.serviceId === 2
                                                ? 'text-primary'
                                                : auth.account.serviceId === 3
                                                ? 'text-warning'
                                                : ''
                                        }`}/>Bạn đang sử dụng dịch vụ {auth.account.serviceId}
                                    </MenuItem>
                                </>
                            )}
                            <MenuItem onClick={() => { navigate(`/profile/${auth.account.email}`); handleCloseUser(); }}>
                                Thông tin cá nhân
                            </MenuItem>
                                <MenuItem onClick={() => { navigate('/profile/change-password'); handleCloseUser(); }}>
                                Đổi mật khẩu
                            </MenuItem>
                            <MenuItem onClick={() => { navigate(`/doctor/manager-schedule/${userId}`); handleCloseUser(); }}>
                                Cập nhật lịch làm việc
                            </MenuItem>

                            <hr className='m-0' />

                            <MenuItem onClick={() => { navigate(`/doctor/specialty-facility`); handleCloseUser(); }}>
                                <LocalHospitalOutlined className="me-2" /> Thông tin chuyên môn
                            </MenuItem>
                            <MenuItem onClick={() => { navigate(`/doctor/statistical`); handleCloseUser(); }}>
                                <SignalCellularAltOutlined className="me-2" /> Thống kê
                            </MenuItem>
                            <MenuItem onClick={() => { navigate(`/doctor/manager-booking/booking-history`); handleCloseUser(); }}>
                                <HistoryOutlined className="me-2" /> Lịch sử khám
                            </MenuItem>

                            <hr className='m-0' />

                            <MenuItem onClick={handleLogout} sx={{ fontWeight: 'bold', color: '#ef5350' }}>
                                <LogoutIcon className="me-2" />Đăng xuất
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <>
                        <Nav.Item>
                            <Nav.Link href="/login" className="btn btn-light hover:scale-110 fw-bold text-success px-3">
                                Đăng nhập
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/register-doctor/step1" className="ms-2 btn btn-outline-light hover:scale-110 fw-bold px-3">
                                Đăng ký
                            </Nav.Link>
                        </Nav.Item>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default DoctorNavHeader;
