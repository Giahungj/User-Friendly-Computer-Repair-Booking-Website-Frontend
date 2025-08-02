import './App.scss';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='App'>
        <div className='app-container'>
            <AppRoutes />
        </div>
        <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
