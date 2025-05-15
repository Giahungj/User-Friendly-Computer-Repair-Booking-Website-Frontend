import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterDoctorStep5 = ({ prevStep }) => {
    const navigate = useNavigate();

    return (
        <div className="d-flex align-items-center bg-dark vh-100 text-white">
            <div className="container border border-light p-5 rounded-3 w-50 my-5 text-center">
                <h1 className="mb-3 fw-bold">GỬI ĐƠN ĐĂNG KÝ THÀNH CÔNG</h1>
                <p className="mb-4 fs-5">
                    Bạn đã gửi đơn thành công! Vui lòng đợi hệ thống xác thực thông tin. 
                    Quá trình này có thể mất vài phút.
                </p>
                <button onClick={() => navigate("/")} className="btn btn-primary rounded-pill">
                    Quay lại trang chủ
                </button>
            </div>
        </div>
    );
};

export default RegisterDoctorStep5;
