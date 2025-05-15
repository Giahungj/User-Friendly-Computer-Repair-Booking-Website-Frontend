import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../../services/AccountService";
import Avatar from '@mui/material/Avatar';

const UserProfile = () => {
    const navigate = useNavigate();
    const { email } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    useEffect(() => {
        const getUserProfile = async () => {
            try {
                setLoading(true);
                const response = await fetchUserProfile(email);
                if (response?.EC === 0) {
                    setUser(response.DT);
                } else {
                    console.error("Error fetching user profile:", response?.EC);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
                setLoading(false);
            }
        };

        getUserProfile();
    }, [email]);

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (!user) return <p>Không tìm thấy thông tin người dùng.</p>;

    return (
        <div className="container py-5">
            
            <div className="row">
                {/* Cột chính (8/12) cho thông tin chi tiết */}
                <div className="col-md-8 border-end">
                    <div className="p-3">
                        {/* Thông tin cơ bản */}
                        <h6 className="fw-semibold text-muted mb-3">Thông tin cơ bản</h6>
                        <p className="mb-2"><strong>Email:</strong> {user.email}</p>
                        <p className="mb-2"><strong>Số điện thoại:</strong> {user.phone || 'Chưa cập nhật'}</p>
                        <p className="mb-2"><strong>Địa chỉ:</strong> {user.address || 'Chưa cập nhật'}</p>
                        <p className="mb-2"><strong>Giới tính:</strong> {user.sex === 1 ? 'Nam' : 'Nữ'}</p>
                        <p className="mb-2"><strong>Loại người dùng:</strong> {user.userType === 'patient' ? 'Người dùng thông thường' : 'Người dùng bác sĩ' }</p>
                        <hr></hr>
                        {/* Thông tin khác */}
                        <h6 className="fw-semibold text-muted mt-4 mb-3">Thông tin khác</h6>
                        <p className="mb-2"><strong>Tham gia vào:</strong> {new Date(user.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                        <p className="mb-2"><strong>Ngày cập nhật gần nhất:</strong> {new Date(user.updatedAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                    </div>
                </div>
                {/* Cột phụ (4/12) cho ảnh đại diện và nút chỉnh sửa */}
                <div className="col-md-4 text-center">
                    <Avatar
                        alt={user.name}
                        src={user.avatar ? `http://localhost:8080/images/uploads/${user.avatar}` : '/default-avatar.jpg'}
                        sx={{ width: 150, height: 150, margin: '0 auto 16px', fontSize: 40 }}
                    />
                    <h5 className="fw-bold text-dark mb-3">{user.name}</h5>
                    <div className="d-grid gap-3">
                        <button
                            className="btn-white border border-dark rounded py-2"
                            onClick={() => navigate(`/profile/update-profile`)}
                        >
                            Thay đổi thông tin cá nhân
                        </button>
                        <button
                            className="btn-white border border-dark rounded py-2"
                            onClick={() => navigate(`/profile/update-email`)}
                        >
                            Cập nhật email
                        </button>
                        <button
                            className="btn-white border border-dark rounded py-2"
                            onClick={() => navigate(`/profile/update-phone`)}
                        >
                            Cập nhật số điện thoại
                        </button>
                        <button
                            className="btn-white border border-dark rounded py-2"
                            onClick={() => navigate(`/profile/change-password`)}
                        >
                            Đổi mật khẩu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
