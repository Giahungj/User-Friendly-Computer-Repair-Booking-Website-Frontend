import { TextField, Stack, FormGroup, FormControlLabel, Checkbox, FormLabel } from "@mui/material";
import { BackButton, ConfirmButton, FileButton } from "../../commons/ActionButtons";
import { toast } from "react-toastify";

const TechnicianAdd = ({ newTech, onChange, onAdd, onClose, specialties, errors = {} }) => {
	const toggleSpecialty = (id) => {
		const current = newTech.specialties || [];

		// Nếu đã chọn 3 và người dùng muốn chọn thêm
		if (current.length >= 3 && !current.includes(id)) {
			toast.warning("Chỉ được chọn tối đa 3 chuyên môn");
			return;
		}

		const updated = current.includes(id)
			? current.filter(sid => sid !== id)
			: [...current, id];

		onChange({ ...newTech, specialties: updated });
	};


	return (
		<div>
			<div className="card" style={{ backgroundColor: "#f8fafc" }}>
				<div className="card-body">
					<div className="d-flex justify-content-between align-items-center my-2 mb-2">
						<h5 className="m-0 fw-bold text-uppercase" style={{ color: "#6366f1" }}>Thêm KTV mới</h5>
						<BackButton size="small" onClick={onClose} />
					</div>

					<div className="mb-3">
					<TextField
						fullWidth
						label="Tên"
						value={newTech.name}
						onChange={e => onChange({ ...newTech, name: e.target.value })}
						error={!!errors.name}
						helperText={errors.name}
					/>
					</div>

					<div className="mb-3">
					<TextField
						fullWidth
						label="SĐT"
						value={newTech.phone}
						onChange={e => onChange({ ...newTech, phone: e.target.value })}
						error={!!errors.phone}
						helperText={errors.phone}
					/>
					</div>

					<div className="mb-3">
					<TextField
						fullWidth
						label="Email"
						value={newTech.email}
						onChange={e => onChange({ ...newTech, email: e.target.value })}
						error={!!errors.email}
						helperText={errors.email}
					/>
					</div>

					<div className="mb-3">
						<Stack direction="row" spacing={1} alignItems="center" className="mb-2">
						<TextField
							fullWidth
							label="Hình ảnh"
							value={newTech.avatar?.name || ""}
							InputProps={{ readOnly: true }}
							error={!!errors.avatar}
							helperText={errors.avatar}
						/>
						<input
							type="file"
							id="upload-avatar"
							hidden
							onChange={e => onChange({ ...newTech, avatar: e.target.files[0] })}
						/>
						<label htmlFor="upload-avatar">
							<FileButton size="small" onClick={() => document.querySelector('input[type="file"]').click()} />
						</label>
						</Stack>
					</div>

					<div className="mb-3">
						<TextField
							fullWidth
							type="password"
							label="Mật khẩu"
							value={newTech.password || ""}
							onChange={e => onChange({ ...newTech, password: e.target.value })}
							error={!!errors.password}
							helperText={errors.password}
						/>
					</div>

					<div className="mb-3">
						<TextField
							fullWidth
							type="password"
							label="Xác nhận mật khẩu"
							value={newTech.confirmPassword || ""}
							onChange={e => onChange({ ...newTech, confirmPassword: e.target.value })}
							error={!!errors.confirmPassword}
							helperText={errors.confirmPassword}
						/>
					</div>

					<div className="mb-3">
						<FormLabel>Chuyên môn</FormLabel>
						<FormGroup row>
							{specialties.map(sp => (
								<FormControlLabel
								key={sp.specialty_id}
								control={
									<Checkbox
									checked={(newTech.specialties || []).includes(sp.specialty_id)}
									onChange={() => toggleSpecialty(sp.specialty_id)}
									/>
								}
								label={sp.name}
								/>
							))}
						</FormGroup>
						{errors.specialties && <small className="text-danger">{errors.specialties}</small>}
					</div>
					<div className="d-flex justify-content-center">
						<ConfirmButton onClick={onAdd}>Thêm</ConfirmButton>
					</div>
				</div>
			</div>

			

			
		</div>
	);
}

export default TechnicianAdd;
