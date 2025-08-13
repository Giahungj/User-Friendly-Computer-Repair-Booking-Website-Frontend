import { Skeleton, Box, Button } from "@mui/material";

function BookingDetailSkeleton() {
	return (
		<Box className="container py-5">
			<Box className="card shadow-sm border-0 p-3 mb-4">
				{/* Header */}
				<Box
					className="card-header border-0 rounded text-white text-center"
					sx={{ backgroundColor: "#2196f3", p: 2 }}
				>
					<Skeleton variant="text" width={200} height={30} sx={{ bgcolor: "rgba(255,255,255,0.4)" }} />
					<Skeleton variant="text" width={150} height={40} sx={{ bgcolor: "rgba(255,255,255,0.4)", mx: "auto" }} />
					<Skeleton variant="text" width={250} height={20} sx={{ bgcolor: "rgba(255,255,255,0.4)", mx: "auto" }} />
					<Skeleton variant="rectangular" width={120} height={30} sx={{ bgcolor: "rgba(255,255,255,0.4)", mx: "auto", mt: 1, borderRadius: 2 }} />
				</Box>

				{/* Nội dung */}
				<Box className="card-body">
					{/* Thiết bị */}
					<Box className="card border p-2 mb-4">
						<Skeleton variant="text" width={180} height={25} />
						<Skeleton variant="text" width="60%" height={20} />
						<Skeleton variant="text" width="50%" height={20} />
						<Skeleton variant="text" width="70%" height={20} />
						<Skeleton variant="rectangular" width="100%" height={150} sx={{ mt: 2 }} />
					</Box>

					{/* Khách hàng */}
					<Box className="card border p-2 mb-4">
						<Skeleton variant="text" width={180} height={25} />
						<Skeleton variant="text" width="50%" height={20} />
						<Skeleton variant="text" width="60%" height={20} />
						<Skeleton variant="text" width="40%" height={20} />
					</Box>

					{/* Kỹ thuật viên */}
					<Box className="card border p-2 mb-4">
						<Skeleton variant="text" width={180} height={25} />
						<Box sx={{ display: "flex", gap: 2 }}>
							<Skeleton variant="circular" width={60} height={60} />
							<Box sx={{ flex: 1 }}>
								<Skeleton variant="text" width="50%" height={20} />
								<Skeleton variant="text" width="70%" height={20} />
								<Skeleton variant="text" width="60%" height={20} />
							</Box>
						</Box>
					</Box>

					{/* Cửa hàng */}
					<Box className="card border p-2 mb-4">
						<Skeleton variant="text" width={180} height={25} />
						<Skeleton variant="rectangular" width="100%" height={150} />
						<Skeleton variant="text" width="50%" height={20} />
						<Skeleton variant="text" width="70%" height={20} />
					</Box>

					{/* Nút */}
					<Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
						<Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 5 }} />
						<Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 5 }} />
						<Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 5 }} />
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default BookingDetailSkeleton;
