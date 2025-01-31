import React from 'react';
import { ScaleLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div
      className="h-[70vh] 
      flex 
      flex-col 
      justify-center 
      items-center"
    >
      <ScaleLoader size={100} color="amber" />
    </div>
  );
};

export default LoadingSpinner;
