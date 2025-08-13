import { Button } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateRepairBooking } from "../../../../services/RepairBookingService";
import "./UpdateBookingModal.scss";
function UpdateBookingModal({ open, onClose, booking, bookingId }) {
	const brands = ["Dell", "HP", "Lenovo", "Asus", "Acer", "Apple", "Canon", "Epson", "Brother", "Samsung"];
	const devices = ['Laptop', 'PC', 'Máy in', 'Điện thoại'];
	const [file, setFile] = useState(null);
	const [initialData, setInitialData] = useState({});
	const [deviceType, setDeviceType] = useState("");
	const [model, setModel] = useState("");
	const [selectedBrand, setSelectedBrand] = useState("");
	const [customBrand, setCustomBrand] = useState("");
	const [issueDescription, setIssueDescription] = useState("");

	const [loading, setLoading] = useState(false);
	useEffect(() => {
		console.log(booking);
		if (open && booking) {
			const data = {
				deviceType: booking.device_type,
				model: booking.model,
				brand: booking.brand,
				issueDescription: booking.issue_description,
				issueImage: booking.issue_image,
			};
			setInitialData(data);
			setDeviceType(!devices.includes(data.deviceType) ? data.deviceType : "");
			setModel(data.model);
			setSelectedBrand(brands.includes(data.brand) ? data.brand : "");
			setCustomBrand(!brands.includes(data.brand) ? data.brand : "");
			setIssueDescription(data.issueDescription);
			setFile(data.issueImage); 
		}
		document.body.classList.toggle('modal-open', open);
		return () => {
			document.body.classList.remove('modal-open');
		};
	}, [open, booking]);

	const finalBrand = customBrand || selectedBrand;
	const isChanged = (
		deviceType !== initialData.device_type ||
		model !== initialData.model ||
		finalBrand !== initialData.brand ||
		issueDescription !== initialData.issue_description ||
		file !== initialData.issue_image
	);

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		if (selectedFile) setFile(selectedFile);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!file || !deviceType || !model || !finalBrand) return toast.warn("Vui lòng nhập nội dung cập nhật.");
		setLoading(true);
		try {
			const res = await updateRepairBooking(bookingId, { issueImage: file, deviceType, model, brand: finalBrand, issueDescription });
			setTimeout(() => {
				if (res.EC === 0) {
					toast.success("Cập nhật lịch hẹn thành công!");
					// window.location.reload();
				} else toast.error(res.EM || "Cập nhật lịch hẹn thất bại.");
				setLoading(false);
			}, 800);
		} catch (err) {
			toast.error("Có lỗi xảy ra khi cập nhật.");
			setLoading(false);
		}
	};

	return (
		<div className={`modal fade ${open ? "show d-block" : ""}`} tabIndex="-1" role="dialog" style={{ backdropFilter: "blur(4px)", backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
			<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
				<div className="modal-content border-0 shadow rounded-4 p-4">
					<div className="modal-header rounded text-white" style={{ backgroundColor: "#2196f3" }}>
						<h5 className="modal-title">Cập nhật lịch hẹn #{bookingId}</h5>
						<button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
					</div>

					<div className="modal-body">
						<div className="row">
							<div className="col-md-6">
								<div className="mb-3 ps-3" style={{ borderLeft: "3px solid #2196f3" }}> 
									<label className="form-label">Thiết bị</label>
									<div className="d-flex flex-wrap gap-2 mb-2">
										{devices.map((d) => (
											<Button 
												key={d} 
												variant={deviceType === d ? "contained" : "outlined"} 
												onClick={() => { setDeviceType(d) }} 
												sx={{ minWidth: "100px", borderRadius: "5px" }}
											>
												{d}
											</Button>
										))}
									</div>
								</div>

								<div className="mb-3 ps-3" style={{ borderLeft: "3px solid #2196f3" }}> 
									<label className="form-label">Model</label>
									<input
										type="text"
										className="form-control"
										placeholder="Nhập model"
										list="modelSuggestions"
										value={model}
										onChange={(e) => setModel(e.target.value)}
									/>
									<datalist id="modelSuggestions">
										<option value="MacBook Pro 2021" />
										<option value="Dell XPS 13" />
										<option value="HP LaserJet 1020" />
										<option value="Lenovo ThinkPad X1" />
										<option value="Asus ROG Zephyrus" />
										<option value="Acer Aspire 7" />
										<option value="Canon LBP 2900" />
										<option value="Epson L3150" />
										<option value="iPhone 14 Pro" />
										<option value="Samsung Galaxy S23" />
									</datalist>
									<small className="text-muted">Gõ vài ký tự để hiện gợi ý model phổ biến</small>
								</div>

								<div className="mb-3 ps-3" style={{ borderLeft: "3px solid #2196f3" }}> 
									<label className="form-label">Thương hiệu</label>
									<div className="d-flex flex-wrap gap-2 mb-2">
										{brands.map((b) => (
											<Button key={b} variant={selectedBrand === b ? "contained" : "outlined"} onClick={() => { setSelectedBrand(b); setCustomBrand(""); }} sx={{ minWidth: "100px", borderRadius: "5px" }}>{b}</Button>
										))}
									</div>
									<input type="text" className="form-control" placeholder="Hoặc nhập thương hiệu khác..." value={customBrand} onChange={(e) => { setCustomBrand(e.target.value); setSelectedBrand(""); }} />
								</div>
							</div>

							<div className="col-md-6">
								<div className="mb-3 ps-3" style={{ borderLeft: "3px solid #2196f3" }}> 
									<label className="form-label">Mô tả sự cố:</label>
									<textarea className="form-control" rows="2" value={issueDescription} onChange={(e) => setIssueDescription(e.target.value)} />
								</div>

								<div className="mb-3 ps-3" style={{ borderLeft: "3px solid #2196f3" }}> 
									<label className="form-label">Ảnh sự cố</label>
									{file ? (
										<img src={typeof file === "string" ? `http://localhost:8080/images${file}` : URL.createObjectURL(file)} alt="Mô tả lỗi" className="img-fluid rounded border mb-2 form-control" style={{ maxHeight: "180px", objectFit: "contain", backgroundColor: "#fff" }} />
									) : <p className="text-muted">Không có hình ảnh</p>}
									<input type="file" className="form-control" onChange={handleFileChange} />
								</div>
							</div>
						</div>
					</div>

					<div className="modal-footer d-flex justify-content-between">
						<Button variant="outlined" color="inherit" onClick={onClose} sx={{ borderRadius: "50px", px: 3 }}>Đóng</Button>
						<Button
							type="submit"
							className="rounded-pill"
							variant="contained"
							onClick={handleSubmit}
							sx={{ minWidth: "140px", backgroundColor: "#1976d2" }}
							disabled={loading || !isChanged}
						>
							{loading ? (
								<span className="spinner-border spinner-border-sm text-light me-2" role="status"></span>
							) : (
								<UpdateIcon fontSize="small" className="me-2" />
							)}
							Cập nhật
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UpdateBookingModal;
