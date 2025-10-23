import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import StoreManagerHeader from "../Headers/SHeader";

const SHome = () => {
    return (
        <div className="layout">
            <header>
                <StoreManagerHeader />
            </header>
            <main className="content" style={{ backgroundColor: '#f1f5f9' }}>
                <Outlet />
            </main>
            <footer className="footer bg-light text-center py-4">
                <Footer />
            </footer>
        </div>
    );
};

export default SHome;
