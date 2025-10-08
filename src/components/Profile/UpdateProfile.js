import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { fetchUserProfileData } from "../../services/AccountService";
import { updateCurrentUser } from "../../services/userService";
import { Skeleton, Button, TextField } from '@mui/material';

const UpdateProfile = () => {
    const { auth } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(""); 
    const [phone, setPhone] = useState(""); 
    const [email, setEmail] = useState(""); 
    
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const res = await fetchUserProfileData(auth.user.email);
                if (res.EC === 0) {
                    const { name, avatar, phone, email} = res.DT;
                    setPhone(phone || "");
                    setEmail(email || "");
                    setName(name || "");
                    setAddress(address || "");
                    setPreview(avatar ? `http://localhost:8080/images/${avatar}` : "http://localhost:8080/images/user.png");
                } else {
                    toast.error(res.EM);
                }
            } catch (error) {
                toast.error("Không thể tải dữ liệu hồ sơ!");
            } finally {
                setLoading(false); // Kết thúc loading dù thành công hay thất bại
            }
            };
        fetchProfile();
    }, [auth.user.email]);

    const validate = () => {
        let newErrors = {};
        if (!name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
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
            formData.append("email", email);
            formData.append("name", name);
            formData.append("phone", phone);
            if (avatar) formData.append("avatar", avatar);

            const response = await updateCurrentUser(formData);
            if (response.EC === 0) {
                const { name, address, avatar } = response.DT;
                setName(name || "");
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
            <div className="card shadow-sm p-3 w-100" style={{ maxWidth: "40em" }}>
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
                    <div className="mb-1">
                        <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                        >
                            Chọn ảnh
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleFileChange}
                            />
                        </Button>
                    </div>

                    {/* Họ và Tên */}
                    <TextField
                        label="Họ và tên"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={!!errors.name}
                        helperText={errors.name}
                    />

                    {/* Số điện thoại */}
                    <TextField
                        label="Số điện thoại"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        error={!!errors.phone}
                        helperText={errors.phone}
                    />

                    {/* Email */}
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                    />

                    {/* Nút cập nhật */}
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: "#1ec3dcff",
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#158798ff",
                            }
                        }}
                        className="rounded w-100"
                        disabled={loading}
                    >
                        {loading ? "Đang xử lý..." : "Cập nhật"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
