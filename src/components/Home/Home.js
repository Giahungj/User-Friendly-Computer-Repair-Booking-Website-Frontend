import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import TestHeaderComponent from "../TestHeaderConmponent";

// import { ThemeProvider, createTheme } from '@mui/material/styles';

// const theme = createTheme();

const Home = () => {
    return (
        <div className="layout">
            <header>
                <TestHeaderComponent />
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
