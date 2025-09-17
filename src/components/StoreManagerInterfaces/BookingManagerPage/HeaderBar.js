import { Button } from "@mui/material";

function HeaderBar({ onToday, onThisWeek, onAll }) {
	return (
		<div className="d-flex justify-content-end align-items-center mb-3">
			<div className="d-flex gap-2">
				<Button variant="outlined" onClick={onToday}>Hôm nay</Button>
				<Button variant="outlined" onClick={onThisWeek}>Tuần này</Button>
				<Button variant="outlined" onClick={onAll}>Tất cả</Button>
			</div>
		</div>
	);
}

export default HeaderBar;
