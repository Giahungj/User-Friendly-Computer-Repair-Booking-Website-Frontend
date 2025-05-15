import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import DoctorBookingStats from "./DoctorBookingStats";
import DoctorPatientStats from "./DoctorPatientStats";
import DoctorRevenueStats from "./DoctorRevenueStats";

const StatisticalMain = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <div className="container my-5">
            <h2 className="mb-4 text-end fw-bold text-primary">📊 THỐNG KÊ HỆ THỐNG</h2>

            {/* Tabs chuyển đổi giữa các thống kê */}
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                <Tabs
                    value={tabIndex}
                    onChange={(e, newIndex) => setTabIndex(newIndex)}
                    variant="fullWidth"
                    textColor="primary"
                    indicatorColor="primary"
                >
                    <Tab label="ĐẶT LỊCH" />
                    <Tab label="DOANH SỐ" />
                    <Tab label="DOANH THU" />
                </Tabs>
            </Box>


            {/* Nội dung của từng tab */}
            {tabIndex === 0 && (
                <div className="card p-4 mb-4 shadow-sm border-0 bg-light">
                    <h5 className="text-center text-secondary">Tổng quan đặt lịch</h5>
                    <hr />
                    <DoctorBookingStats />
                </div>
            )}

            {tabIndex === 1 && (
                <div className="card p-4 mb-4 shadow-sm border-0 bg-light">
                    <h5 className="text-center text-secondary">Tổng quan bệnh nhân</h5>
                    <hr />
                    <DoctorPatientStats />
                </div>
            )}


            {tabIndex === 2 && (
                <div className="card p-4 mb-4 shadow-sm border-0 bg-light">
                    <h5 className="text-center text-secondary">Tổng quan doanh số</h5>
                    <hr />
                    <DoctorRevenueStats />
                </div>
            )}
        </div>
    );
};

export default StatisticalMain;
