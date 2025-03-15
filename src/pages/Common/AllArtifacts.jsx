import React, { useState } from 'react';
import ArtifactCard from '../../components/ArtifactCard';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/LoadingSpinner';
import axios from 'axios';
import { BiSearch } from 'react-icons/bi';
import useAuth from '../../hooks/useAuth';

const AllArtifacts = () => {
    const { user } = useAuth();
    const [artifactType, setArtifactType] = useState('');
    const [search, setSearch] = useState('');
    const [queryParams, setQueryParams] = useState({
        artifactType: '',
        search: '',
    });

    const url = `${import.meta.env.VITE_API_URL}/artifacts?` +
        (queryParams.artifactType ? `artifactType=${artifactType}&` : '') +
        (queryParams.search ? `search=${search}` : '');

    const { data: artifacts = [], isLoading } = useQuery({
        queryKey: ['artifacts', queryParams],
        queryFn: async () => {
            const { data: { data = [] } = {} } = await axios(url);
            return data;
        },
    });

    const handleSearch = () => {
        setQueryParams({
            ...queryParams,
            search: search.trim(),
        });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="text-center py-10">
            <h2 className="text-amber-900 font-bold text-4xl mb-6">All Artifacts Section</h2>
            <div className=" mx-auto bg-amber-900">
                <div className="flex justify-center px-4">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            className="text-xl cursor-pointer bg-orange-900"
                            onClick={handleSearch}
                        >
                            <BiSearch />
                        </button>
                        <div className="w-full ">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                className="input w-auto max-w-xl input-bordered  bg-gray-600"
                                placeholder="Search Artifact by Name or Origin"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-6 mt-5">
    <select
        value={artifactType}
        onChange={(e) => {
            setArtifactType(e.target.value);
            setQueryParams({
                ...queryParams,
                artifactType: e.target.value,
            });
        }}
        className="select select-bordered w-full max-w-xs text-black bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring focus:ring-amber-900" 
    >
        <option value="" className="bg-transparent text-black dark:text-white">All Artifact Types</option>
        <option value="Tools" className="bg-white text-black dark:bg-gray-800 dark:text-white">Tools</option>
        <option value="Weapons" className="bg-white text-black dark:bg-gray-800 dark:text-white">Weapons</option>
        <option value="Documents" className="bg-white text-black dark:bg-gray-800 dark:text-white">Documents</option>
        <option value="Writings" className="bg-white text-black dark:bg-gray-800 dark:text-white">Writings</option>
        <option value="Sculptures" className="bg-white text-black dark:bg-gray-800 dark:text-white">Sculptures</option>
    </select>
</div>
            
            {artifacts && artifacts.length > 0 ? (
                <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10 ">
                    {artifacts.map((artifact) => (
                        <ArtifactCard key={artifact._id} artifact={artifact} />
                    ))}
                </div>
            ) : (
                <p>No artifacts available in the database.</p>
            )}
        </div>
    );
};

export default AllArtifacts;
