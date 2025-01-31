import React from 'react';
import { Link } from 'react-router-dom';

const AppointmentHome = ({ appointments }) => {
  const upcomingAppointments = appointments.slice(0, 3); // Show only the first 3 appointments

  return (
    <div className="p-8 bg-neutral-100">
      <h2 className="text-3xl font-bold text-center mb-6">Upcoming Appointments</h2>
      
      {upcomingAppointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingAppointments.map((appointment, index) => (
            <div key={index} className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-xl font-bold mb-2">{appointment.name}</h3>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
              <p><strong>Purpose:</strong> {appointment.purpose}</p>
              <p className="text-sm text-gray-600 mt-2">Officer Contact Available</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No appointments available yet. Schedule yours today!</p>
      )}

      <div className="text-center mt-8">
        <Link to="/book-appointment">
          <button className="btn btn-primary">Book an Appointment</button>
        </Link>
      </div>
    </div>
  );
};

export default AppointmentHome;
