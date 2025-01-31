import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ArtifactCard = ({ artifact }) => {
  const [likesCount, setLikeCount] = useState(artifact.likesCount || 0);

  // Handle Like button click
  const handleLike = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/artifacts/${artifact._id}/like`);
      setLikeCount(prevCount => prevCount + 1);
      toast.success('You liked this artifact!');
    } catch (error) {
      console.error('Error liking artifact:', error);
      toast.error('Failed to like this artifact.');
    }
  };

  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow bg-white">
      <img
        src={artifact.imageUrl}
        alt={artifact.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {artifact.name}
      </h3>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Origin:</strong> {artifact.origin}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Type:</strong> {artifact.artifactType}
      </p>
      <p className="text-sm text-gray-600">
        {artifact.description}
      </p>
      <div className="mt-4 flex justify-between items-center">
        <button 
          onClick={handleLike} 
          className="btn btn-primary text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          👍 Like ({likesCount})
        </button>
        <Link to={`/artifacts/${artifact._id}`}>
          <button className="btn btn-secondary text-white px-4 py-2 rounded hover:bg-gray-600">
            View Details
          </button>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

ArtifactCard.propTypes = {
  artifact: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    origin: PropTypes.string,
    artifactType: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    likeCount: PropTypes.number,
  }).isRequired,
};

export default ArtifactCard;
