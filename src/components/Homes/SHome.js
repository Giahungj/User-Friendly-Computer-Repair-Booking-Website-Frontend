import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import StoreManagerHeader from "../Headers/SHeader";

const SHome = () => {
    return (
        <div className="layout">
            <header>
                <StoreManagerHeader />
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

export default SHome;
