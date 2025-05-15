import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";

const DoctorTotalPayments = ({ totalPayments }) => {
    return (
        <Card>
            <CardHeader
                title="Tổng thanh toán"
                sx={{ textAlign: "center", backgroundColor: "#f5f5f5" }}
            />
            <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h4" color="primary" fontWeight="bold">
                {totalPayments.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                })}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default DoctorTotalPayments;
