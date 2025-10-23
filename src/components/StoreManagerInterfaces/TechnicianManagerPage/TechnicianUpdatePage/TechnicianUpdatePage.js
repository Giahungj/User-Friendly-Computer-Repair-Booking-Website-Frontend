import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthContext";
import { Box, Tabs, Tab } from "@mui/material";
import {
  getTechnicianById,
  updateBasicInfoByManager,
  updateSpecialtiesByManager,
  createTechnicianTransferRequestByStoreManager
} from "../../../../services/TechnicianService";
import BasicInfoForm from "./BasicInfoForm";
import SpecialtiesForm from "./SpecialtiesForm";
import StoreAssignmentForm from "./StoreAssignmentForm";
import LoadingAndError from "../../../commons/LoadingAndError";
import { BackButton } from "../../../commons/ActionButtons";

const CustomTabPanel = ({ children, value, index }) => {
	return (
		<div role="tabpanel" hidden={value !== index}>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

const TechnicianEditPage = () => {
	const { auth } = useContext(AuthContext);
	const storeManagerId = auth.user.storeManagerId;
	const { technicianId } = useParams();

	const [tech, setTech] = useState(null);
	const [spec, setSpec] = useState(null);

	const [basicInforUpdate, setBasicInforUpdate] = useState(null);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [tabIndex, setTabIndex] = useState(0);
	
	const getTechnicianData = async () => {
		try {
			const res = await getTechnicianById(technicianId);
			if (res.EC === 0) {
				setTech(res.DT.technician);
				setSpec(res.DT.Specialties);
			} else {
				toast.error(res.EM);
				setError(res.EM);
			}
		} catch (err) {
			console.error(err);
			toast.error("Lỗi khi tải thông tin kỹ thuật viên");
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getTechnicianData();
	}, [technicianId]);

	const handleChange = (event, newValue) => setTabIndex(newValue);

	const handleUpdatTechBasicInfo = async(basicInforUpdate) => {
		setLoading(true);
		try {
			const res = await updateBasicInfoByManager(storeManagerId, technicianId, basicInforUpdate);
			if (res.EC === 0) {
				toast.success(res.EM || "Cập nhật thành công!");
				getTechnicianData();
			} else if (res.EC === 1) {
				toast.warn(res.EM || "Cảnh báo!");
			} else {
				toast.error(res.EM  || "Lỗi cập nhật!");
				setError(res.EM  || "Lỗi cập nhật!");
			}
		} catch (error) {
			console.error(error)
			toast.error("Lỗi không cập nhật được thông tin cơ bản kỹ thuật viên! Vui lòng kiểm tra mạng và thử lại sau.");
		} finally {
			setLoading(false);
		}
	}

	const handleUpdatSpecialties = async(specialtiesUpdate) => {
		setLoading(true);
		try {
			const res = await updateSpecialtiesByManager(storeManagerId, technicianId, specialtiesUpdate);
			if (res.EC === 0) {
				toast.success(res.EM || "Cập nhật thành công!");
				getTechnicianData();
			} else if (res.EC === 1) {
				toast.warn(res.EM || "Cảnh báo!");
			} else {
				toast.error(res.EM  || "Lỗi cập nhật!");
				setError(res.EM  || "Lỗi cập nhật!");
			}
		} catch (error) {
			console.error(error)
			toast.error("Lỗi không cập nhật được chuyên môn kỹ thuật viên! Vui lòng kiểm tra mạng và thử lại sau.");
		} finally {
			setLoading(false);
		}
	}

	const handleTechnicianTransferRequestByStoreManager = async(transferRequestData) => {
		setLoading(true);
		try {
			const res = await createTechnicianTransferRequestByStoreManager(storeManagerId, technicianId, transferRequestData);
			if (res.EC === 0) {
				toast.success(res.EM || "Gửi yêu cầu thành công!");
				getTechnicianData();
			} else if (res.EC === 1) {
				toast.warn(res.EM || "Cảnh báo!");
			} else {
				toast.error(res.EM  || "Lỗi cập nhật!");
				setError(res.EM  || "Lỗi cập nhật!");
			}
		} catch (error) {
			console.error(error)
			toast.error("Lỗi không gửi được yêu cầu đổi cửa hàng của kỹ thuật viên! Vui lòng kiểm tra mạng và thử lại sau.");
		} finally {
			setLoading(false);
		}
	}

	if (loading) return <LoadingAndError.Loading />;
	if (error) return <LoadingAndError.Error message={error}  />;
	
	return (
		<div className="container py-5">
			<div className="card shadow-sm mb-3 border-0" style={{ background: "#6366f1", color: "#f8fafc" }}>
				<div className="card-body py-3 d-flex justify-content-between align-items-center">
					<h4 className="mb-0 fw-bold text-uppercase">cập nhật thông tin kỹ thuật viên</h4>
					<BackButton onClick={() => window.history.back()}/>
				</div>
			</div>

			<Tabs value={tabIndex} onChange={handleChange}>
				<Tab label="Thông tin cơ bản" />
				<Tab label="Chuyên môn" />
				<Tab label="Cửa hàng" />
			</Tabs>

			<CustomTabPanel value={tabIndex} index={0}>
				<BasicInfoForm
					tech={tech}
					onUpdateBasicInfo={(updatedData) => handleUpdatTechBasicInfo(updatedData)}
				/>
			</CustomTabPanel>
			<CustomTabPanel value={tabIndex} index={1}>
				<SpecialtiesForm 
					spec={spec}
					onUpdateSpecialties={(updatedData) => handleUpdatSpecialties(updatedData)}
				/>
			</CustomTabPanel>
			<CustomTabPanel value={tabIndex} index={2}>
				<StoreAssignmentForm 
					store={tech.Store}
					onSubmitRequest={(updatedData) => handleTechnicianTransferRequestByStoreManager(updatedData)}
				/>
			</CustomTabPanel>
		</div>
	);
}

export default TechnicianEditPage;
