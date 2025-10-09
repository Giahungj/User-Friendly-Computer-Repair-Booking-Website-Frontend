import StoreIcon from "@mui/icons-material/Store";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import LoadingAndError from "../../commons/LoadingAndError";


const StoreInfo = ({ store = {}, loading = false, error = null }) => {
	if (loading) return <LoadingAndError.Loading />;
	if (error) return <LoadingAndError.Error message={error} />;

	const {
		name = "Không rõ tên",
		address = "Không rõ địa chỉ",
		phone = "Không rõ số điện thoại",
	} = store;

	return (
        <div className="card border-0 p-3 mb-4">
            <div className="lead text-center mb-3">Thông tin của cửa hàng</div>
            <div className="card shadow-sm p-3 mb-4">
                <div className="d-flex align-items-center">
                    <StoreIcon style={{ fontSize: 70, marginRight: 16, color: '#1976d2' }} />
                    <div className="flex-grow-1">
                        <h5 className="mb-1 fw-bold">{name}</h5>
                        <small className="text-muted d-block">{address}</small>
                        <small className="text-muted d-block">
                            <PhoneInTalkIcon fontSize="small" className="me-1" />
                            {phone}
                        </small>
                    </div>
                </div>
            </div>
        </div>
	);
};

export default StoreInfo;
