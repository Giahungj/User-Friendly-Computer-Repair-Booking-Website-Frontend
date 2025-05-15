import { useEffect, useState, useContext } from 'react';
import './Login.scss'
//import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify'
import { loginUser } from '../../services/AuthService';
import { AuthContext } from '../../context/AuthContext';

const Login = (props) => {
    const { loginContext } = useContext(AuthContext);
    const location = useLocation(); 
    let history = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const HandleCreateNewPatientAccount = () => {
        history('/register')
    }

    const HandleCreateNewDoctorAccount = () => {
        history('/register-doctor/step1')
    }

    const handleLogin = async () => {
        if (!email) {
            toast.error("Vui lòng nhập Email!");
            return;
        }
        if (!password) {
            toast.error("Vui lòng nhập mật khẩu!");
            return;
        }
        try {
            const response = await loginUser(email, password);
            if (+response.EC === 0) {
                const { email, name, access_token: token, userType, id, patientId, doctorId, avatar, serviceId } = response.DT;
                const data = {
                    isAuthenticated: true,
                    token: token,
                    account: { email, name, userType, id, avatar, serviceId }
                };
                // Kiểm tra nếu có doctorId thì thêm vào, nếu không thì thêm patientId
                if (doctorId) {
                    data.account.doctorId = doctorId;
                } else if (patientId) {
                    data.account.patientId = patientId;
                }
                loginContext(data);
                const from = location.state?.from || '/';
                history(from);
            } else {
                toast.error(response.EM);
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    const handlePressEnter = (event) => {
        if (event.code === "Enter") {
            handleLogin()
        }
    }

    return (
        <div className="login-container">
            <div className="container">
                <div className="row px-4">
                    <div className="contain-left col-12 d-none col-sm-7 d-sm-block">
                        <div className='title'>

                        </div>
                        <div className='detail'>

                        </div>
                    </div>
                    <div className="contain-right col-12 col-sm-5 d-flex flex-column gap-3 py-3 ">
                        <div className='title d-sm-none'>
                            FaceBook
                        </div>
                        <input
                            value={email} type='text' className='form-control' placeholder='Enter your Email'
                            onChange={(event) => { setEmail(event.target.value) }}
                            onKeyUp={(event) => { handlePressEnter(event) }}
                        />
                        <input
                            value={password} type='password' className='form-control' placeholder='Enter your Password'
                            onChange={(event) => { setPassword(event.target.value) }}
                            onKeyUp={(event) => { handlePressEnter(event) }}
                        />
                        <button onClick={() => { handleLogin() }} type='password' className='btn btn-primary'

                        >
                            Đăng nhập
                        </button>
                        <span className='text-center'><a href='/forgot-password' className='forgot-password'>Quên mật khẩu</a></span>
                        <hr />
                        <div className='text-center'>
                            <button onClick={() => HandleCreateNewPatientAccount()} className='btn btn-success me-2'>
                                Đăng ký bệnh nhân
                            </button>
                            <button onClick={() => HandleCreateNewDoctorAccount()} className='btn btn-primary'>
                                Đăng ký bác sĩ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;