import { useState, useEffect, useContext } from "react";
import { fetchDoctorBookingStats } from "../../../../services/StatsService";
import { AuthContext } from "../../../../context/AuthContext";

const DoctorBookingStatsData = ({ onDataLoaded }) => {
    const [stats, setStats] = useState({
        week: { total: 0, data: {} },
        month: { total: 0, data: {} },
        quarter: { total: 0, data: {} },
        year: { total: 0, data: {} },
    });
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            if (!auth?.account?.doctorId) return;
            try {
                const response = await fetchDoctorBookingStats(auth.account.doctorId);
                if (response.EC === 0) {
                    setStats(response.DT);
                    onDataLoaded(response.DT);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu thống kê:", error);
            }
        };
        fetchData();
    }, [auth, onDataLoaded]);

    return null; // Không cần render gì cả
};

export default DoctorBookingStatsData;
