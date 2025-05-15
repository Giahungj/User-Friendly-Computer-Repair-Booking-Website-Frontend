import { useNavigate } from "react-router-dom";

const NotAllow = () => {
    const navigate = useNavigate();

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="shadow-lg p-5 text-center bg-light rounded-3" style={{ maxWidth: "600px" }}>
                <h2 className="text-danger mb-4 fw-bold">Truy cập bị từ chối!</h2>
                <p className="text-muted mb-4">Bạn không có quyền truy cập vào trang này.</p>
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
                        Quay lại trang trước
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate("/support")}>
                        Về trang chủ
                    </button>
                </div>
                <hr className="my-4" />
                <p className="text-muted small">
                    Nếu cần hỗ trợ, vui lòng liên hệ bộ phận CSKH hoặc xem lại thông tin tài khoản của bạn.
                </p>
            </div>
        </div>
    );
};

export default NotAllow;
