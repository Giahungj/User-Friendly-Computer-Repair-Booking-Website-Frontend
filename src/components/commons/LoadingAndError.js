import { CircularProgress, Alert, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

export const Loading = () => {
	return (
		<Box
			component={motion.div}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="d-flex justify-content-center align-items-center vh-100 flex-column"
		>
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ type: "spring", stiffness: 100 }}
			>
				<CircularProgress color="primary" size={70} />
			</motion.div>
			<Typography
				variant="subtitle1"
				color="text.secondary"
				sx={{ mt: 2 }}
				component={motion.div}
				initial={{ y: 10, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
			>
				Đang tải dữ liệu...
			</Typography>
		</Box>
	);
};

export const Error = ({ message = "Vui lòng thử lại sau." }) => {
	return (
		<Box
			component={motion.div}
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			className="d-flex justify-content-center align-items-center vh-100"
		>
			<motion.div
				initial={{ scale: 0.8 }}
				animate={{ scale: 1 }}
				transition={{ type: "spring", stiffness: 120 }}
			>
				<Alert severity="error" variant="filled" sx={{ p: 3, minWidth: 320 }}>
					<Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
						Đã xảy ra lỗi!
					</Typography>
					<Typography variant="body2">{message}</Typography>
				</Alert>
			</motion.div>
		</Box>
	);
};

export default { Loading, Error };
