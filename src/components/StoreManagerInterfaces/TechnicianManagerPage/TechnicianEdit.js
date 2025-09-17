function TechnicianEdit({ tech, onChange, onUpdate, onClose, specialties }) {
	return (
		<div>
			<div className="d-flex justify-content-between align-items-center mb-2">
				<h5>Cập nhật thông tin KTV</h5>
				<button className="btn btn-secondary btn-sm" onClick={onClose}>X</button>
			</div>

			{/* Tên */}
			<div className="mb-2">
				<label className="form-label">Tên</label>
				<input
					className="form-control"
					value={tech.User.name}
					onChange={(e) =>
						onChange({ ...tech, User: { ...tech.User, name: e.target.value } })
					}
				/>
			</div>

			{/* SĐT */}
			<div className="mb-2">
				<label className="form-label">SĐT</label>
				<input
					className="form-control"
					value={tech.User.phone}
					onChange={(e) =>
						onChange({ ...tech, User: { ...tech.User, phone: e.target.value } })
					}
				/>
			</div>

			{/* Email */}
			<div className="mb-2">
				<label className="form-label">Email</label>
				<input
					className="form-control"
					value={tech.User.email}
					onChange={(e) =>
						onChange({ ...tech, User: { ...tech.User, email: e.target.value } })
					}
				/>
			</div>

			{/* Chuyên môn */}
			<div className="mb-3">
				<label className="form-label">Chuyên môn</label>
				<div className="d-flex flex-wrap">
					{specialties.map((sp) => (
						<div key={sp.specialty_id} className="form-check me-3 mb-2">
							<input
								className="form-check-input"
								type="checkbox"
								checked={tech.Specialties?.some((s) => s.specialty_id === sp.specialty_id)}
								onChange={(e) => {
									let updatedSpecialties;
									if (e.target.checked) {
										updatedSpecialties = [...(tech.Specialties || []), sp];
									} else {
										updatedSpecialties = tech.Specialties.filter(
											(s) => s.specialty_id !== sp.specialty_id
										);
									}
									onChange({ ...tech, Specialties: updatedSpecialties });
								}}
							/>
							<label className="form-check-label">{sp.name}</label>
						</div>
					))}
				</div>
			</div>

			{/* Nút cập nhật */}
			<button className="btn btn-primary w-100" onClick={onUpdate}>
				Cập nhật
			</button>
		</div>
	);
}

export default TechnicianEdit;
