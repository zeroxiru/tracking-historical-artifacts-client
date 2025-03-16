import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BookingDetails = () => {
  
  const [appointments, setAppointments] = useState([]);
  const [appointmentData, setAppointmentData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    purpose: "",
  });

  useEffect(() => {
    // Fetch existing appointments from the backend
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/artifacts/addAppointments`, appointmentData);
      setAppointments([...appointments, appointmentData]);
      alert("Appointment booked!");
      setAppointmentData({
        name: "",
        email: "",
        phone: "",
        address: "",
        date: "",
        time: "",
        purpose: "",
      });
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center py-10">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-amber-900">Book an Appointment</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={appointmentData.name}
            onChange={handleInputChange}
            required
            className="input input-bordered w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={appointmentData.email}
            onChange={handleInputChange}
            required
            className="input input-bordered w-full"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={appointmentData.phone}
            onChange={handleInputChange}
            required
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={appointmentData.address}
            onChange={handleInputChange}
            required
            className="input input-bordered w-full"
          />
          <input
            type="date"
            name="date"
            value={appointmentData.date}
            onChange={handleInputChange}
            required
            className="input input-bordered w-full"
          />
          <input
            type="time"
            name="time"
            value={appointmentData.time}
            onChange={handleInputChange}
            required
            className="input input-bordered w-full"
          />
          <textarea
            name="purpose"
            placeholder="Purpose of visit"
            value={appointmentData.purpose}
            onChange={handleInputChange}
            required
            className="textarea textarea-bordered w-full md:col-span-2"
          />
         <div className="w-full flex justify-center md:col-span-2">
         <button type="submit" className=" bg-amber-800 text-white rounded px-4 py-2 md:col-span-2">
            Book Appointment
          </button>
         </div>
        </form>

        <h3 className="text-xl font-bold mt-8">Appointment List:</h3>
        <div className="mt-4 grid gap-4">
          {appointments.length > 0 ? (
            appointments.map((appt, index) => (
              <div key={index} className="card bg-base-100 shadow-md p-4">
                <p className="text-lg font-semibold">{appt.name}</p>
                <p className="text-sm">
                  {appt.date} at {appt.time}
                </p>
                <p className="text-sm text-gray-500">{appt.purpose}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No appointments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
