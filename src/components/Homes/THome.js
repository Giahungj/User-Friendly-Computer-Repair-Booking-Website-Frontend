import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import TechnicianHeader from "../Header/THeader";

const THome = () => {
    return (
        <div className="layout">
            <header>
                <TechnicianHeader />
            </header>
            <main className="content bg-light">
                <Outlet />
            </main>
            <footer className="footer bg-light text-center py-4">
                <Footer />
            </footer>
        </div>
    );
};

export default THome;
