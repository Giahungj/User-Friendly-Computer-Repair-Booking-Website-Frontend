import Carousel from 'react-material-ui-carousel';
import { Avatar, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SimilarDoctors = ({ similarDoctors }) => {
	const navigate = useNavigate();

	// Tách bác sĩ thành các nhóm 3 người
	const groupDoctors = (doctors, size = 3) => {
		const grouped = [];
		for (let i = 0; i < doctors.length; i += size) {
			grouped.push(doctors.slice(i, i + size));
		}
		return grouped;
	};

	const doctorGroups = groupDoctors(similarDoctors, 3);

	return (
		<div className="p-3 border shadow-sm bg-white rounded">
			<h4 className="mb-3 text-secondary text-center">Các bác sĩ tương tự</h4>
			<Carousel autoPlay={true} navButtonsAlwaysVisible animation="slide" interval={3000} duration={500} indicators={false}>
				{doctorGroups.map((group, index) => (
					<Paper key={index} elevation={0} className="p-2">
						<div className="row row-cols-1 row-cols-md-3 g-2">
							{group.map((similarDoc) => (
								<div key={similarDoc.id} className="col">
									<div className="card h-100 border p-1 shadow-sm">
										<div className="card-body">
											<div className="d-flex justify-content-center my-3">
												<Avatar
													alt={similarDoc.User.name}
													src={
														similarDoc.User.avatar
															? `http://localhost:8080/images/uploads/${similarDoc.User.avatar}`
															: '/default-avatar.jpg'
													}
													sx={{ width: 80, height: 80 }}
												/>
											</div>

											<h4 className="card-title text-dark fs-6">
												<strong>BS: </strong> {similarDoc.User.name}
											</h4>

											<p className="card-text m-0">
												<strong>CK: </strong>
												<span className="text-muted">{similarDoc.Specialty?.name}</span>
											</p>

											<p className="card-text m-0">
												<strong className="text-muted">Giá khám: </strong>
												<span className="text-danger">
													{similarDoc.price?.toLocaleString('vi-VN', {
														style: 'currency',
														currency: 'VND'
													}) || 'Chưa cập nhật'}
												</span>
											</p>

                                            <p className="card-text mt-2 mb-0">
                                                {similarDoc.hasAvailableSchedules ? (
                                                    <strong className="text-primary">Còn trống</strong>
                                                ) : (
                                                    <strong className="text-danger">Không có chỗ</strong>
                                                )}
                                            </p>
										</div>

										<div className="card-footer bg-white border-top-0 text-center">
											<Button
												variant="contained"
												onClick={() => navigate(`/doctors/${similarDoc.id}`)}
											>
												Xem chi tiết
											</Button>
										</div>
									</div>
								</div>
							))}
						</div>
					</Paper>
				))}
			</Carousel>
		</div>
	);
};

export default SimilarDoctors;
