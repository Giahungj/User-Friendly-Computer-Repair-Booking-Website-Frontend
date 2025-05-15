import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { DoctorRegistrationContext } from '../../context/DoctorRegistrationContext';

const RegisterDoctorStep2 = ({ nextStep, prevStep }) => {
    const { doctorData, setDoctorDataContext } = useContext(DoctorRegistrationContext);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setDoctorDataContext({ [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        let isValid = true;
        let newErrors = {};

        if (!doctorData.address) {
            newErrors.address = "Địa chỉ không được để trống";
            isValid = false;
        }

        if (!doctorData.phone) {
            newErrors.phone = "Số điện thoại không được để trống";
            isValid = false;
        } else if (!/^\d{10}$/.test(doctorData.phone)) {
            newErrors.phone = "Số điện thoại không hợp lệ";
            isValid = false;
        }

        if (!doctorData.sex) {
            newErrors.sex = "Vui lòng chọn giới tính";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (validate()) {
            nextStep();
        }
    };

    return (
        <div className="register-step2-container d-flex align-items-center bg-dark vh-100 text-white">
            <div className="container border border-light p-5 rounded-3 w-50 ">
                <h1 className="mb-3 fw-bold text-center">BƯỚC 2</h1>
                <h3 className="mb-3 text-center">THÔNG TIN LIÊN HỆ</h3>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Địa chỉ</label>
                    <input type="text" name="address" value={doctorData.address} onChange={handleChange} className="form-control rounded-pill" placeholder="Địa chỉ" />
                    {errors.address && <p className="text-danger">{errors.address}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Số điện thoại</label>
                    <input type="text" name="phone" value={doctorData.phone} onChange={handleChange} className="form-control rounded-pill" placeholder="Số điện thoại" />
                    {errors.phone && <p className="text-danger">{errors.phone}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="dateofbirth" className="form-label">Ngày sinh</label>
                    <input type="date" name="dateofbirth" value={doctorData.dateofbirth} onChange={handleChange} className="form-control rounded-pill" placeholder="Ngày sinh" />
                    {errors.dateofbirth && <p className="text-danger">{errors.dateofbirth}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="sex" className="form-label">Giới tính</label>
                    <select name="sex" value={doctorData.sex} onChange={handleChange} className="form-select rounded-pill">
                        <option value="">Chọn giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                    </select>
                    {errors.sex && <p className="text-danger">{errors.sex}</p>}
                </div>
                <div className="d-flex justify-content-between">
                    <button onClick={prevStep} className="btn btn-light rounded-pill">Quay lại</button>
                    <button onClick={handleNext} className="btn btn-light rounded-pill">Tiếp theo</button>
                </div>
            </div>
        </div>
    );
};

export default RegisterDoctorStep2;