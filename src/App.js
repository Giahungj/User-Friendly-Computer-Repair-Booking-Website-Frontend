import { useEffect, useState, useContext } from 'react';
import './App.scss';
import NavHeader from './components/Navigation/NavHeader';
import AppRoutes from './routes/AppRoutes';
import { AuthContext } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DoctorRegistrationProvider } from './context/DoctorRegistrationContext';

function App() {
  return (
    <div className='App'>
        {/* <div className='app-header'>
            <NavHeader />
        </div>
        */}
        <div className='app-container'>
          <DoctorRegistrationProvider>
            <AppRoutes />
          </DoctorRegistrationProvider>
        </div>
        <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
