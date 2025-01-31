import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../../components/LoadingSpinner';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ArtifactDetailsPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  // Redirect if user is not authenticated
  if (!user) navigate('/login');

  const { data: artifact = {}, isLoading, refetch } = useQuery({
    queryKey: ['artifact', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/artifacts/${id}`);
      return data;
    },
  });

  const [likeCount, setLikeCount] = useState(artifact.likeCount || 0);

  const handleLike = async () => {
    try {
      await axiosSecure.patch(`/artifacts/${id}/like`);
      setLikeCount(prevCount => prevCount + 1);
      toast.success('You liked this artifact!');
      refetch();
    } catch (error) {
      console.error('Error liking artifact:', error);
      toast.error('Failed to like this artifact.');
    }
  };

  if (isLoading) return <LoadingSpinner />;

  const { name, origin, artifactType, description, imageUrl } = artifact;

  return (
<div>
      <Helmet>
        <title>Artifact Details</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row justify-between gap-8 w-full">
        {/* Image Section */}
        <div className="w-full overflow-hidden rounded-xl">
          <img
            className="object-cover w-full h-64"
            src={imageUrl}
            alt={name}
          />
        </div>
        {/* Details Section */}
        <div className="flex-1">
          <div title={name} center />
          <hr className="my-6" />
          <p className="text-lg text-gray-700">
            <strong>Origin:</strong> {origin}
          </p>
          <hr className="my-4" />
          <p className="text-lg text-gray-700">
            <strong>Type:</strong> {artifactType}
          </p>
          <hr className="my-4" />
          <p className="text-lg text-gray-700">
            <strong>Description:</strong> {description}
          </p>
          <hr className="my-6" />
          <div className="flex justify-between items-center">
            <button
              onClick={handleLike}
              className="btn btn-primary text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              👍 Like ({likeCount})
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
      </div>
   
  );
};

export default ArtifactDetailsPage;
