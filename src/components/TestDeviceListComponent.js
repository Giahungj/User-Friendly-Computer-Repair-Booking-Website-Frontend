import React, { useState } from 'react';
import { Button } from '@mui/material';
import TestCardServiceComponent from './TestCardServiceComponent';
import TestTabComponent from './TestTabComponent';
import TestBookingFormComponent from './TestBookingFormComponent';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	borderRadius: 5,
	width: 400,
};

const demoServices = [
	{
		id: "1",
		name: "Chuyên gia sửa nguồn laptop",
		specialty: "Sửa chữa nguồn, thay pin",
		rating: 4.9,
		ratingCount: 5,
		store: { name: "TechFix", address: "chi nhánh Phan Chu Trinh, Hà Nội" },
		image: "https://via.placeholder.com/100",
	},
	{
		id: "2",
		name: "Chuyên gia sửa màn hình PC",
		specialty: "Sửa màn hình, thay kính",
		rating: 4.7,
		ratingCount: 3,
		store: { name: "TechFix", address: "chi nhánh Láng, Hà Nội" },
		image: "https://via.placeholder.com/100",
	},
	{
		id: "3",
		name: "Chuyên gia cài đặt Windows",
		specialty: "Cài Windows, tối ưu máy",
		rating: 4.8,
		ratingCount: 4,
		store: { name: "TechFix", address: "chi nhánh Tân Bình, TP.HCM" },
		image: "https://via.placeholder.com/100",
	},
	{
		id: "4",
		name: "Chuyên gia cài đặt Windows",
		specialty: "Cài Windows, tối ưu máy",
		rating: 4.8,
		ratingCount: 4,
		store: { name: "TechFix", address: "chi nhánh Tân Bình, TP.HCM" },
		image: "https://via.placeholder.com/100",
	},
];

const TestDeviceListComponent = () => {
	const [showLogin, setShowLogin] = useState(false);
	const [showBooking, setShowBooking] = useState(false);

	const handleClose = () => setShowLogin(false);
	const handleShow = () => setShowLogin(true);

	const handleCloseBooking = () => setShowBooking(false);
	const handleShowBooking = () => setShowBooking(true);

	return (
		<div className="container py-5">
			<h4 className="text-center mb-3 fw-bold text-dark">Danh sách dịch vụ</h4>

			<div className="text-center mb-3">
				<Button variant="contained" onClick={handleShow}>
					Mở form đăng nhập
				</Button>

				<Button variant="contained" onClick={handleShowBooking}>
					Mở form đặt hàng
				</Button>
			</div>

			<div className="row">
				{demoServices.map((service) => (
					<div className="col-12 col-sm-6 col-md-3 mb-3" key={service.id}>
						<TestCardServiceComponent demoService={service} />
					</div>
				))}
			</div>

			<div className={`modal fade ${showBooking ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
				<div className="modal-dialog modal-dialog-centered modal-lg">
					<div className="modal-content border border-0" style={{ borderRadius: '15px' }}>	
						<TestBookingFormComponent />
						<div className="modal-footer">
							<Button
								variant="contained"
								onClick={handleCloseBooking}
								sx={{
									backgroundColor: '#2196f3',
									borderRadius: '50px',
									fontWeight: 'bold',
									color: '#fff',
									boxShadow: 'none',
									'&:hover': {
										backgroundColor: '#1976d2',
										boxShadow: 'none',
									},
								}}
							>
								Đóng
							</Button>
						</div>

					</div>
				</div>
			</div>

			<div className={`modal fade ${showLogin ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content border border-0" style={{ borderRadius: '15px' }}>	
						<TestTabComponent />
						<div className="modal-footer">
							<Button
								variant="contained"
								onClick={handleClose}
								sx={{
									backgroundColor: '#2196f3',
									borderRadius: '50px',
									fontWeight: 'bold',
									color: '#fff',
									boxShadow: 'none',
									'&:hover': {
										backgroundColor: '#1976d2',
										boxShadow: 'none',
									},
								}}
							>
								Đóng
							</Button>
						</div>

					</div>
				</div>
			</div>
		</div>
	);
};

export default TestDeviceListComponent;
