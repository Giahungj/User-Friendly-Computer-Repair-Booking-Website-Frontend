import { Outlet } from "react-router-dom";
import NavHeader from "../Navigation/NavHeader";
import Footer from "../Footer/Footer";

// import { ThemeProvider, createTheme } from '@mui/material/styles';

// const theme = createTheme();

const Home = () => {
    return (
        <div className="layout">
            <header>
                <NavHeader />
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

export default Home;
