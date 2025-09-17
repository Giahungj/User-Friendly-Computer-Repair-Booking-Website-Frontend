import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getTechnicianWorkScheduleListForStoreManager } from "../../../services/ScheduleService";
import WorkScheduleList from "./WorkScheduleList";
import AddWorkScheduleForm from "./AddWorkScheduleForm";
import TechnicianSchedule from "./TechnicianSchedule";

function WorkSchedulePage() {
    const { auth } = useContext(AuthContext);
    const [workSchedules, setWorkSchedules] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load danh sách lịch làm việc
    useEffect(() => {
        const loadSchedules = async () => {
            try {
                const res = await getTechnicianWorkScheduleListForStoreManager(auth.user.storeManagerId);
				console.log("Lịch làm việc tải về:", res.DT);
                if (res && res.EC === 0) {
                    setWorkSchedules(res.DT);
                }
            } catch (err) {
                console.error("Lỗi load lịch:", err);
            } finally {
                setLoading(false);
            }
        };
        loadSchedules();
    }, [auth.user.storeManagerId]);

    if (loading) return <p>Đang tải...</p>;

    return (
        <div className="container py-5">
            <div className="card border-0 shadow-sm rounded mb-3">
                <div className="card-body text-center">
                    <p className="lead fs-3 m-0">Quản lý Lịch làm việc</p>
                </div>
            </div>

            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="card shadow-sm rounded-3 mb-3">
                        <div className="card-header lead">Danh sách lịch làm việc</div>
                        <div className="card-body">
                            <WorkScheduleList schedules={workSchedules} />
                        </div>
                    </div>
                    <div className="card shadow-sm rounded-3">
                        <div className="card-header lead">Lịch theo kỹ thuật viên</div>
                        <div className="card-body">
                            <TechnicianSchedule schedules={workSchedules} />
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card shadow-sm rounded-3 sticky-top" style={{ top: "15px" }}>
						<div className="card-header lead">Thêm lịch làm việc</div>
                        <div className="card-body">
                            <AddWorkScheduleForm
                                onAdded={(newSchedules) =>
                                    setWorkSchedules((prev) => [...prev, ...newSchedules])
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkSchedulePage;