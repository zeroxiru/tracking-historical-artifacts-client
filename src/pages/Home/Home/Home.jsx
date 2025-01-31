import React, { useEffect, useState } from 'react';
import Banner from '../../Banner/Banner';
import CallToActionSection from '../../CallToActionSection/CallToActionSection';
import AppointmentHome from '../../Appointments/AppointmentHome ';
import axios from 'axios';
import FeaturedArtifacts from '../../../components/FeaturedArtifacts';

const Home = () => {
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        // Fetch appointment data
        const fetchAppointments = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/artifacts/appointments`);
            setAppointments(response.data);
          } catch (error) {
            console.error("Error fetching appointments:", error);
          }
        };
    
        fetchAppointments();
      }, []);
    return (
        <div className='mt-10'>
            <Banner></Banner>
            <FeaturedArtifacts></FeaturedArtifacts>
            <CallToActionSection></CallToActionSection>
            <AppointmentHome appointments={appointments}></AppointmentHome>
        </div>
    );
};

export default Home;