// ActionButtons.js
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const colors = {
	primary: "#415A77",
	dark: "#1B263B",
	lightDark: "#0D1B2A",
	accent: "#778DA9",
	bg: "#E0E1DD",
	danger: "#D9534F",
	success: "#4CAF50",
	warning: "#F4B400",
};

const baseStyle = {
	textTransform: "none",
	borderRadius: 2,
	fontWeight: "bold",
	display: "flex",
	alignItems: "center",
	gap: 1,
	transition: "all 0.3s ease",
};

// Helper function
const createButton = (icon, defaultText, bgColor, hoverColor, textColor = colors.bg) => ({
	onClick,
	disabled = false,
	type = "button",
	size = "large",
	children,
	sx = {},
}) => {
	const isSmall = size === "small";
	return (
		<Button
			variant="contained"
			onClick={onClick}
			disabled={disabled}
			type={type}
			size={size}
			startIcon={icon}
			sx={{
				...baseStyle,
				backgroundColor: bgColor,
				color: textColor,
				"&:hover": { backgroundColor: hoverColor },
				...sx,
			}}
		>
			{!isSmall && (children || defaultText)}
		</Button>
	);
};

// Buttons
export const AddButton = createButton(
	<AddIcon fontSize="small" />,
	"Thêm",
	colors.accent,
	colors.primary
);

export const ConfirmButton = createButton(
	<CheckCircleOutlineIcon fontSize="small" />,
	"Xác nhận",
	colors.success,
	"#388E3C"
);

export const CloseButton = createButton(
	<CloseIcon fontSize="small" />,
	"Đóng",
	colors.lightDark,
	colors.dark
);

export const DeleteButton = createButton(
	<DeleteOutlineIcon fontSize="small" />,
	"Xóa",
	colors.danger,
	"#C9302C"
);

export const EditButton = createButton(
	<EditOutlinedIcon fontSize="small" />,
	"Sửa",
	colors.primary,
	colors.dark
);

export const DetailButton = createButton(
	<InfoOutlinedIcon fontSize="small" />,
	"Chi tiết",
	colors.accent,
	colors.primary
);

export const FilterButton = createButton(
	<FilterListIcon fontSize="small" />,
	"Lọc",
	colors.primary,
	colors.dark
);

export const SearchButton = createButton(
	<SearchOutlinedIcon fontSize="small" />,
	"Tìm kiếm",
	colors.accent,
	colors.primary
);

export const FileButton = createButton(
	<InsertDriveFileOutlinedIcon fontSize="small" />,
	"Tệp tin",
	colors.primary,
	colors.dark
);

export const BackButton = createButton(
	<ArrowBackIcon fontSize="small" />,
	"Quay lại",
	colors.lightDark,
	colors.primary
);

export const LoginButton = createButton(
	<LoginIcon fontSize="small" />,
	"Đăng nhập",
	colors.primary,
	colors.dark
);

export const LogoutButton = createButton(
	<LogoutIcon fontSize="small" />,
	"Đăng xuất",
	colors.primary,
	colors.dark
);

export const RegisterButton = createButton(
	<AppRegistrationIcon fontSize="small" />,
	"Đăng ký",
	colors.primary,
	colors.dark
);
