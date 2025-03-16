import React from 'react';
import TicketImage from '../../assets/Buy_ticket_Online.png'; // Ensure correct path
import DiscountImage from '../../assets/Discounts.png'
import { useNavigate } from 'react-router-dom';

const CallToActionSection = () => {
    const navigate = useNavigate();
  const actions = [
    {
      title: 'Explore Our Gallery',
      buttonText: 'VIEW GALLERY',
      imageUrl: TicketImage,
       path: '/all-artifacts',
    },
    {
      title: 'Plan Your Visit',
      buttonText: 'DETAILS OF BOOKINGS',
      imageUrl: DiscountImage,
      path: '/artifacts/bookingDetails', // need to change ar per endpoints with props to get the specific artifacts id
    },
  ];

  console.log(actions);
  return (
    <div className="bg-neutral-100 py-10">
      <h2 className="text-2xl sm:text-4xl font-bold text-center text-amber-900 mb-6"> 
        Discover More About Our Museum
      </h2>
      <div className="flex flex-col sm:flex-row justify-center gap-6">
        {actions.map((action, index) => (
          <div
            key={index}
            className="relative w-full sm:w-96 h-64 rounded-xl shadow-lg overflow-hidden"
          >
            <img
              src={action.imageUrl}
              alt={action.title}
              className="w-full h-full object-cover"
            
            />
             
            <div className="absolute inset-0 bg-orange-100 bg-opacity-40 flex flex-col justify-center items-center text-white p-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-amber-900">{action.title}</h3>
              <button className="border border-white px-6 py-2 hover:bg-white hover:text-black rounded-xl"
               onClick={() => navigate(action.path)}>
                {action.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallToActionSection;
