import React, { useState, useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import DoctorRevenueStatsData from "./data/DoctorRevenueStatsData";

const DoctorRevenueStats = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeoutReached, setTimeoutReached] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (loading) {
                setTimeoutReached(true);
                setLoading(false);
            }
        }, 10000); // ⏳ Timeout 10s

        return () => clearTimeout(timer);
    }, [loading]);

    const handleDataLoaded = (statsData) => {
        setLoading(false);
        if (!statsData) {
            setStats(null);
            return;
        }
        setStats(statsData);
    };

    const renderCharts = (title, dataObj) => {
        if (!dataObj || !dataObj.data || dataObj.data.length === 0) return null;

        const labels = dataObj.data.map(item => item.label);
        const counts = dataObj.data.map(item => item.value);

        return (
            <div className="p-3">
                <h5 className="text-center">{title}</h5>
                <div className="d-flex flex-wrap justify-content-center gap-4">
                    {/* Biểu đồ cột */}
                    <BarChart
                        xAxis={[{ scaleType: "band", data: labels }]}
                        series={[{ data: counts, label: "Doanh thu (VND)" }]}
                        width={500}
                        height={300}
                    />
                    {/* Biểu đồ đường */}
                    <LineChart
                        xAxis={[{ scaleType: "point", data: labels }]}
                        series={[{ data: counts, label: "Xu hướng doanh thu" }]}
                        width={500}
                        height={300}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="p-3">
            <DoctorRevenueStatsData onDataLoaded={handleDataLoaded} />
            {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                    <CircularProgress size="lg" />
                </Box>
            ) : timeoutReached ? (
                <p className="text-center text-warning">Không nhận được dữ liệu</p>
            ) : stats ? (
                <>
                    {renderCharts("Thống kê doanh thu theo tuần", stats.week)}
                    {renderCharts("Thống kê doanh thu theo tháng", stats.month)}
                    {renderCharts("Thống kê doanh thu theo quý", stats.quarter)}
                    {renderCharts("Thống kê doanh thu theo năm", stats.year)}
                </>
            ) : (
                <p className="text-center text-danger">Không có dữ liệu</p>
            )}
        </div>
    );
};

export default DoctorRevenueStats;
