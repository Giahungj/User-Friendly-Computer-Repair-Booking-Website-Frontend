import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { fetchNotifications, markAsReadNotification } from '../../services/AuthService';
import { toast } from 'react-toastify';
import SearchBar from '../Search/SearchBar';
import { Sheet } from '@mui/joy';
import { Button, Box, Badge, Menu, MenuItem, Avatar, CircularProgress } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';
import './Nav.scss';
import { AccountCircleOutlined, LockOutlined, HistoryOutlined, EventNoteOutlined, LocalHospitalOutlined } from '@mui/icons-material';
// import useSocket from '../../hook/useSocket';

const NavHeader = () => {
    const { auth, logoutContext } = useContext(AuthContext);
    // const socketRef = useSocket(auth?.account?.id);
    const location = useLocation();
    const navigate = useNavigate();
    
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [anchorElNoti, setAnchorElNoti] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (auth?.isAuthenticated) {
            getNotifications();
        }
    }, [auth?.isAuthenticated]);

    const getNotifications = async () => {
        if (!auth?.account?.id) {
            toast.warning("Không tìm thấy ID tài khoản, không thể lấy thông báo.");
            return;
        }
       
        try {
            setLoading(true);
            const response = await fetchNotifications(auth.account.id);
            if (response.EC === 0) {
                setNotifications(response.DT);
                const unread = response.DT.reduce(
                    (sum, n) => sum + (n.isRead ? 0 : 1),
                    0
                );
                setUnreadCount(unread);
            }
        } catch (error) {
            console.error('Lỗi khi lấy thông báo:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReadNotification = async (notificationId) => {
        try {
            await markAsReadNotification(notificationId);
            setUnreadCount((prevCount) => Math.max(prevCount - 1, 0));
        } catch (error) {
            console.error('Lỗi khi đọc thông báo:', error);
        }
    };
    
    // Lắng nghe các sự kiện thông báo mới qua socket
    // useEffect(() => {
    //     if (!socketRef.current) return;
    //     const socket = socketRef.current;

    //     const handleNewNotification = (noti) => {
    //         setNotifications((prev) => [noti, ...prev]);
    //         setUnreadCount((count) => count + 1);
    //         toast.info('Bạn có thông báo mới!');
    //     };

    //     socket.on('new-notification', handleNewNotification);

    //     return () => {
    //         socket.off('new-notification', handleNewNotification);
    //     };
    // }, [socketRef]);

    // Nếu đang tải thông báo
    // if (loading) {
    //     return (
    //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //             <CircularProgress size="lg" />
    //         </Box>
    //     );
    // }

    if (location.pathname === '/login' && location.pathname === '/register') return null;

    return (
        <>
            <Sheet
                variant="solid"
                invertedColors
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexGrow: 1,
                    py: 1,
                    px: 4,
                    borderRadius: { xs: 0, sm: 'sm' },
                    background: 'linear-gradient(to left, #81d4fa, #01579b, #81d4fa)',
                }}
                >
                <h1 className="fw-bold">SKIBIDI</h1>
                <Box sx={{ flexGrow: 1, display: 'flex', gap: 0, px: 5 }}>
                    <Button variant="text" color="neutral" size="md" component={NavLink} to="/">Trang chủ</Button>
                    <Button variant="text" color="neutral" size="md" component={NavLink} to="/doctors">Bác sĩ</Button>
                    <Button variant="text" color="neutral" size="md" component={NavLink} to="/facilities">Phòng khám</Button>
                    <Button variant="text" color="neutral" size="md" component={NavLink} to="/specialties">Chuyên khoa</Button>
                    <Button variant="text" color="neutral" size="md" component={NavLink} to="/about">Giới thiệu</Button>
                </Box>
                
                <SearchBar />

                <Box sx={{ display: 'flex', flexShrink: 0, gap: 0, alignItems: 'center' }}>
                    {auth?.isAuthenticated ? (
                        <>
                            <Button onClick={(e) => setAnchorElNoti(e.currentTarget)}>
                                <Badge badgeContent={unreadCount > 9 ? (`9+`) : (unreadCount)} color="error">
                                    <NotificationsNoneIcon className="text-white" />
                                </Badge>
                            </Button>
                            <Menu anchorEl={anchorElNoti} open={Boolean(anchorElNoti)} onClose={() => setAnchorElNoti(null)}>
                                {notifications.length > 0 ? (
                                    notifications.map((noti) => (
                                        <MenuItem key={noti.id}
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

                            <Button onClick={(e) => setAnchorElUser(e.currentTarget)}>
                                <Avatar
                                    alt={auth?.account?.name || 'Người dùng'}
                                    src={auth?.account?.avatar ? `http://localhost:8080/images/uploads/${auth.account.avatar}` : '/default-avatar.jpg'}
                                    sx={{ width: 40, height: 40, bgcolor: "#1565c0" }}
                                />
                            </Button>

                            <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={() => setAnchorElUser(null)}>
                                <MenuItem onClick={() => { navigate(`/profile/${auth?.account?.email}`); setAnchorElUser(null); }}>
                                    {auth.account.name}
                                </MenuItem>
                                <MenuItem onClick={() => { navigate(`/profile/${auth?.account?.email}`); setAnchorElUser(null); }}>
                                    <AccountCircleOutlined sx={{ marginRight: 1 }} /> Thông tin cá nhân
                                </MenuItem>
                                <MenuItem onClick={() => { navigate('/profile/change-password'); setAnchorElUser(null); }}>
                                    <LockOutlined sx={{ marginRight: 1 }} /> Đổi mật khẩu
                                </MenuItem>
                                <MenuItem onClick={() => { navigate('/bookings/history'); setAnchorElUser(null); }}>
                                    <HistoryOutlined sx={{ marginRight: 1 }} /> Xem lịch sử khám
                                </MenuItem>
                                <hr className="m-0" />
                                {auth?.account?.userType === 'doctor' ? (
                                    <MenuItem
                                        sx={{ color: '#0097a7' }}
                                        onClick={() => {
                                            {auth?.account?.serviceId === 0 
                                                ?  navigate(`/doctor/service-pricing`) 
                                                : navigate(`/doctor/manager-booking/bookings-today/${auth?.account?.id}`)
                                            };
                                            setAnchorElUser(null);
                                        }}
                                    >
                                        <EventNoteOutlined sx={{ mr: 1 }} />
                                        Quản lý của bác sĩ
                                    </MenuItem>
                                ) : (
                                    <>
                                        <MenuItem
                                            onClick={() => {
                                                navigate('/bookings/upcoming');
                                                setAnchorElUser(null);
                                            }}
                                        >
                                            <EventNoteOutlined sx={{ mr: 1 }} />
                                            Lịch hẹn sắp tới
                                        </MenuItem>

                                        <MenuItem
                                            onClick={() => {
                                                navigate('/doctors/visited');
                                                setAnchorElUser(null);
                                            }}
                                        >
                                            <LocalHospitalOutlined sx={{ mr: 1 }} />
                                            Bác sĩ từng khám
                                        </MenuItem>
                                    </>
                                )}
                                <hr className="m-0"/>
                                <MenuItem onClick={() => { logoutContext(); navigate('/login'); setAnchorElUser(null); }} sx={{ fontWeight: 'bold', color: '#ef5350' }}>
                                    <LogoutIcon sx={{ marginRight: 1 }} /> Đăng xuất
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button variant="outlined" onClick={() => navigate('/login')}>Đăng nhập</Button>
                        </>
                    )}
                </Box>
            </Sheet>
        </>
    );
};

export default NavHeader;