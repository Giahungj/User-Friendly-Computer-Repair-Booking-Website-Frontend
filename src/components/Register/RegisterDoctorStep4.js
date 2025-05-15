import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DoctorRegistrationContext } from '../../context/DoctorRegistrationContext';
import { registerDoctor } from '../../services/AuthService';

const RegisterDoctorStep4 = ({ nextStep, prevStep }) => {
    const { doctorData, setDoctorDataContext } = useContext(DoctorRegistrationContext);
    const [errors, setErrors] = useState({});
    const [avatarFile, setAvatarFile] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState(null);

    const handleChange = (e) => {
        let value = e.target.value;
        if (e.target.name === 'price') {
            value = value.replace(/[^0-9.]/g, '');
            if (parseFloat(value) < 0) {
                value = '0';
            }
            value = parseFloat(value).toLocaleString('vi-VN');
        }
        setDoctorDataContext({ [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatarFile(file);
        if (file) {
            setPreviewAvatar(URL.createObjectURL(file));
        } else {
            setPreviewAvatar(null);
        }
    };

    const validate = () => {
        let isValid = true;
        let newErrors = {};

        if (!avatarFile) {
            newErrors.avatar = "Ảnh đại diện không được để trống";
            isValid = false;
        }

        if (!doctorData.price) {
            newErrors.price = "Giá khám không được để trống";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (validate()) {
            handleRegister()
            nextStep();
        }
    };

    const handleRegister = async () => {
        try {
            const formData = new FormData();
            formData.append('avatar', avatarFile);
            Object.keys(doctorData).forEach(key => formData.append(key, doctorData[key]));

            let response = await registerDoctor(formData);
            if (response.EC === 0) {
                toast.success("Hoàn thành!");
            }
            toast.error("Lỗi rồi!");
        } catch (error) {
            toast.error("An error occurred, please try again!");
        }
    };

    return (
        <div className="register-step4-container d-flex align-items-center bg-dark vh-100 text-white">
            <div className="container border border-light p-5 rounded-3 w-50 my-5">
                <h1 className="mb-3 fw-bold text-center">BƯỚC 4</h1>
                <h3 className="mb-3 text-center">THÔNG TIN BỔ SUNG</h3>
                <div className="mb-3">
                    <label htmlFor="avatar" className="form-label">Ảnh đại diện</label>
                    <input type="file" name="avatar" onChange={handleAvatarChange} className="form-control rounded-pill" accept="image/*" />
                    {errors.avatar && <p className="text-danger">{errors.avatar}</p>}
                    {previewAvatar && <img src={previewAvatar} alt="Preview Avatar" className="img-thumbnail mt-2" style={{ maxWidth: '200px', maxHeight: '200px' }} />} {/* Hiển thị ảnh preview */}
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Giá khám</label>
                    <input type="number" name="price" value={doctorData.price} onChange={handleChange} className="form-control rounded-pill" placeholder="Giá khám" min="1"/>
                    {errors.price && <p className="text-danger">{errors.price}</p>}
                </div>
                <div className="d-flex justify-content-between">
                    <button onClick={prevStep} className="btn btn-light rounded-pill">Quay lại</button>
                    <button onClick={handleNext} className="btn btn-primary rounded-pill">Đăng ký</button>
                </div>
            </div>
        </div>
    );
};

export default RegisterDoctorStep4;