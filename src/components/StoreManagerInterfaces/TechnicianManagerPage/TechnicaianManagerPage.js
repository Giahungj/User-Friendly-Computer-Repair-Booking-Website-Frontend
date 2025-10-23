import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { getAllTechniciansByManager, createTechnicianByManager, updateTechnicianByManager } from "../../../services/TechnicianService";
import { AuthContext } from "../../../context/AuthContext";
import { TextField } from "@mui/material";

import { AddButton } from "../../commons/ActionButtons";
import LoadingAndError from "../../commons/LoadingAndError";
import TechnicianTable from "./TechnicianTable";
import TechnicianDetail from "./TechnicianDetail";
import TechnicianAdd from "./TechnicianAdd";

const TechnicianManagerPage = () => {
	const { auth } = useContext(AuthContext);
	const storeManagerId = auth.user.storeManagerId;
	const storeId = auth.user.storeId;

	const [technicians, setTechnicians] = useState([]);
	const [specialties, setSpecialties] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [selectedTech, setSelectedTech] = useState(null);
	const [editTech, setEditTech] = useState(null);
	const [newTech, setNewTech] = useState({});
	const [search, setSearch] = useState("");

	const [activePanel, setActivePanel] = useState(null); // null | "view" | "add" | "edit"
	const [errors, setErrors] = useState({});

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const loadData = async () => {
		try {
			const res = await getAllTechniciansByManager(storeManagerId);
			if (!res.techData || res.techData.EC !== 0) {
				setError(true);
				setLoading(false);
				return;
			}
			if (!res.specData || res.specData.EC !== 0) {
				setError(true);
				setLoading(false);
				return;
			}
			setTechnicians(res.techData.DT);
			setFiltered(res.techData.DT);
			setSpecialties(res.specData.DT);
			setLoading(false);
		} catch (error) {
			console.error("Lỗi khi load dữ liệu:", error);
			setError(true);
			setLoading(false);
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	const handleSearch = (e) => {
        const s = e.target.value.toLowerCase();
        setSearch(s);
        setFiltered(
            technicians.filter(
                (t) =>
                    t.User.name.toLowerCase().includes(s) ||
                    t.User.phone.toLowerCase().includes(s) ||
                    t.User.email.toLowerCase().includes(s)
            )
        );
    };

	const validateNewTech = (tech, technicians) => {
		const newErrors = {};
		if (!tech.name?.trim()) newErrors.name = "Tên không được để trống";

		if (!tech.phone?.trim()) newErrors.phone = "Số điện thoại không được để trống";
		else if (!/^[0-9]{9,11}$/.test(tech.phone)) newErrors.phone = "Số điện thoại không hợp lệ";
		else if (technicians.some(t => t.User.phone === tech.phone)) 
			newErrors.phone = "Số điện thoại đã tồn tại";

		if (!tech.email?.trim()) newErrors.email = "Email không được để trống";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tech.email)) newErrors.email = "Email không hợp lệ";
		else if (technicians.some(t => t.User.email === tech.email)) 
			newErrors.email = "Email đã tồn tại";

		if (!tech.password?.trim()) newErrors.password = "Mật khẩu không được để trống";
		if (tech.password !== tech.confirmPassword) 
			newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";

		if (!tech.specialties || tech.specialties.length === 0) 
			newErrors.specialties = "Chọn ít nhất một chuyên môn";

		// kiểm tra ảnh
		if (!tech.avatar) newErrors.avatar = "Vui lòng chọn ảnh đại diện";
		else if (tech.avatar.size > 2 * 1024 * 1024) 
			newErrors.avatar = "Ảnh không được vượt quá 2MB";
		else if (!["image/jpeg", "image/png"].includes(tech.avatar.type)) 
			newErrors.avatar = "Ảnh phải là JPG hoặc PNG";

		return newErrors;
	};

	// Thêm kỹ thuật viên
	const handleAdd = async () => {
		const validationErrors = validateNewTech(newTech, technicians);
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		const payload = {
			storeId,
			name: newTech.name || null,
			email: newTech.email || null,
			phone: newTech.phone || null,
			password: newTech.password,
			avatar: newTech.avatar || null,
			specialties: newTech.specialties || []
		};

		try {
			const res = await createTechnicianByManager(storeManagerId, payload);
			if (res.EC === 0) {
				toast.success(res.EM);

				// Thêm vào state mà không reload
				loadData();
				setNewTech({}); // reset form
			} else {
				toast.error(res.EM);
			}
		} catch (err) {
			console.error("Lỗi khi tạo kỹ thuật viên:", err);
			toast.error("Tạo mới thất bại");
		}
	};

	if (loading) return <LoadingAndError.Loading />;
	if (error) return <LoadingAndError.Error message={error}  />;

	return (
		<div className="container py-5">
			<div className="card shadow-sm mb-3 border-0" style={{ background: "#6366f1", color: "#f8fafc" }}>
				<div className="card-body py-3 d-flex justify-content-between align-items-center">
					<h4 className="mb-0 fw-bold text-uppercase">Quản lý Kỹ thuật viên</h4>
					<AddButton onClick={() => setActivePanel("add")} />
				</div>
			</div>

			<div className="mb-3">
				<div className="card" style={{ backgroundColor: "#f8fafc" }}>
					<div className="card-body">
						Điều hướng
					</div>
				</div>
			</div>

			<div className="mb-3">
				<div className="card" style={{ backgroundColor: "#f8fafc" }}>
					<div className="card-body">
						<TextField
							label="Tìm kiếm tên"
							variant="outlined"
							size="small"
							fullWidth
							value={search}
							onChange={handleSearch}
						/>
					</div>
				</div>
			</div>

			<div className="row">
				<div className={`col ${activePanel ? "col" : "col-md-12"}`}>
					<TechnicianTable
						data={filtered}
						onView={(t) => { setSelectedTech(t); setActivePanel("view"); }}
						onEdit={(t) => { setSelectedTech(t); setActivePanel("edit"); }}
                        onDisable={(t) => { setSelectedTech(t); setActivePanel("view"); }}
					/>
				</div>

				{activePanel === "view" && selectedTech && (
					<div className="col-4">
						<TechnicianDetail
							tech={selectedTech}
							onClose={() => setActivePanel(null)}
						/>
					</div>
				)}

				{activePanel === "add" && (
					<div className="col-5">
						<TechnicianAdd
							newTech={newTech}
							onChange={setNewTech}
							onAdd={handleAdd}
							onClose={() => setActivePanel(null)}
							specialties={specialties}
							errors={errors}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default TechnicianManagerPage;
