// components/Register/RegisterDoctor.js
import React, { useState } from 'react';
import RegisterDoctorStep1 from './RegisterDoctorStep1';
import RegisterDoctorStep2 from './RegisterDoctorStep2';
import RegisterDoctorStep3 from './RegisterDoctorStep3';
import RegisterDoctorStep4 from './RegisterDoctorStep4';
import RegisterDoctorStep5 from './RegisterDoctorStep5';

const RegisterDoctor = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <RegisterDoctorStep1 nextStep={() => setCurrentStep(2)} />;
            case 2:
                return <RegisterDoctorStep2 nextStep={() => setCurrentStep(3)} prevStep={() => setCurrentStep(1)} />;
            case 3:
                return <RegisterDoctorStep3 nextStep={() => setCurrentStep(4)} prevStep={() => setCurrentStep(2)} />;
            case 4:
                return <RegisterDoctorStep4 nextStep={() => setCurrentStep(5)} prevStep={() => setCurrentStep(3)} />;
            case 5:
                return <RegisterDoctorStep5 prevStep={() => setCurrentStep(4)} />;
            default:
                return null;
        }
    };

    return <div>{renderStep()}</div>;
};

export default RegisterDoctor;