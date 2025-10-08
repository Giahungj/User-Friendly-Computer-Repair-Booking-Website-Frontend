import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import TabAuthComponent from '../Auths/TabAuthComponent';
import TabAuthInternal from '../Auths/TabAuthInternal';

import { Sheet } from '@mui/joy';
import { Button, Badge, Menu, MenuItem, Avatar, Box, Divider, Typography } from '@mui/material';
import {
	AccountCircleOutlined,
	HistoryOutlined,
	EventNoteOutlined,
	NotificationsNoneOutlined,
	SettingsOutlined,
	DashboardOutlined,
	StorefrontOutlined,
	HelpOutlineOutlined,
	Logout
} from '@mui/icons-material';

const Header = () => {
	const navigate = useNavigate();
	const { auth, logoutContext, showLogin, setShowLogin, showInternalLogin, setShowInternalLogin, notifications, setNotifications } = useContext(AuthContext);
	const [anchorElNoti, setAnchorElNoti] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	// Badge số thông báo chưa đọc
	const unreadCount = notifications.filter(n => !n.isRead).length;

	// Khi click vào thông báo, có thể mark as read
	const handleClickNotification = (noti) => {
		setAnchorElNoti(null);
		// mark notification as read
		setNotifications(prev => prev.map(n => n.id === noti.id ? { ...n, isRead: true } : n));
		navigate(noti.action);
	};

	const handleNavigate = (path) => {
		window.location.href = path;
		setAnchorElUser(null);
	};

	const renderUserMenu = () => (
		<>
			<Button onClick={(e) => setAnchorElNoti(e.currentTarget)}>
				<Badge badgeContent={unreadCount > 9 ? '9+' : unreadCount} color="error">
					<NotificationsNoneOutlined sx={{ color: '#2196f3' }} />
				</Badge>
			</Button>

			<Menu anchorEl={anchorElNoti} open={Boolean(anchorElNoti)} onClose={() => setAnchorElNoti(null)}>
                {notifications.length > 0 ? notifications.map((noti) => (
                    <MenuItem
						key={noti.id}
						onClick={() => handleClickNotification(noti)}
						sx={{
							width: 320,
							whiteSpace: 'normal',
							alignItems: 'flex-start',
							py: 1.5,
							px: 2,
							gap: 1,
							backgroundColor: noti.isRead ? '#fff' : '#e3f2fd',
							borderLeft: noti.isRead ? '4px solid transparent' : '4px solid #2196f3',
						}}
					>
						<Box sx={{ fontSize: 14, color: '#333', fontWeight: noti.isRead ? 400 : 600 }}>
							{noti.message}
						</Box>
					</MenuItem>
                )) : (
                    <MenuItem disabled sx={{ width: 320, justifyContent: 'center', color: '#888' }}>
                        Không có thông báo
                    </MenuItem>
                )}
            </Menu>

			<div className="d-flex align-items-center gap-2">
				<span className='text-dark'>
					{
						auth?.user?.role === "store_manager" ? "Quản lý" :
						auth?.user?.role === "technician" ? "Kỹ thuật viên" :
						auth?.user?.role === "customer" ? "Khách hàng" :
						"Không xác định"
					} - {auth?.user?.name || "Người dùng"}
				</span>
				<Button onClick={(e) => setAnchorElUser(e.currentTarget)}>
					<Avatar
						alt={auth?.user?.name || 'Người dùng'}
						src={auth?.user?.avatar ? `http://localhost:8080/images/uploads/${auth.user.avatar}` : '/default-avatar.jpg'}
						sx={{ width: 40, height: 40 }}
					/>
				</Button>
			</div>

			<Menu
				anchorEl={anchorElUser}
				open={Boolean(anchorElUser)}
				onClose={() => setAnchorElUser(null)}
				PaperProps={{
					elevation: 3,
					sx: {
						borderRadius: 1,
						minWidth: 220,
						py: 1,
					},
				}}
				MenuListProps={{
					dense: true,
				}}
			>
				<Typography variant="caption" className="px-3 text-muted">Tài khoản</Typography>
				<MenuItem onClick={() => handleNavigate(`/profile/${auth.user.email}`)}>
					<AccountCircleOutlined fontSize="small" sx={{ mr: 1 }} /> Thông tin cá nhân
				</MenuItem>
				<MenuItem onClick={() => handleNavigate('/settings')}>
					<SettingsOutlined fontSize="small" sx={{ mr: 1 }} /> Cài đặt
				</MenuItem>
				<MenuItem onClick={() => handleNavigate('/support')}>
					<HelpOutlineOutlined fontSize="small" sx={{ mr: 1 }} /> Hỗ trợ
				</MenuItem>

				{/* Menu cho role */}
				{auth.user.role === "technician" && (
					<>
						<Divider />
						<MenuItem onClick={() => handleNavigate("/ky-thuat-vien/dashboard")}>
							<DashboardOutlined fontSize="small" sx={{ mr: 1 }} /> Trang kỹ thuật viên
						</MenuItem>
					</>
				)}

				{auth.user.role === "store_manager" && (
					<>
						<Divider />
						<MenuItem onClick={() => handleNavigate("/cua-hang-truong/ky-thuat-vien/danh-sach")}>
							<StorefrontOutlined fontSize="small" sx={{ mr: 1 }} /> Trang quản lý cửa hàng
						</MenuItem>
					</>
				)}

				{/* Nhóm: Lịch hẹn */}
				<Divider />
				<Typography variant="caption" className="px-3 text-muted">Lịch hẹn</Typography>
				<MenuItem onClick={() => handleNavigate(`/dat-lich/khach-hang/${auth.user.user_id}/danh-sach`)}>
					<EventNoteOutlined fontSize="small" sx={{ mr: 1 }} /> Lịch sửa chữa của tôi
				</MenuItem>
				<MenuItem onClick={() => handleNavigate(`/dat-lich/khach-hang/${auth.user.user_id}/danh-sach?status=completed`)}>
					<HistoryOutlined fontSize="small" sx={{ mr: 1 }} /> Lịch sử & Hoàn thành
				</MenuItem>
				<MenuItem onClick={() => handleNavigate(`/dat-lich/khach-hang/${auth.user.user_id}/danh-sach?status=pending`)}>
					<HistoryOutlined fontSize="small" sx={{ mr: 1 }} /> Chờ duyệt
				</MenuItem>

				
					
				{/* Logout */}
				<Divider />
				<MenuItem
					onClick={() => {
						setAnchorElUser(null);
						logoutContext();
					}}
					sx={{
						fontWeight: 'bold',
						color: '#ef5350',
						'&:hover': {
							bgcolor: 'rgba(239, 83, 80, 0.08)',
						},
					}}
				>
					<Logout fontSize="small" sx={{ mr: 1 }} /> Đăng xuất
				</MenuItem>
			</Menu>
		</>
	);

	const renderLoginButton = () => (
		<>
			<Button variant="text" onClick={() => setShowInternalLogin(true)} sx={{ borderRadius: '50px', border: '1px solid #b3e5fc' }}>
				Truy cập Quản lý & Kỹ thuật
			</Button>
			<Button variant="text" onClick={() => setShowLogin(true)} sx={{ borderRadius: '50px', border: '1px solid #b3e5fc' }}>
				Đăng nhập
			</Button>

			{showLogin && (
				<div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content border-0" style={{ borderRadius: '2em' }}>
							<TabAuthComponent />
							<div className="modal-footer px-3">
								<Button onClick={() => setShowLogin(false)} variant="contained" sx={{
									bgcolor: '#2196f3', borderRadius: '50px', fontWeight: 'bold', color: '#fff',
									'&:hover': { bgcolor: '#1976d2' }
								}}>
									Đóng
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}

			{showInternalLogin && (
				<div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content border-0 overflow-hidden" style={{ borderRadius: '2em' }}>
							<TabAuthInternal />
							<div className="modal-footer px-3">
								<Button onClick={() => setShowInternalLogin(false)} variant="contained" sx={{
									bgcolor: '#757575', borderRadius: '50px', color: '#fff',
									'&:hover': { bgcolor: '#757575' }
								}}>
									Đóng
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)

	return (
		<Sheet
			variant="solid"
			invertedColors
			sx={{ display: 'flex', alignItems: 'center', py: 0, px: 4, background: '#fff', borderBottom: '1px solid #ccc' }}
		>
			<h1 
				style={{ 
					color: '#2196f3', 
					fontWeight: '700', 
					fontSize: '2rem', 
					letterSpacing: '1px', 
				}}
			>
				TechFix
			</h1>
			<Box sx={{ flexGrow: 1, display: 'flex', gap: 0, px: 2 }}>
				{[
                    { label: 'Trang chủ', path: '/' },
                    { label: 'Chuyên mục', path: '/chuyen-muc/tat-ca' },
                    { label: 'Video', path: '/videos' },
                    { label: 'Kỹ thuật viên', path: '/ky-thuat-vien/tat-ca' },
                    { label: 'Cửa hàng', path: '/cua-hang/tat-ca' },
                    { label: 'Giới thiệu', path: '/gioi-thieu/ve-chung-toi' }
                ].map((item, i) => (
                    <NavLink key={i} to={item.path}>
                        {({ isActive }) => (
                            <Button
                                variant="text"
                                size="md"
                                sx={{
                                    color: '#333',
                                    textTransform: 'none',
                                    ...(isActive && {
                                        fontWeight: 'bold',
                                        color: 'white',
                                        backgroundColor: '#607d8b',
                                    }),
                                }}
                            >
                                {item.label}
                            </Button>
                        )}
                    </NavLink>
                ))}
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				{auth?.isAuthenticated ? renderUserMenu() : renderLoginButton()}
			</Box>
		</Sheet>
	);
};


export default Header;