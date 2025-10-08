import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserProfileData } from "../../services/AccountService";
import { Avatar, Button } from "@mui/material";
import { Edit, Lock } from "@mui/icons-material";

const UserProfile = () => {
    const navigate = useNavigate();
    const { email } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                setLoading(true);
                const response = await fetchUserProfileData(email);
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


    const renderStoreManagerInfo = () => {
        if (!user.StoreManager) return null;
        return (
            <div className="mt-3">
                <p><strong>Cửa hàng phụ trách:</strong> {user.StoreManager.store_name}</p>
                <p><strong>Kinh nghiệm:</strong> {user.StoreManager.experience || 'Chưa cập nhật'}</p>
            </div>
        );
    };

    const renderTechnicianInfo = () => {
        if (!user.Technician) return null;
        return (
            <div className="mt-3">
                <p><strong>Chuyên môn:</strong> {user.Technician.specialization}</p>
                <p><strong>Năm kinh nghiệm:</strong> {user.Technician.experience}</p>
                <p><strong>Lịch làm việc:</strong> {user.Technician.schedule || 'Chưa cập nhật'}</p>
            </div>
        );
    };

    const renderCustomerInfo = () => {
        if (!user.Customer) return null;
        return (
            <div className="mt-3">
                <p><strong>Địa chỉ:</strong> {user.Customer.address}</p>
                <p><strong>Điểm thưởng:</strong> {user.Customer.points || 0}</p>
            </div>
        );
    };

    const renderRoleInfo = () => {
        if (user.role === 1) return renderStoreManagerInfo();
        if (user.role === 2) return renderTechnicianInfo();
        if (user.role === 3) return renderCustomerInfo();
        return null;
    };

    return (
        <div className="container py-5">
            <div className="row g-3">
                <div className="col-8">
                    <div className="card shadow-sm p-3 h-100">
                        <p className="mb-2"><strong>Email:</strong> {user.email}</p>
                        <p className="mb-2"><strong>Số điện thoại:</strong> {user.phone || 'Chưa cập nhật'}</p>
                        <p className="mb-2"><strong>Loại người dùng:</strong> {
                            user.role === 1 ? 'Quản lý cửa hàng' :
                            user.role === 2 ? 'Kỹ thuật viên' :
                            user.role === 3 ? 'Khách hàng' : 'Không xác định'
                        }</p>
                        {renderRoleInfo()}
                    </div>
                </div>
                {/* Cột phụ (4/12) cho ảnh đại diện và nút chỉnh sửa */}
                <div className="col-4">
                    <div className="card shadow-sm p-3 text-center h-100">
                        <Avatar
                            alt={user.name}
                            src={user.avatar ? `http://localhost:8080/images/uploads/${user.avatar}` : '/default-avatar.jpg'}
                            sx={{ width: 150, height: 150, margin: '0 auto 16px', fontSize: 40 }}
                        />
                        <h5 className="fw-bold text-dark mb-3">{user.name}</h5>
                        <div className="d-grid gap-1">
                            <Button
                                variant="outlined"
                                className="rounded py-2"
                                startIcon={<Edit />}
                                onClick={() => navigate(`/profile/update-profile`)}
                            >
                                Thay đổi thông tin cá nhân
                            </Button>

                            <Button
                                variant="outlined"
                                className="rounded py-2"
                                startIcon={<Lock />}
                                // onClick={() => navigate(`/profile/change-password`)}
                            >
                                Đổi mật khẩu
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
