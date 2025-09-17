import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

const NotAllow = () => {
    const navigate = useNavigate();

    return (
        <div className="container text-center py-5">
            <h1 className="display-2 text-danger">403</h1>
            <p className="lead">Bạn không được phép truy cập trang này.</p>
            <div className="d-flex justify-content-center gap-3 mt-3">
                <Button variant="contained" onClick={() => navigate('/')}>
                    Về trang chủ
                </Button>
                <Button variant="outlined" onClick={() => navigate(-1)}>
                    Quay lại trang trước
                </Button>
            </div>
        </div>
    );
};

export default NotAllow;
