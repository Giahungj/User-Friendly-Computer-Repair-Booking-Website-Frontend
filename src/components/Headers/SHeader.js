import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import TabAuthInternal from '../Auths/TabAuthInternal';

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
	const { auth, logoutContext } = useContext(AuthContext);
	const [anchorElNoti, setAnchorElNoti] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const notifications = [
		{ id: 1, message: 'Kỹ thuật viên A vừa hoàn thành đơn hàng.', isRead: false, action: '/store-manager/orders/completed' },
		{ id: 2, message: 'Kho hàng sắp hết linh kiện B.', isRead: false, action: '/store-manager/inventory' },
		{ id: 3, message: 'Có báo cáo mới từ hệ thống.', isRead: true, action: '/store-manager/reports' }
	];
	const unreadCount = notifications.filter(n => !n.isRead).length;

	const handleNavigate = (path) => {
		window.location.href = path;
		setAnchorElUser(null);
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
						onClick={() => {
							setAnchorElNoti(null);
							navigate(noti.action);
						}}
						sx={{
							width: 320,
							whiteSpace: 'normal',
							alignItems: 'flex-start',
							py: 1.5,
							px: 2,
							gap: 1,
							backgroundColor: noti.isRead ? '#fff' : '#e8eaf6',
							borderLeft: noti.isRead ? '4px solid transparent' : '4px solid #3f51b5',
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
			{[
				{ label: "Trang chủ", path: "/cua-hang-truong", end: true },
				{ label: "Kỹ thuật viên", path: "/cua-hang-truong/ky-thuat-vien/danh-sach" },
				{ label: "Đơn hàng", path: "/cua-hang-truong/don-dat-lich/danh-sach" },
				{ label: "Lịch làm việc", path: "/cua-hang-truong/lich-lam-viec/danh-sach" },
				{ label: "Báo cáo", path: "/cua-hang-truong/bao-cao" },
			].map((item, i) => (
				<NavLink key={i} to={item.path} end={item.end}>
					{({ isActive }) => (
						<Button
							variant="text"
							size="md"
							sx={{
								color: isActive ? "#E0E1DD" : "#778DA9", // active sáng, inactive accent
								textTransform: "none",
								borderBottom: isActive
									? "3px solid #415A77"
									: "3px solid transparent",
								borderRadius: 0,
								fontWeight: isActive ? "bold" : 400,
								backgroundColor: isActive ? "#0D1B2A" : "transparent",
								"&:hover": {
									backgroundColor: "#415A77",
									color: "#E0E1DD",
								},
							}}
						>
							{item.label}
						</Button>
					)}
				</NavLink>
			))}
		</Box>

		<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
			{auth?.isAuthenticated && renderUserMenu()}
		</Box>
	</Sheet>

	);
};

export default StoreManagerHeader;
