import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';
import Banner from '../pages/Banner/Banner';

const MainLayout = () => {
    const [appointments, setAppointments] = useState([]);

    const addAppointment = (appointment) => { 
        setAppointments([...appointments, appointment]);
    }

    return (
        <div className='flex flex-col min-h-screen w-full'>
            <Navbar />
            <Banner></Banner>
            <main className="flex-grow w-11/12 mx-auto">
                <Outlet context={{ appointments, addAppointment }} />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
