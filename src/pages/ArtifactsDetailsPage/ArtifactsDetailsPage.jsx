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


  const { data: artifact = {}, isLoading, refetch } = useQuery({
    queryKey: ['artifact', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/artifacts/${id}`);
      return data;
    },
  });
  console.log(artifact);
  const [likesCount, setLikesCount] = useState(artifact.likesCount || 0);

  const handleLike = async () => {
    try {
      await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/artifacts/${id}/like`);
      setLikesCount(prevCount => prevCount + 1);
      toast.success('You liked this artifact!');
      refetch();
    } catch (error) {
      console.error('Error liking artifact:', error);
      toast.error('Failed to like this artifact.');
    }
  };

  if (isLoading) return <LoadingSpinner />;

  const { name, imageUrl, artifactType, historicalContext, discoveredAt, discoveredBy, presentLocation } = artifact;
  console.log(artifact);
  return (
<div class="container mx-auto p-6">
  <Helmet>
    <title>Artifact Details</title>
  </Helmet>

  <div class="flex flex-col lg:flex-row justify-between gap-8 w-full items-center lg:items-start">

    <div class="w-full lg:w-1/2 overflow-hidden rounded-2xl shadow-xl">
      <img
        class="object-cover w-full h-72 sm:h-80 md:h-96"
        src={imageUrl}
        alt={name}
      />
    </div>

 
    <div class="flex-1 text-left lg:pl-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-4 dark:text-white">{name}</h1>
      <hr class="my-4 border-gray-300" />
      <p class="text-lg text-gray-700 dark:text-white">
        <strong>Present Location:</strong> {presentLocation}
      </p>
      <hr class="my-4 border-gray-300" />
      <p class="text-lg text-gray-700 dark:text-white">
        <strong>Type:</strong> {artifactType}
      </p>
      <hr class="my-4 border-gray-300" />
      <p class="text-lg text-gray-700 dark:text-white">
        <strong>Description:</strong> {historicalContext}
      </p>
      <hr class="my-4 border-gray-300" />
      <p class="text-lg text-gray-700 dark:text-white">
        <strong>Discover At :</strong> {discoveredAt}
      </p>
      <hr class="my-4 border-gray-300" />
      <p class="text-lg text-gray-700 dark:text-white">
        <strong>Discover By :</strong> {discoveredBy}
      </p>
      <hr class="my-6 border-gray-300" />

      <div class="flex justify-start items-center gap-4">
        <button
          onClick={handleLike}
          class="btn btn-success hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md focus:outline-none"
        >
          👍 Like ({likesCount})
        </button>
      </div>
    </div>
  </div>

  <ToastContainer />
</div>

   
  );
};

export default ArtifactDetailsPage;
