import React, { useEffect, useState } from "react";
import axios from "axios";

const CuratorsSection = () => {
  const [curators, setCurators] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(null);

  // Fetch data from backend API
  useEffect(() => {
    //axios
      //.get("/curators") // API URL
      axios
        .get(`${import.meta.env.VITE_API_URL}/curators`)
        .then((response) => {
          // Ensure the response data is an array
          if (Array.isArray(response.data)) {
            setCurators(response.data);
          } else {
            console.error("Unexpected data format", response.data);
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleClick = (index) => {
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 300); // Reset animation
  };

  return (
    <section className="py-12 text-center bg-white">
      <h2 className="text-4xl font-bold">Professional Team of Curators</h2>
      <p className="text-gray-500 max-w-2xl mx-auto mt-3">
        The role that curators play, like the art they care for, is constantly evolving.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 mt-10 px-6">
  {curators.length > 0 ? (
    curators.map((curator, index) => (
      <div key={curator._id} className="flex flex-col items-center">
        <div
          className={`overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-900 transition-all ${
            clickedIndex === index ? "ring-4 ring-gray-200 dark:ring-gray-700" : ""
          }`}
        >
          <img
            src={curator.image}
            alt={curator.name}
            className={`w-72 h-80 object-cover transition-transform duration-300 ${
              clickedIndex === index ? "animate-bounce" : ""
            }`}
            onClick={() => handleClick(index)}
          />
        </div>
        <p className="text-gray-500 mt-4">{curator.role}</p>
        <h3 className="text-xl font-bold">{curator.name}</h3>
      </div>
    ))
  ) : (
    <p>No curators available.</p>
  )}
</div>

    </section>
  );
};

export default CuratorsSection;
