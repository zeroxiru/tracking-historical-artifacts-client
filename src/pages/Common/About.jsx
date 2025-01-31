import React from 'react';

const About = () => {
  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-green-800 mb-6">
          About Artifact Explorer
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Welcome to <span className="font-bold italic text-green-600">Artifact Explorer</span>, your ultimate companion for discovering and tracking historical artifacts.  
          Whether you're a historian, a museum enthusiast, or just someone curious about ancient treasures, our platform offers a seamless experience to connect with history.  
          Explore detailed information about artifacts, their origins, and historical significance.  
          With Artifact Explorer, you'll gain access to comprehensive tracking, preservation insights, and a rich database tailored to your passion for history.  
          Trust us to guide your journey into the past and unlock fascinating stories hidden within ancient relics.
        </p>
        <div className="mt-8">
          <button className="btn bg-green-600 text-white hover:bg-green-700">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
