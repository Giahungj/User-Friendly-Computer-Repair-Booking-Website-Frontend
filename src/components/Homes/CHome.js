import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import CustomerHeader from "../Headers/CHeader";

const CHome = () => {
    return (
        <div className="layout">
            <header>
                <CustomerHeader />
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

export default CHome;
