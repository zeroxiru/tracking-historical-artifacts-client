import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';
import { useState } from 'react';
const MainLayout = () => {
    const [appointments, setAppointmenta] = useState([]);

    const addAppointment = (appointment) => { 
        setAppointmenta([...appointments, appointment])
    }
    return (
        <div className='flex flex-col min-h-screen w-11/12 mx-auto py-10 f'>
            <Navbar></Navbar>
            <main className="flex-grow">
            <Outlet context={{appointments, addAppointment}}></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;