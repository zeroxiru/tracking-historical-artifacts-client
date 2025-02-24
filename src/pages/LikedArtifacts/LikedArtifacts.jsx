import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../hooks/UseAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';

const MyLikedArtifacts = () => {
  const [likedArtifacts, setLikedArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchMyLikedArtifacts = async () => {
      try {
        const response = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/liked-artifacts`);
        setLikedArtifacts(response.data);
      } catch (error) {
        console.error('Error fetching liked artifacts:', error);
        toast.error('Failed to load liked artifacts.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyLikedArtifacts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Liked Artifacts</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : likedArtifacts.length === 0 ? (
        <p className="text-gray-600">You haven't liked any artifacts yet. Start exploring and like some!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {likedArtifacts.map((artifact) => (
            <div key={artifact._id} className="border rounded-lg shadow-md p-4 bg-white">
              <img src={artifact.imageUrl} alt={artifact.name} className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold">{artifact.name}</h3>
              <p className="text-sm text-gray-600">
                <strong>Type:</strong> {artifact.artifactType}
              </p>
              <Link to={`/artifacts/${artifact._id}`}>
                <button className="btn btn-primary bg-amber-800 hover:bg-amber-700 text-white px-4 py-2 rounded w-full mt-2">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default MyLikedArtifacts;
