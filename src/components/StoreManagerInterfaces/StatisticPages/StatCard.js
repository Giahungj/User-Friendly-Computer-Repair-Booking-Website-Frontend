// src/components/Statistics/StatCard.jsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StatCard = ({ title, value }) => (
    <div className="card shadow-sm rounded">
        <div className="card-body">
            <p className="text-secondary mb-1">{title}</p>
            <p className="fs-3 m-0" style={{ color: "#1976d2" }}>{value || 0}</p>
        </div>
    </div>
);

export default StatCard;