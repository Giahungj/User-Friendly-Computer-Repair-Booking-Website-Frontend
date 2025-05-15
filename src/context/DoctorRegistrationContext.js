import React, { createContext, useState } from 'react';

export const DoctorRegistrationContext = createContext();

export const DoctorRegistrationProvider = ({ children }) => {
    const [doctorData, setDoctorData] = useState({
        // Bước 1: Thông tin cá nhân
        name: "",
        email: "",
        password: "",
        confirmPassword: "",

        // Bước 2: Thông tin liên hệ
        address: "",
        phone: "",
        sex: "",
        dateofbirth: "", 

        // Bước 3: Thông tin chuyên môn
        specilityId: "",
        experience: "",
        description: "",
        facilityId: "",

        // Bước 4: Thông tin bổ sung
        avatar: "",
        price: "",

        // Thông tin cố định
        userType: "doctor",
    });

    const setDoctorDataContext = (newData) => {
        setDoctorData({ ...doctorData, ...newData });
    };

    return (
        <DoctorRegistrationContext.Provider value={{ doctorData, setDoctorDataContext }}>
            {children}
        </DoctorRegistrationContext.Provider>
    );
};