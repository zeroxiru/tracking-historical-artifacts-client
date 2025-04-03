import React from 'react';
import { FaLandmark, FaGlobe, FaCheckCircle, FaMicroscope, FaHandshake, FaLeaf } from "react-icons/fa";


const missions = [
    { title: "Preservation", icon: <FaLandmark />, description: "Ensuring the protection and conservation of historical artifacts for future generations." },
    { title: "Accessibility", icon: <FaGlobe />, description: "Making historical artifacts available and accessible to a global audience." },
    { title: "Accuracy", icon: <FaCheckCircle />, description: "Maintaining precise and verified records of historical artifacts." },
    { title: "Innovation", icon: <FaMicroscope />, description: "Utilizing modern technology to improve artifact tracking and preservation." },
    { title: "Collaboration", icon: <FaHandshake />, description: "Encouraging partnerships between historians, researchers, and institutions." },
    { title: "Sustainability", icon: <FaLeaf />, description: "Promoting eco-friendly practices in artifact preservation." },
  ];

const MissionSection = () => {
    return (
        <section className='py-8 text-center bg-gray-100 p-10'>
            <h2 className='text-3xl font-bold text-amber-900'>Our Mission</h2>
            <p className="mt-2 text-gray-600">We strive to preserve history while making it accessible, accurate, and sustainable.Whether you're a historian, a museum enthusiast, or just someone curious about ancient treasures, our platform offers a seamless experience to connect with history.  
          Explore detailed information about artifacts, their origins, and historical significance.  
          With Artifact Explorer, you'll gain access to comprehensive tracking, preservation insights, and a rich database tailored to your passion for history.  
          Trust us to guide your journey into the past and unlock fascinating stories hidden within ancient relics.</p>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
                {missions.map((mission, index) => (
            <div key={index} className="p-6 bg-white rounded-2xl shadow-lg border-2 border-transparent transition duration-300 hover:shadow-xl hover:border-yellow-300 ">
                <div className="text-5xl  text-amber-500 mx-auto mb-4">{mission.icon}</div>
                <h3 className="text-xl font-bold  text-amber-800">{mission.title}</h3>
                <p className="mt-2 text-gray-600">{mission.description}</p>
            </div>
        ))}

            </div>
        </section>
    );
};

export default MissionSection;