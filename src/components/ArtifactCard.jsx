import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosSecure from '../hooks/UseAxiosSecure';
import useAuth from '../hooks/useAuth';

const ArtifactCard = ({ artifact, refetch }) => {
  const { user } = useAuth();
  const userId = user?.uid;
  const [likeCount, setLikeCount] = useState(artifact.likesCount || 0);
  const axiosSecure = useAxiosSecure();
  const { _id, name, imageUrl, likesCount } = artifact;

  // Sync likes count when artifact updates
  useEffect(() => {
    setLikeCount(likesCount);
  }, [likesCount]);

  const handleLike = async () => {
    if (!userId) {
      toast.error('You need to be logged in to like this artifact.');
      return;
    }

    try {
      // await axiosSecure.patch(`/artifacts/${id}/like`);
      await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/artifacts/${_id}/like`, { userId });

      // Update likes count in UI
      setLikeCount(prevCount => prevCount + 1);
      toast.success('You liked this artifact!');

      // Ensure latest data is fetched
      if (refetch) refetch();

    } catch (error) {
      console.error('Error liking artifact:', error);
      toast.error('You have already liked this artifact.');
    }
  };

  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow bg-white flex flex-col h-full">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105 rounded-md mb-4"
      />
      <div className="flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-sm text-gray-600 mb-1 text-start">
          <strong>Description:</strong> {artifact.historicalContext?.split('.').slice(0, 1).join('.')}
        </p>
        <p className="text-sm text-gray-600 mb-1 text-start">
          <strong>Type:</strong> {artifact.artifactType}
        </p>

      </div>
      <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row lg:flex-wrap xl:flex-wrap 2xl:flex-wrap justify-between items-center gap-2 mt-auto">
  <button
    onClick={handleLike}
    className="btn btn-success text-white px-4 py-2 rounded bg-amber-800 hover:bg-amber-700 w-full sm:w-full md:w-full lg:w-auto xl:w-auto"
  >
    👍 Like ({likeCount})
  </button>
  <Link to={`/artifacts/${_id}`}>
    <button className="btn btn-secondary text-white px-4 py-2 rounded bg-amber-800 hover:bg-amber-700 w-full sm:w-full md:w-full lg:w-auto xl:w-auto">
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
    artifactType: PropTypes.string,
    imageUrl: PropTypes.string,
    likesCount: PropTypes.number,
  }).isRequired,
  refetch: PropTypes.func,
};

export default ArtifactCard;
