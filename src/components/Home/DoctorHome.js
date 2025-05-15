import { Outlet } from "react-router-dom";
import DoctorNavHeader from "../Navigation/DoctorNavHeader";

const DoctorHome = () => {
    return (
        <div className="layout">
            <header>
                <DoctorNavHeader />
            </header>
            <main className="content">
                <Outlet />
            </main>
        </div>
    );
};

export default DoctorHome;
