import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import TabAuthInternal from '../Auths/TabAuthInternal';
import notificationService from '../../services/notificationService';

import { Sheet } from '@mui/joy';
import { Button, Badge, Menu, MenuItem, Avatar, Box, Divider, Typography } from '@mui/material';
import {
	PeopleAltOutlined,
	Inventory2Outlined,
	BarChartOutlined,
	NotificationsNoneOutlined,
	SettingsOutlined,
	HelpOutlineOutlined,
	Logout
} from '@mui/icons-material';

const StoreManagerHeader = () => {
	const navigate = useNavigate();
	const { auth, logoutContext, notifications, setNotifications } = useContext(AuthContext);
	const [anchorElNoti, setAnchorElNoti] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const unreadCount = Array.isArray(notifications)
	? notifications.filter(n => !n.is_read).length
	: 0;

	const handleNavigate = (path) => {
		window.location.href = path;
		setAnchorElUser(null);
	};

	// Khi click vào thông báo, có thể mark as read
	const handleClickNotification = async (noti) => {
		setAnchorElNoti(null);
		// mark notification as read
		setNotifications(prev => prev.map(n => n.notification_id === noti.notification_id ? { ...n, is_read: true } : n));
		await notificationService.handlearkAsReadNotifications(noti.notification_id)
		navigate(noti.action);
	};

	const renderUserMenu = () => (
		<>
			<Button onClick={(e) => setAnchorElNoti(e.currentTarget)}>
				<Badge badgeContent={unreadCount > 9 ? '9+' : unreadCount} color="error">
					<NotificationsNoneOutlined sx={{ color: '#778DA9' }} />
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
							backgroundColor: noti.is_read ? '#fff' : '#e8eaf6',
							borderLeft: noti.is_read ? '4px solid transparent' : '4px solid #3f51b5',
						}}
					>
						<Box sx={{ fontSize: 14, color: '#333', fontWeight: noti.is_read ? 400 : 600 }}>
							{noti.message}
						</Box>
					</MenuItem>
				)) : (
					<MenuItem disabled sx={{ width: 320, justifyContent: 'center', color: '#888' }}>
						Không có thông báo
					</MenuItem>
				)}
			</Menu>

			<Button onClick={(e) => setAnchorElUser(e.currentTarget)}>
				<Avatar
					alt={auth?.user?.name || 'Quản lý'}
					src={auth?.user?.avatar ? `http://localhost:8080/images/uploads/${auth.user.avatar}` : '/default-avatar.jpg'}
					sx={{ width: 40, height: 40 }}
				/>
			</Button>

			<Menu
				anchorEl={anchorElUser}
				open={Boolean(anchorElUser)}
				onClose={() => setAnchorElUser(null)}
				PaperProps={{
					elevation: 3,
					sx: { borderRadius: 1, minWidth: 220, py: 1 },
				}}
				MenuListProps={{ dense: true }}
			>
				<MenuItem disabled>{auth?.user?.name}</MenuItem>
				<Divider />
				<Typography variant="caption" className="px-3 text-muted">Quản lý</Typography>
				<MenuItem onClick={() => handleNavigate('/cua-hang-truong/ky-thuat-vien/danh-sach')}>
					<PeopleAltOutlined fontSize="small" sx={{ mr: 1 }} /> Quản lý kỹ thuật viên
				</MenuItem>
				<MenuItem onClick={() => handleNavigate('/cua-hang-truong/don-dat-lich/danh-sach')}>
					<Inventory2Outlined fontSize="small" sx={{ mr: 1 }} /> Quản lý đơn hàng
				</MenuItem>
				<MenuItem onClick={() => handleNavigate('/cua-hang-truong/bao-cao')}>
					<BarChartOutlined fontSize="small" sx={{ mr: 1 }} /> Thống kê & báo cáo
				</MenuItem>

				<Divider />
				<MenuItem onClick={() => handleNavigate('/store-manager/settings')}>
					<SettingsOutlined fontSize="small" sx={{ mr: 1 }} /> Cài đặt
				</MenuItem>
				<MenuItem onClick={() => handleNavigate('/store-manager/support')}>
					<HelpOutlineOutlined fontSize="small" sx={{ mr: 1 }} /> Hỗ trợ
				</MenuItem>

				<Divider />
				<MenuItem
					onClick={() => {
						setAnchorElUser(null);
						logoutContext();
					}}
					sx={{
						fontWeight: 'bold',
						color: '#ef5350',
						'&:hover': { bgcolor: 'rgba(239, 83, 80, 0.08)' },
					}}
				>
					<Logout fontSize="small" sx={{ mr: 1 }} /> Đăng xuất
				</MenuItem>
			</Menu>
		</>
	);

	return (
		<Sheet
		variant="solid"
		invertedColors
		sx={{
			display: "flex",
			alignItems: "center",
			py: 0,
			px: 4,
			background: "#1B263B", // dark
			borderBottom: "2px solid #415A77", // primary
			color: "#E0E1DD", // bg
		}}
	>
		<h1
			style={{
				color: "#E0E1DD",
				fontWeight: "700",
				fontSize: "2rem",
				letterSpacing: "1px",
			}}
		>
			Trường Thịnh Group Manager
		</h1>

		<Box sx={{ flexGrow: 1, display: "flex", gap: 0, px: 2 }}>
			<NavLink to="/cua-hang-truong" end>
				{({ isActive }) => (
					<Button
						variant="text"
						size="md"
						sx={{
							color: isActive ? "#E0E1DD" : "#778DA9",
							textTransform: "none",
							borderBottom: isActive ? "3px solid #415A77" : "3px solid transparent",
							borderRadius: 0,
							fontWeight: isActive ? "bold" : 400,
							backgroundColor: isActive ? "#0D1B2A" : "transparent",
							"&:hover": { backgroundColor: "#415A77", color: "#E0E1DD" },
						}}
					>
						Trang chủ
					</Button>
				)}
			</NavLink>

			<NavLink to="/cua-hang-truong/ky-thuat-vien/danh-sach">
				{({ isActive }) => (
					<Button
						variant="text"
						size="md"
						sx={{
							color: isActive ? "#E0E1DD" : "#778DA9",
							textTransform: "none",
							borderBottom: isActive ? "3px solid #415A77" : "3px solid transparent",
							borderRadius: 0,
							fontWeight: isActive ? "bold" : 400,
							backgroundColor: isActive ? "#0D1B2A" : "transparent",
							"&:hover": { backgroundColor: "#415A77", color: "#E0E1DD" },
						}}
					>
						Kỹ thuật viên
					</Button>
				)}
			</NavLink>

			<NavLink to="/cua-hang-truong/don-dat-lich/danh-sach">
				{({ isActive }) => (
					<Button
						variant="text"
						size="md"
						sx={{
							color: isActive ? "#E0E1DD" : "#778DA9",
							textTransform: "none",
							borderBottom: isActive ? "3px solid #415A77" : "3px solid transparent",
							borderRadius: 0,
							fontWeight: isActive ? "bold" : 400,
							backgroundColor: isActive ? "#0D1B2A" : "transparent",
							"&:hover": { backgroundColor: "#415A77", color: "#E0E1DD" },
						}}
					>
						Đơn hàng
					</Button>
				)}
			</NavLink>

			<NavLink to="/cua-hang-truong/lich-lam-viec/danh-sach">
				{({ isActive }) => (
					<Button
						variant="text"
						size="md"
						sx={{
							color: isActive ? "#E0E1DD" : "#778DA9",
							textTransform: "none",
							borderBottom: isActive ? "3px solid #415A77" : "3px solid transparent",
							borderRadius: 0,
							fontWeight: isActive ? "bold" : 400,
							backgroundColor: isActive ? "#0D1B2A" : "transparent",
							"&:hover": { backgroundColor: "#415A77", color: "#E0E1DD" },
						}}
					>
						Lịch làm việc
					</Button>
				)}
			</NavLink>

			<NavLink to="/cua-hang-truong/don-dat-lich/danh-sach">
				{({ isActive }) => (
					<Button
						variant="text"
						size="md"
						sx={{
							color: isActive ? "#E0E1DD" : "#778DA9",
							textTransform: "none",
							borderBottom: isActive ? "3px solid #415A77" : "3px solid transparent",
							borderRadius: 0,
							fontWeight: isActive ? "bold" : 400,
							backgroundColor: isActive ? "#0D1B2A" : "transparent",
							"&:hover": { backgroundColor: "#415A77", color: "#E0E1DD" },
						}}
					>
						Báo cáo
					</Button>
				)}
			</NavLink>

			<div>
				<Button
					variant="text"
					size="md"
					onClick={(e) => setAnchorEl(e.currentTarget)}
					sx={{
						color: "#778DA9",
						textTransform: "none",
						borderRadius: 0,
						"&:hover": { backgroundColor: "#415A77", color: "#E0E1DD" },
					}}
				>
					Màu
				</Button>
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={() => setAnchorEl(null)}
					MenuListProps={{ "aria-labelledby": "basic-button" }}
				>
					<MenuItem style={{ backgroundColor: "#40429bff" }} onClick={() => setAnchorEl(null)}>
						<NavLink to="#" style={{ textDecoration: "none", color: "#f8fafc", backgroundColor: "#6366f1" }}>
							Màu chính: (nút, link, tiêu đề) nhẹ hơn, bớt chói
						</NavLink>
					</MenuItem>
					<MenuItem style={{ backgroundColor: "#40429bff" }} onClick={() => setAnchorEl(null)}>
						<NavLink to="#" style={{ textDecoration: "none", color: "#f8fafc", backgroundColor: "#14b8a6" }}>
							Màu phụ: phần phụ, badge, icon, highlight
						</NavLink>
					</MenuItem>
					<MenuItem style={{ backgroundColor: "#40429bff" }} onClick={() => setAnchorEl(null)}>
						<NavLink to="#" style={{ textDecoration: "none", color: "#f8fafc", backgroundColor: "#1e293b" }}>
							Màu đen: chữ chính, viền, header, sidebar
						</NavLink>
					</MenuItem>
					<MenuItem style={{ backgroundColor: "#40429bff" }} onClick={() => setAnchorEl(null)}>
						<NavLink to="#" style={{ textDecoration: "none", color: "#1e293b", backgroundColor: "#f1f5f9" }}>
							Màu nền chính: nền trang, card, vùng trống
						</NavLink>
					</MenuItem>
					<MenuItem style={{ backgroundColor: "#40429bff" }} onClick={() => setAnchorEl(null)}>
						<NavLink to="#" style={{ textDecoration: "none", color: "#1e293b", backgroundColor: "#f8fafc" }}>
							Màu nền phụ: nền phụ sáng hơn, tạo lớp phân tách nhẹ
						</NavLink>
					</MenuItem>
				</Menu>
			</div>
		</Box>

		<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
			{auth?.isAuthenticated && renderUserMenu()}
		</Box>
	</Sheet>

	);
};

export default StoreManagerHeader;
