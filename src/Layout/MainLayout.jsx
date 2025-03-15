import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';
import Banner from '../pages/Banner/Banner';
import { ThemeProvider } from '../components/theme-provider';

const MainLayout = () => {
    const [appointments, setAppointments] = useState([]);
    const location = useLocation();

    const addAppointment = (appointment) => { 
        setAppointments([...appointments, appointment]);
    }

    return (
        <ThemeProvider>
        <div className='flex flex-col min-h-screen w-full'>
            <Navbar />
            {location.pathname === '/' && <Banner/>}
            <main className="flex-grow w-11/12 mx-auto">
                <Outlet context={{ appointments, addAppointment }} />
            </main>
            <Footer />
        </div>
        </ThemeProvider>
    );
};

export default MainLayout;
