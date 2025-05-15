import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { fetchUserProfile } from "../../services/AccountService";
import { updateCurrentUser } from "../../services/userService";
import { Skeleton } from '@mui/material';

const UpdateProfile = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [sex, setSex] = useState("");
    const [address, setAddress] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(""); // Ảnh xem trước
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true); // Bắt đầu loading
            try {
                const response = await fetchUserProfile(auth.account.email);
                if (response.EC === 0) {
                    const { name, sex, address, avatar } = response.DT;
                    console.log("Sex from API:", sex, typeof sex)
                    setName(name || "");
                    setSex(sex !== undefined ? sex.toString() : "");
                    setAddress(address || "");
                    setPreview(avatar ? `http://localhost:8080/images/uploads/${avatar}` : "http://localhost:8080/images/user.png");
                } else {
                    toast.error(response.EM);
                }
            } catch (error) {
                toast.error("Không thể tải dữ liệu hồ sơ!");
            } finally {
                setLoading(false); // Kết thúc loading dù thành công hay thất bại
            }
            };
        fetchProfile();
    }, [auth.account.email]);

    const validate = () => {
        let newErrors = {};
        if (!name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
        if (!sex.trim()) newErrors.sex = "Giới tính không hợp lệ";
        if (!address.trim()) newErrors.address = "Vui lòng nhập địa chỉ";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            setPreview(URL.createObjectURL(file)); // Xem trước ảnh
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            toast.error("Vui lòng kiểm tra lại thông tin");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("email", auth.account.email);
            formData.append("name", name);
            formData.append("sex", sex);
            formData.append("address", address);
            if (avatar) formData.append("avatar", avatar);

            const response = await updateCurrentUser(formData);
            if (response.EC === 0) {
                const { name, sex, address, avatar } = response.DT;
                setName(name || "");
                setSex(sex !== undefined ? sex.toString() : "");
                setAddress(address || "");
                setPreview(avatar ? `http://localhost:8080/images/uploads/${avatar}` : "http://localhost:8080/images/user.png");
                toast.success("Cập nhật thông tin thành công!");
            } else {
                toast.error(response.EM);
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại!");
            console.error(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center py-4 min-vh-100">
            <div className="bg-white p-4 border rounded shadow w-100" style={{ maxWidth: "40em" }}>
                <h2 className="text-center mb-4">Cập nhật hồ sơ</h2>
                <p className="text-muted text-center mb-4 small">Cập nhật thông tin cá nhân và ảnh đại diện.</p>
                <div className="text-center mb-3">
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Skeleton variant="circular" animation="wave" width={220} height={220} />
                        </div>
                    ) : (
                        <img
                        src={preview}
                        alt="Avatar Preview"
                        className="rounded-pill"
                        width="220"
                        height="220"
                        />
                    )}
                </div>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* Upload ảnh đại diện */}
                    <div className="mb-3">
                        <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            onChange={handleFileChange}
                        />
                    </div>

                    {/* Họ và Tên */}
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                            id="floatingName"
                            placeholder="Họ và tên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="floatingName">Họ và tên</label>
                        {errors.name && <p className="text-danger small">{errors.name}</p>}
                    </div>

                    {/* Giới tính */}
                    <div className="form-floating mb-3">
                        <select
                            key={sex} // Buộc re-render khi sex thay đổi
                            className="form-select"
                            id="floatingSex"
                            value={sex.toString()}
                            onChange={(e) => setSex(e.target.value)}
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="1">Nam</option>
                            <option value="0">Nữ</option>
                        </select>
                        <label htmlFor="floatingSex">Giới tính</label>
                        {errors.sex && <p className="text-danger small">{errors.sex}</p>}
                    </div>


                    {/* Địa chỉ */}
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className={`form-control ${errors.address ? "is-invalid" : ""}`}
                            id="floatingAddress"
                            placeholder="Địa chỉ"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <label htmlFor="floatingAddress">Địa chỉ</label>
                        {errors.address && <p className="text-danger small">{errors.address}</p>}
                    </div>

                    {/* Nút cập nhật */}
                    <button type="submit" className="btn btn-info text-white rounded-0 w-100" disabled={loading}>
                        {loading ? "Đang xử lý..." : "Cập nhật"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
