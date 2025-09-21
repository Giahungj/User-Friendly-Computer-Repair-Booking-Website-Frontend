const TechnicianRepairBookingActions = ({ onStart, onComplete, onCancel }) => {
	return (
		<div className="d-flex gap-2">
			<button className="btn btn-sm btn-primary" onClick={onStart}>Bắt đầu</button>
			<button className="btn btn-sm btn-success" onClick={onComplete}>Hoàn thành</button>
			<button className="btn btn-sm btn-danger" onClick={onCancel}>Hủy</button>
		</div>
	);
};

export default TechnicianRepairBookingActions;
