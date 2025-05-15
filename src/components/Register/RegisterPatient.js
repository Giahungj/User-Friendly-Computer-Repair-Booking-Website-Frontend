import { useState, useEffect } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerPatient } from '../../services/AuthService'; // Giả sử bạn có service registerPatient
import { checkEmail } from '../../services/AuthService';

import { TextField, InputAdornment, inputBaseClasses, Button, IconButton, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const RegisterPatient = (props) => {
    let history = useNavigate();

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassworddError, setConfirmErrorPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [street, setStreet] = useState("");  // Số nhà / Đường
    const [ward, setWard] = useState("");      // Phường / Xã
    const [district, setDistrict] = useState(""); // Quận / Huyện
    const [city, setCity] = useState("");      // Thành phố
    const [address, setAddress] = useState(""); // Địa chỉ tổng hợp
    const [phone, setPhone] = useState("");
    const [sex, setSex] = useState("");
    const [dob, setDob] = useState("");
    const [citizenId, setCitizenId] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseUpConfirmPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => { 
        setAddress(`${street}, ${ward}, ${district}, ${city}`.replace(/(, )+/g, ', ').trim())
    }, [street, ward, district, city]);
    
    const handleCheckEmail = async (email) => {
        try {
            const response = await checkEmail(email);
            if (+response.EC === 1) {
                setEmailError("Email đã tồn tại")
                return false
            } else {
                setEmailError("")
                return true
            }
        } catch (error) {
            console.error("Lỗi kiểm tra email:", error);
            setEmailError("Có lỗi xảy ra khi kiểm tra email.");
        }
    }; // Không kiểm tra nếu email trốngreturn;
    const handleRegister = async () => {
        if (!email || !password || !name || !confirmPassword || !address || !phone || !sex || !citizenId || !dob) {
            toast.error("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        const validateEmail = await handleCheckEmail(email + '@gmail.com')
        if (!validateEmail) { return }

        if (password !== confirmPassword) {
            setConfirmErrorPassword("Mật khẩu không khớp! Vui lòng nhập lại")
            return;
        }

        try {
            const response = await registerPatient(email + '@gmail.com', password, name, address, phone, citizenId, sex, dob);
            console.log(response)
            if (response.EC === 0) {
                toast.success(response.EM);
                console.log(response.DT);
                history("/login");
            } else {
                toast.error(response.EM);
            }
        } catch (error) {
            toast.error("An error occurred, please try again!");
        }
    };

    const handlePressEnter = (event) => {
        if (event.code === "Enter") {
            handleRegister();
        }
    };

    return (
        <div className="register-container">
            <div className="container">
                <div className="row px-4">
                    {/* Cột trái - Giới thiệu */}
                    <div className="contain-left col-12 d-none col-sm-7 d-sm-block">
                        <div className="title">Đăng ký tài khoản</div>
                        <div className="detail mb-2">Tạo tài khoản để sử dụng các dịch vụ tốt nhất</div>
                        <Button variant="outlined" onClick={() => history(-1)} startIcon={<ArrowBackIcon />}                        >
                            Quay lại đăng nhập
                        </Button>
                    </div>

                    {/* Cột phải - Form đăng ký */}
                    <div className="contain-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
                        {/* Nhóm thông tin cá nhân */}
                        <h6 className="text-primary">Thông tin cá nhân</h6>
                        <TextField label="Họ và Tên" variant="standard" value={name} onChange={(e) => setName(e.target.value)} onKeyUp={handlePressEnter} />
                        <TextField label="Giới tính" variant="standard"
                            InputProps={{
                                startAdornment: (
                                    <RadioGroup row value={sex} onChange={(e) => setSex(e.target.value)}>
                                        <FormControlLabel value="1" control={<Radio />} label="Nam" />
                                        <FormControlLabel value="0" control={<Radio />} label="Nữ" />
                                    </RadioGroup>
                                ),
                            }}
                        />
                        <TextField label="Số điện thoại" variant="standard" value={phone} onChange={(event) => setPhone(event.target.value)} onKeyUp={handlePressEnter}/>
                        <TextField label="Số nhà / Đường" variant="standard" value={street} onChange={(e) => setStreet(e.target.value)} handlePressEnter />
                        <TextField label="Phường / Xã" variant="standard" value={ward} onChange={(e) => setWard(e.target.value)} handlePressEnter />
                        <TextField label="Quận / Huyện" variant="standard" value={district} onChange={(e) => setDistrict(e.target.value)} handlePressEnter />
                        <TextField label="Thành phố" variant="standard" value={city} onChange={(e) => setCity(e.target.value)} handlePressEnter />
                        <TextField label="Ngày sinh" type="date" variant="standard" value={dob} onChange={(e) => setDob(e.target.value)} onKeyUp={handlePressEnter} InputLabelProps={{ shrink: true }} />
                        <TextField label="CCCD" variant="standard" value={citizenId} onChange={(event) => setCitizenId(event.target.value)} onKeyUp={handlePressEnter}/>
                        {/* Nhóm thông tin đăng nhập */}
                        <h6 className="text-primary">Thông tin đăng nhập</h6>
                        <TextField label="Email" type="email" error={!!emailError} helperText={emailError} variant="standard" value={email} 
                        onChange={(event) => setEmail(event.target.value)}
                            slotProps={{
                            htmlInput: {
                                sx: { textAlign: 'right' },
                            }, input: {
                                endAdornment: (
                                <InputAdornment
                                    position="end"
                                    sx={{ alignSelf: 'flex-end', margin: 0, marginBottom: '5px', opacity: 0, pointerEvents: 'none',
                                    [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                                        opacity: 1,
                                    },
                                    }}
                                >
                                    @gmail.com
                                </InputAdornment>
                                ),
                            },
                            }}
                        />
                        <TextField label="Mật khẩu" variant="standard" value={password} type={showPassword ? "text" : "password"}
                            onChange={(event) => setPassword(event.target.value)} onKeyUp={handlePressEnter}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField label="Xác nhận mật khẩu" variant="standard" error={!!confirmPassworddError} helperText={confirmPassworddError} value={confirmPassword} type={showConfirmPassword ? "text" : "password"}
                            onChange={(event) => setConfirmPassword(event.target.value)} onKeyUp={handlePressEnter}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownConfirmPassword}
                                            onMouseUp={handleMouseUpConfirmPassword}
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {/* Nút đăng ký */}
                        <Button variant="contained" onClick={handleRegister}>Đăng ký ngay</Button>
                    </div>
                </div>
            </div>
</div>
    );
};

export default RegisterPatient;