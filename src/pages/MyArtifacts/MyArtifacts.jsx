import React from 'react';
import useAxiosSecure from '../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Helmet } from 'react-helmet-async';
import MyArtifactsDataRow from './MyArtifactsDataRow';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const MyArtifacts = () => {
    const {user} = useAuth();
    //const axiosSecure = useAxiosSecure()

    const { data: artifacts = [], isLoading, refetch } = useQuery({
      queryKey: ['artifacts', user?.email],
      queryFn: async () => {
          if (!user?.email) return []; // Prevent API call if email is missing
          try {
              const { data: { data = [] } = {} } = await axios.get(`${import.meta.env.VITE_API_URL}/my-artifacts/${user.email}`);
              return data;
          } catch (error) {
              console.error("Error fetching artifacts:", error);
              return [];
          }
      }
  });
  
    console.log(artifacts);
    if(isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <>
<Helmet>
    <title>My list of Artifacts</title>
</Helmet> 
<div className=''>
  <div className='py-4 '>
    <div className='text-center font-bold text-5xl'> My Artifacts List</div>
    <div className=' sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
      <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th
                scope='col'
                className=' px-10 py-3 bg-white border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'
              >
                Artifact Image
              </th>
              <th
                scope='col'
                className='px-2 py-3 bg-white border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'
              >
                Artifact Name
              </th>
              <th
                scope='col'
                className='px-2 py-3 bg-white border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'
              >
                Artifact Type
              </th>
              <th
                scope='col'
                className='px-2 py-3 bg-white border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'
              >
                Historical Context
              </th>
              <th
                scope='col'
                className='px-2 py-3 bg-white border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'
              >
                Created At
              </th>
              <th
                scope='col'
                className='px-2 py-3 bg-white border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'
              >
                Discovered At
              </th>
              <th
                scope='col'
                className='px-2 py-3 bg-white border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'
              >
                Discovered By
              </th>
              <th
                scope='col'
                className='px-2 py-3 bg-white border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'
              >
                Present Location
              </th>
              <th
                scope='col'
                className='px-2 py-3 bg-white border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'
              >
                Action
              </th>
            
            </tr>
          </thead>
          <tbody>
            {artifacts.map(AppData => (
              <MyArtifactsDataRow
                key={AppData._id}
                AppData={AppData}
                refetch={refetch}
              ></MyArtifactsDataRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

        </>
    );
};

export default MyArtifacts;