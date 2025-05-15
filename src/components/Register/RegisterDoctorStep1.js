import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { DoctorRegistrationContext } from '../../context/DoctorRegistrationContext';
import { checkEmail } from '../../services/AuthService';

const RegisterDoctorStep1 = ({ nextStep }) => {
    const { doctorData, setDoctorDataContext } = useContext(DoctorRegistrationContext);
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setDoctorDataContext({ [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Xóa lỗi khi người dùng nhập lại
    };

    const validate = () => {
        let isValid = true;
        let newErrors = {};

        if (!doctorData.name) {
            newErrors.name = "Tên không được để trống";
            isValid = false;
        }

        if (!doctorData.email) {
            newErrors.email = "Email không được để trống";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(doctorData.email)) {
            newErrors.email = "Email không hợp lệ";
            isValid = false;
        }

        if (!doctorData.password) {
            newErrors.password = "Mật khẩu không được để trống";
            isValid = false;
        } else if (doctorData.password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
            isValid = false;
        }

        if (doctorData.password !== doctorData.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu không khớp";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (errors.email === 'Email đã tồn tại.') {
            toast.error("Email đã tồn tại, vui lòng nhập email khác!");
            return;
        }
    
        if (validate()) {
            nextStep();
        }
    };

    const handleCheckEmail = async () => {
        if (!doctorData.email) {
            return;
        }

        try {
            const response = await checkEmail(doctorData.email);
            if (response && response.EC === 1) {
                setErrors({ ...errors, email: 'Email đã tồn tại.' });
            } else {
                if (errors.email === 'Email đã tồn tại.') {
                    setErrors({ ...errors, email: '' });
                }
            }
        } catch (error) {
            console.error('Error checking email:', error);
            setErrors({ ...errors, email: 'Có lỗi xảy ra khi kiểm tra email.' });
        }
    };

    return (
        <div className="register-step1-container d-flex align-items-center bg-dark vh-100 text-white">
            <div className="container border border-light p-5 rounded-3 w-50 ">
                <h1 className="mb-3 fw-bold text-center">BƯỚC 1</h1>
                <h3 className="mb-3 text-center">THÔNG TIN CÁ NHÂN</h3>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Tên</label>
                    <input
                        type="text"
                        name="name"
                        value={doctorData.name}
                        onChange={handleChange}
                        className="form-control rounded-pill"
                        id="name"
                        placeholder="Nhập tên của bạn"
                    />
                    {errors.name && <p className="text-danger">{errors.name}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={doctorData.email}
                        onChange={handleChange}
                        className="form-control rounded-pill"
                        id="email"
                        placeholder="Nhập email của bạn"
                        onBlur={handleCheckEmail}
                    />
                    {errors.email && <p className="text-danger">{errors.email}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mật khẩu</label>
                    <input
                        type="password"
                        name="password"
                        value={doctorData.password}
                        onChange={handleChange}
                        className="form-control rounded-pill"
                        id="password"
                        placeholder="Nhập mật khẩu"
                    />
                    {errors.password && <p className="text-danger">{errors.password}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={doctorData.confirmPassword}
                        onChange={handleChange}
                        className="form-control rounded-pill"
                        id="confirmPassword"
                        placeholder="Xác nhận mật khẩu"
                    />
                    {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
                </div>
                <div className="text-center mt-2">
                    <button onClick={handleNext} className="btn btn-light rounded-pill">Tiếp theo</button>
                </div>
            </div>
        </div>
    );
};

export default RegisterDoctorStep1;