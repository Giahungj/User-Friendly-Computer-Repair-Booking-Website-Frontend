import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { CardMedia, Typography, CardActionArea, CardContent, TextField, InputAdornment, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const StyledButton = styled(Button)(({ variantColor }) => ({
	backgroundColor: 'transparent',
	color: variantColor === 'light' ? '#2196f3' : '#ffffff',
	borderRadius: 6,
	padding: '8px 16px',
	textTransform: 'none',
	fontWeight: 500,
	border: `2px solid ${variantColor === 'light' ? '#2196f3' : '#ffffff'}`,
	'&:hover': {
		backgroundColor: variantColor === 'light' ? '#2196f3' : '#ffffff',
		color: variantColor === 'light' ? '#ffffff' : '#000000',
		borderColor: variantColor === 'light' ? '#1976d2' : '#000000',
		boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
	},
	'&:focus': {
		outline: '2px solid #63b3ed',
	},
}));

const ViewMoreButton = ({ to, onClick, children, variant = 'light', ...props }) => {
	const navigate = useNavigate();

	const handleClick = (e) => {
		if (onClick) onClick(e);
		if (to) navigate(to);
	};

	return (
		<StyledButton onClick={handleClick} variantColor={variant} {...props}>
			{children}
		</StyledButton>
	);
};

const fakeTechnicians = [
	{ id: 1, name: "Nguyen Van A", phone: "0909123456", email: "a@example.com", specialties: ["Điện", "Điều hòa"], avatar: "https://cdn.pixabay.com/photo/2016/11/21/16/27/laptop-1846277_1280.jpg" },
	{ id: 2, name: "Tran Thi B", phone: "0912345678", email: "b@example.com", specialties: ["Nước", "Điện"], avatar: "https://cdn.pixabay.com/photo/2016/11/21/16/27/laptop-1846277_1280.jpg" },
	{ id: 3, name: "Le Van C", phone: "0923456789", email: "c@example.com", specialties: ["Điện tử", "Máy tính"], avatar: "https://cdn.pixabay.com/photo/2016/11/21/16/27/laptop-1846277_1280.jpg" },
	{ id: 4, name: "Pham Thi D", phone: "0934567890", email: "d@example.com", specialties: ["Điện lạnh", "Điều hòa"], avatar: "https://cdn.pixabay.com/photo/2016/11/21/16/27/laptop-1846277_1280.jpg" },
];

const fakeStores = [
	{ 
		id: 1, 
		name: "Cửa hàng A", 
		address: "123 Đường Lê Lợi, TP.HCM", 
		phone: "0909123456", 
		email: "storea@example.com",
		storeImage: "https://cdn.pixabay.com/photo/2016/11/21/16/27/laptop-1846277_1280.jpg"
	},
	{ 
		id: 2, 
		name: "Cửa hàng B", 
		address: "456 Đường Trần Hưng Đạo, TP.HCM", 
		phone: "0912345678", 
		email: "storeb@example.com",
		storeImage: "https://cdn.pixabay.com/photo/2017/08/30/01/12/computer-2695568_1280.jpg"
	},
];

const features = [
	{
		title: "Xem kỹ thuật viên",
		desc: "Tra cứu thông tin và chuyên môn các kỹ thuật viên",
        src: "https://cdn.pixabay.com/photo/2023/10/04/14/27/phone-8293816_1280.jpg"
	},
	{
		title: "Đặt lịch làm việc",
		desc: "Chọn ngày, ca và kỹ thuật viên phù hợp",
        src: "https://cdn.pixabay.com/photo/2017/01/18/17/52/calendar-1990453_1280.jpg"
	},
	{
		title: "Theo dõi lịch đã đặt",
		desc: "Xem danh sách lịch đã đặt và trạng thái",
        src: "https://media.istockphoto.com/id/155067590/vi/anh/bi%E1%BB%83u-%C4%91%E1%BB%93-lu%E1%BB%93ng.jpg?s=1024x1024&w=is&k=20&c=l77osugK2fXB02bAxPqV3hYbc2t1VxW21y8qLpSM9xY="
	},
	{
		title: "Thông tin cá nhân",
		desc: "Cập nhật thông tin và quản lý tài khoản",
        src: "https://media.istockphoto.com/id/1211554463/vi/anh/h%C3%ACnh-%E1%BA%A3nh-c%E1%BA%ADn-c%E1%BA%A3nh-b%C3%A0n-tay-nam-gi%E1%BB%9Bi-s%E1%BB%AD-d%E1%BB%A5ng-%C4%91i%E1%BB%87n-tho%E1%BA%A1i-th%C3%B4ng-minh-di-%C4%91%E1%BB%99ng-v%E1%BB%9Bi-m%E1%BA%A1ng-an-ninh-m%E1%BA%A1ng.jpg?s=1024x1024&w=is&k=20&c=Aop6nqWJeMR3g4BJQm4IH_pfbcF1VxC57X4y-vhKJes="
	}
];

const fakeStoreManagers = [
	{
		id: 1,
		name: "Nguyen Van C",
		phone: "0909123457",
		email: "managera@example.com",
		store: "Cửa hàng A",
		img: "https://cdn.pixabay.com/photo/2016/11/21/16/27/laptop-1846277_1280.jpg"
	},
	{
		id: 2,
		name: "Tran Thi D",
		phone: "0912345679",
		email: "managerb@example.com",
		store: "Cửa hàng B",
		img: "https://cdn.pixabay.com/photo/2016/11/21/16/27/laptop-1846277_1280.jpg"
	},
];

const StoreManagerCards = () => {
	return (
        <div className="row g-3 d-flex justify-content-center">
            {fakeStoreManagers.map((manager, idx) => (
                <motion.div
                    className="col-12 col-md-3"
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 1 }} // chỉ chạy 1 lần, khi 20% card xuất hiện
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                    <div className="card overflow-hidden h-100 shadow-sm text-center">
                        <CardActionArea>
                            <img 
                                src={manager.img} 
                                alt={manager.name} 
                                className="rounded-circle mt-3"
                                style={{ width: "100px", height: "100px", objectFit: "cover", margin: "0 auto" }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {manager.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {manager.store} <br />
                                    {manager.phone} <br />
                                    {manager.email}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </div>
                </motion.div>
            ))}
        </div>
	);
}

const TechnicianCards = () => {
	return (
        <div className="row g-3 d-flex justify-content-center">
            {fakeTechnicians.map((tech, idx) => (
                <motion.div
                    className="col-12 col-md-3"
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 1 }} // chỉ chạy 1 lần, khi 20% card xuất hiện
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                    <div className="card overflow-hidden h-100 shadow-sm text-center">
                        <CardActionArea>
                            <img 
                                src={tech.avatar} 
                                alt={tech.name} 
                                className="rounded-circle mt-3"
                                style={{ width: "100px", height: "100px", objectFit: "cover", margin: "0 auto" }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {tech.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {tech.phone} <br />
                                    {tech.email} <br />
                                    Chuyên môn: {tech.specialties.join(", ")}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </div>
                </motion.div>
            ))}
        </div>
	);
}

const FeatureCards = () => {
	return (
        <div className="row g-3 d-flex justify-content-center">
            {features.map((f, idx) => (
                <motion.div
                    className="col-12 col-md-3"
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 1 }} // chỉ chạy 1 lần, khi 20% card xuất hiện
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                    <div className="card overflow-hidden h-100 shadow-sm">
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={f.src}
                                alt={f.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {f.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {f.desc}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </div>
                </motion.div>
            ))}
        </div>
	);
};

const StoreCards = () => {
	return (
        <div className="row g-3 d-flex justify-content-center">
            {fakeStores.map((store, idx) => (
                <motion.div
                    className="col-12 col-md-3"
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 1 }} // chỉ chạy 1 lần, khi 20% card xuất hiện
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                    <div className="card overflow-hidden h-100 shadow-sm">
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={store.storeImage}
                                alt={store.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {store.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {store.address} <br />
                                    {store.phone} | {store.email}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </div>
                </motion.div>
            ))}
        </div>
	);
}

const HomePage = () => {
	return (
        <div>
            
            <div 
                className="text-center text-white d-flex flex-column justify-content-center align-items-center"
                style={{
                    height: "400px",
                    backgroundImage: "url('https://cdn.pixabay.com/photo/2016/11/21/16/27/laptop-1846277_1280.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative"
                }}
            >
                <div style={{
                    position: "absolute",
                    top: 0, left: 0, width: "100%", height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)"
                }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                    <h1 className="fw-bold mb-3 text-white">Trường Thịnh Group</h1>
                    <p className="lead mb-4 text-white">Đặt lịch, theo dõi và quản lý dịch vụ dễ dàng</p>
                    <button className="btn btn-lg" style={{ backgroundColor: "#2196f3", color: "#fff" }}>
                        <PersonAddIcon /> Đặt lịch ngay
                    </button>
                </div>
            </div>
            
            {/* Giới thiệu các chức năng */}
            <section className="my-5">
                <div className="container pt-3 pb-5">
                    <div className="mb-4 fs-2 text-center text-uppercase">Chức năng nổi bật</div>
                    <FeatureCards />
                </div>
            </section>

            {/* Danh sách kỹ thuật viên */}
            <section
                className="mb-5"
                style={{
                    height: "500px",
                    backgroundImage: "url('https://cdn.pixabay.com/photo/2020/01/04/01/51/technology-4739549_1280.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    backgroundBlendMode: "darken",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    position: "relative",
                }}
            >
                <div className="container pt-3 pb-5">
                    <div className="mb-4 fs-2 text-center fw-bolder text-white fst-italic text-uppercase">Các kỹ thuật viên tiêu biểu</div>
                    <TechnicianCards />
                    <div className="text-center mt-5">
                        <ViewMoreButton variant="dark" to="/ky-thuat-vien/tat-ca">Xem thêm</ViewMoreButton>
                    </div>
                </div>
            </section>

            {/* Giới thiệu các cửa hàng */}
            <section className="mb-5">               
                <div className="container pt-3 pb-5">
                    <div className="mb-4 fs-2 text-center text-uppercase">Các cửa hàng của chúng tôi</div>
                    <StoreCards />        
                    <div className="text-center mt-5">
                        <ViewMoreButton variant="light" to="/cua-hang/tat-ca">Xem thêm</ViewMoreButton>
                    </div>        
                </div>
            </section>

            {/* Giới thiệu các quản lý cửa hàng */}
            <section
                style={{
                    height: "500px",
                    backgroundImage: "url('https://cdn.pixabay.com/photo/2020/01/04/01/51/technology-4739549_1280.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    backgroundBlendMode: "darken",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    position: "relative",
                }}
            >
                <div className="container pt-3 pb-5">
                    <div className="mb-4 fs-2 text-center fw-bolder text-white fst-italic text-uppercase">Giới thiệu các quản lý cửa hàng</div>
                    <StoreManagerCards />
                </div>
            </section>
        </div>
	);
}


export default HomePage;