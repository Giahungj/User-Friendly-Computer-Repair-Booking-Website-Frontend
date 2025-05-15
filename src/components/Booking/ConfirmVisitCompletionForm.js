import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDoctorCompleteBooking } from "../../services/BookingService"
import { fetchMedicine } from "../../services/MedicineService"
import { toast } from "react-toastify"
import { AuthContext } from "../../context/AuthContext";
// import { Box, CircularProgress }  from '@mui/material';

const ConfirmVisitCompletionForm = ({
    doctorId,
    bookingId,
    date,
    patientName,
    patientId,
    initialConditionAssessment = "",
    initialRevisitDate = "",
    initialDiagnosis = "",
    onClose,
    }) => {
        const [medicines, setMedicines] = useState([]);
        const [loading, setLoading] = useState();
        const [selected, setSelected] = useState([]);
        const now = new Date();
        const time = `${now.getHours().toString().padStart(2, "0")} giờ, 
        ${now.getMinutes().toString().padStart(2, "0")} phút, 
        ${now.getSeconds().toString().padStart(2, "0")}`;
        const { auth } = useContext(AuthContext);
        const navigate = useNavigate();  
        const [formData, setFormData] = useState({
            doctorId,
            bookingId,
            patientId,
            date,
            conditionAssessment: initialConditionAssessment,
            revisitDate: initialRevisitDate,
            diagnosis: initialDiagnosis
        });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchMedicine();
                if (response.EC === 0) {
                    setMedicines(response.DT);
                } else {
                    toast.warning(response.EM)
                }
            } catch (error) {
                toast.error('Thông báo lỗi: ', error);
                console.error('Lỗi khi fetch thuốc:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectMedicine = (id) => {
        setSelected(prev => {
            const isSelected = prev.some(item => item.id === id);
            
            // Nếu thuốc đã được chọn, loại bỏ khỏi selected
            if (isSelected) {
                return prev.filter(item => item.id !== id);
            } 
            
            // Nếu chưa được chọn, thêm vào với quantity mặc định là 1
            return [...prev, { id, quantity: 1 }];
        });
    };

    const handleQuantityChange = (id, quantity) => {
        setSelected(prev => prev.map(medicine =>
            medicine.id === id ? { ...medicine, quantity: Number(quantity) } : medicine
        ));
    };
    
        
    const handleSubmit = async () => {
        if (!auth || !auth.isAuthenticated) {
            toast.error("Bạn cần đăng nhập để thực hiện hành động này!");
            navigate("/login");
            return;
        }
        if (!formData.conditionAssessment.trim()) {
            toast.warning("Tình trạng bệnh không được để trống!");
            return;
        }

        // Thêm selected vào formData
        const dataToSubmit = {
            ...formData,
            selected: selected.map(medicine => ({
                id: medicine.id,  // Thêm id
                quantity: medicine.quantity  // Đảm bảo quantity có sẵn trong selected
            }))
        };

        console.log('dataToSubmit', dataToSubmit)
        try {
            const response = await fetchDoctorCompleteBooking(dataToSubmit);
            if (response && response.EC === 0) {
                toast.success(response.EM)
                window.location.reload();
            } else {
                toast.warning(response.EM)
            }
        } catch (error) {
            toast.error(error);
            console.error("Lỗi khi gửi dữ liệu:", error);
        } finally {
            onClose();
        }
    };

    // if (loading) return 
    // <Box sx={{ display: 'flex', alignItems: 'center'}}>
    //     <CircularProgress size="lg" />
    // </Box>

    return (
        <div className="confirmvisitcompletionform w-100" style={{ position: 'sticky', top: '5rem' }}>
            <div className="row my-2 d-flex align-items-stretch">
                <div className="col m-2 d-flex">
                    <div className="card border-0 shadow flex-fill">
                        <div className="card-header border-0 font-weight-bold text-center">
                            XÁC NHẬN HOÀN THÀNH & THANH TOÁN
                        </div>
                        <div className="card-body">
                            <h5 className="card-title mb-2">Booking #{formData.bookingId}</h5>
                            <p className="card-text mb-1"><strong>Bệnh nhân:</strong> {patientName}</p>
                            <p className="card-text mb-4">
                                <strong>Lúc:</strong> <span className="badge bg-teal-500">{time}</span> <strong>Ngày:</strong> <span className="badge bg-teal-500">{formData.date}</span>
                            </p>
            
                            {["conditionAssessment", "diagnosis"].map(id => (
                                <div className="mb-3" key={id}>
                                    <label htmlFor={id} className="form-label fw-semibold">
                                        { id === "conditionAssessment" ? "Tình trạng bệnh" : "Ghi chú bác sĩ" }
                                    </label>
                                    <textarea
                                        id={id}
                                        name={id}
                                        className="form-control rounded-3"
                                        placeholder={id === "conditionAssessment" ? "Nhập tình trạng bệnh" : "Nhập ghi chú bác sĩ"}
                                        value={formData[id]}
                                        onChange={handleChange}
                                        required={id === "conditionAssessment"}
                                        rows={id === "conditionAssessment" ? 4 : 2}
                                    />
                                </div>
                            ))}
            
                            <div className="mb-4">
                                <label htmlFor="revisitDate" className="form-label fw-semibold">
                                    Thời gian thăm khám lại <span className="text-muted">(không bắt buộc)</span>
                                </label>
                                <input
                                    id="revisitDate"
                                    name="revisitDate"
                                    type="datetime-local"
                                    className="form-control rounded-3"
                                    value={formData.revisitDate}
                                    onChange={handleChange}
                                />
                            </div>
            
                            <div className="d-flex justify-content-end gap-2">
                                <button onClick={onClose} className="btn btn-outline-secondary rounded-pill px-4">Hủy</button>
                                <button onClick={handleSubmit} className="btn btn-success rounded-pill px-4">Xác nhận</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col m-2 d-flex">
                    <div className="card border-0 shadow flex-fill">
                        <div className="card-header border-0 font-weight-bold text-center">
                            ĐƠN THUỐC
                        </div>
                        <div className="card-body">
                            <div className="row row-cols-4">
                                {medicines.map((medicine) => (
                                    <div className="p-1" key={medicine.id}>
                                        <div
                                            className={`col border rounded p-1 ${selected.some(item => item.id === medicine.id) ? 'bg-success text-white' : ''}`}
                                            onClick={() => handleSelectMedicine(medicine.id)}
                                            style={{
                                                cursor: 'pointer',
                                                transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.3s ease',
                                                transform: 'translateY(0)',
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                        >
                                            <small>{medicine.name}</small>
                                        </div>

                                        {/* Hiển thị input khi thuốc đã được chọn */}
                                        {selected.some(item => item.id === medicine.id) && (
                                            <div className="mt-1">
                                                <input
                                                    type="number"
                                                    id={`quantity-${medicine.id}`}
                                                    className="form-control"
                                                    min="1"
                                                    value={selected.find(item => item.id === medicine.id)?.quantity || 1} 
                                                    onChange={(e) => handleQuantityChange(medicine.id, e.target.value)}
                                                    placeholder="Nhập số lượng"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="card shadow">
                <div className="card-header text-center text-teal-600 fw-bold fs-4">
                    XÁC NHẬN HOÀN THÀNH & THANH TOÁN
                </div>
    
                <div className="card-body p-4">
                    
                </div>
            </div> */}
        </div>
    );
};

export default ConfirmVisitCompletionForm;