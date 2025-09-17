function TechnicianAdd({ newTech, onChange, onAdd, onClose, specialties, errors = {} }) {
	const toggleSpecialty = (id) => {
		const current = newTech.specialties || [];
		const updated = current.includes(id)
			? current.filter(sid => sid !== id)
			: [...current, id];
		onChange({ ...newTech, specialties: updated });
	};

	return (
		<div>
			<div className="d-flex justify-content-between align-items-center mb-2">
				<h5>Thêm KTV mới</h5>
				<button className="btn btn-secondary btn-sm" onClick={onClose}>X</button>
			</div>

			<div className="mb-2">
				<label className="form-label">Tên</label>
				<input className="form-control" value={newTech.name}
					onChange={e => onChange({ ...newTech, name: e.target.value })} />
				{errors.name && <small className="text-danger">{errors.name}</small>}
			</div>

			<div className="mb-2">
				<label className="form-label">SĐT</label>
				<input className="form-control" value={newTech.phone}
					onChange={e => onChange({ ...newTech, phone: e.target.value })} />
				{errors.phone && <small className="text-danger">{errors.phone}</small>}
			</div>

			<div className="mb-2">
				<label className="form-label">Email</label>
				<input className="form-control" value={newTech.email}
					onChange={e => onChange({ ...newTech, email: e.target.value })} />
				{errors.email && <small className="text-danger">{errors.email}</small>}
			</div>

			<div className="mb-2">
				<label className="form-label">Hình ảnh</label>
				<input type="file" className="form-control"
					onChange={e => onChange({ ...newTech, avatar: e.target.files[0] })} />
				{errors.avatar && <small className="text-danger">{errors.avatar}</small>}
			</div>

			<div className="mb-2">
				<label className="form-label">Mật khẩu</label>
				<input type="password" className="form-control" value={newTech.password || ""}
					onChange={e => onChange({ ...newTech, password: e.target.value })} />
				{errors.password && <small className="text-danger">{errors.password}</small>}
			</div>

			<div className="mb-2">
				<label className="form-label">Xác nhận mật khẩu</label>
				<input type="password" className="form-control" value={newTech.confirmPassword || ""}
					onChange={e => onChange({ ...newTech, confirmPassword: e.target.value })} />
				{errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
			</div>

			<div className="mb-2">
				<label className="form-label">Chuyên môn</label>
				<div className="d-flex flex-wrap">
					{specialties.map(sp => (
						<div key={sp.specialty_id} className="form-check me-3">
							<input
								className="form-check-input"
								type="checkbox"
								checked={(newTech.specialties || []).includes(sp.specialty_id)}
								onChange={() => toggleSpecialty(sp.specialty_id)}
							/>
							<label className="form-check-label">
								{sp.name}
							</label>
						</div>
					))}
				</div>
				{errors.specialties && <small className="text-danger">{errors.specialties}</small>}
			</div>

			<button className="btn btn-primary w-100" onClick={onAdd}>Thêm</button>
		</div>
	);
}

export default TechnicianAdd;
