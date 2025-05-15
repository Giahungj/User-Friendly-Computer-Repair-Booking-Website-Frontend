import { useState, useEffect, useContext } from "react";
import { fetchRevenueStats } from "../../../../services/StatsService";
import { AuthContext } from "../../../../context/AuthContext";

const DoctorRevenueStatsData = ({ onDataLoaded }) => {
    const [stats, setStats] = useState(null);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            if (!auth?.account?.doctorId) return;
            try {
                const response = await fetchRevenueStats(auth.account.doctorId);
                if (response.EC === 0) {
                    setStats(response.DT);
                    onDataLoaded(response.DT);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu thống kê doanh thu:", error);
            }
        };
        fetchData();
    }, [auth, onDataLoaded]);

    return null;
};

export default DoctorRevenueStatsData;
