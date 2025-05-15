import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { DoctorRegistrationContext } from '../../context/DoctorRegistrationContext';
import { fetchFacilities } from '../../services/FacilityService';
import { fetchSpecialties } from '../../services/specialtySevice';
const RegisterDoctorStep3 = ({ nextStep, prevStep }) => {
    const { doctorData, setDoctorDataContext } = useContext(DoctorRegistrationContext);
    const [errors, setErrors] = useState({});
    const [specialties, setSpecialties] = useState([]);
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const resFacilities = await fetchFacilities();
            setFacilities(resFacilities.DT);
            const resSpecialties = await fetchSpecialties();
            setSpecialties(resSpecialties.DT.specialties);
          } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Có lỗi xảy ra khi tải dữ liệu.");
          }
        };
      
        fetchData();
    }, []);

    const handleChange = (e) => {
        setDoctorDataContext({ [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        let isValid = true;
        let newErrors = {};

        if (!doctorData.specilityId) {
            newErrors.specilityId = "Chuyên khoa không được để trống";
            isValid = false;
        }

        if (!doctorData.experience) {
            newErrors.experience = "Kinh nghiệm không được để trống";
            isValid = false;
        }

        if (!doctorData.facilityId) {
            newErrors.facilityId = "Nơi làm việc không được để trống";
            isValid = false;
        }

        if (!doctorData.description) {
            newErrors.description = "Mô tả bản thân không được để trống";
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
        <div className="register-step3-container d-flex align-items-center bg-dark vh-100 text-white">
            <div className="container border border-light p-5 rounded-3 w-50 ">
                <h1 className="mb-3 fw-bold text-center">BƯỚC 3</h1>
                <h3 className="mb-3 text-center">THÔNG TIN CHUYÊN MÔN</h3>
                <div className="mb-3">
                    <label htmlFor="specilityId" className="form-label">Chuyên khoa đang hỗ trợ</label>
                    <select
                        name="specilityId"
                        id="specilityId"
                        value={doctorData.specilityId}
                        onChange={handleChange}
                        className="form-control rounded-pill"
                    >
                        <option value="">Chọn chuyên khoa</option>
                        {specialties.map(specialty => (
                        <option key={specialty.id} value={specialty.id}>
                            {specialty.name}
                        </option>
                        ))}
                    </select>
                    {errors.specilityId && <p className="text-danger">{errors.specilityId}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="experience" className="form-label">Kinh nghiệm</label>
                    <input type="text" name="experience" value={doctorData.experience} onChange={handleChange} className="form-control rounded-pill" placeholder="Kinh nghiệm" />
                    {errors.experience && <p className="text-danger">{errors.experience}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="facility" className="form-label">Cơ sở làm việc</label>
                    <select 
                        name="facilityId" 
                        id="facilityId"
                        value={doctorData.facility} 
                        onChange={handleChange} 
                        className="form-control rounded-pill"
                    >
                        <option value="">Chọn cơ sở làm việc hệ thống đang hỗ trợ</option>
                        {facilities.map(facility => (
                        <option key={facility.id} value={facility.id}>
                            {facility.name}
                        </option>
                        ))}
                    </select>
                    {errors.facility && <p className="text-danger">{errors.facility}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Mô tả bản thân</label>
                    <textarea name="description" value={doctorData.description} onChange={handleChange} className="form-control rounded-pill" placeholder="Mô tả bản thân" />
                    {errors.description && <p className="text-danger">{errors.description}</p>}
                </div>
                <div className="d-flex justify-content-between">
                    <button onClick={prevStep} className="btn btn-light rounded-pill">Quay lại</button>
                    <button onClick={handleNext} className="btn btn-light rounded-pill">Tiếp theo</button>
                </div>
            </div>
        </div>
    );
};

export default RegisterDoctorStep3;