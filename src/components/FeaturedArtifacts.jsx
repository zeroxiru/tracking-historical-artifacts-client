import React, { useEffect } from 'react'; 
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ArtifactCard from './ArtifactCard';

const FeaturedArtifacts = () => {
    const { data: artifacts = [], isLoading, refetch } = useQuery({
        queryKey: ['filtered-artifacts'],
        queryFn: async () => {
            const { data: { data = [] } = {} } =
                await axios.get(`${import.meta.env.VITE_API_URL}/filtered-artifacts?sortBy=likes`);
            return data;
        },
        refetchOnWindowFocus: true, // Ensure data refreshes when navigating back
    });

    // Trigger refetch on component mount to ensure latest data
    useEffect(() => {
        refetch();
    }, []);

    if (isLoading) return <LoadingSpinner />;

    return (
        <div>
            <section className="py-2">
                <h2 className="text-3xl font-bold text-center mb-8 text-amber-900">Featured Artifacts</h2>
                {artifacts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 object-cover rounded-md">
                        {artifacts.map(artifact => (
                            <ArtifactCard key={artifact._id} artifact={artifact} refetch={refetch} />
                        ))}
                    </div>
                ) : (
                    <p>No artifacts available in the database.</p>
                )}
                <Link to='/all-artifacts'>
                    <button className="btn-amber-900 rounded-md px-2 py-2 bg-amber-800 mt-8 text-white justify-center mb-5">
                        See all Artifacts
                    </button>
                </Link>
            </section>

            {/* Extra Sections */}
           <div className='flex justify-around mb-5 '>
           <section className="py-12 bg-gray-100 md:gap-2">
                <h3 className="text-2xl font-bold mb-4 text-center text-amber-900">Why Artifacts Matter?</h3>
                <p className="text-gray-700 text-center">
                    Artifacts are vital in preserving history, providing a window into the past,<br/> and helping historians 
                    and archaeologists better understand ancient civilizations.
                </p>
            </section>

            <section className="py-12 bg-gray-100">
                <h3 className="text-2xl font-bold mb-4 text-center text-amber-900">Top Artifact Contributors</h3>
                <p className="text-gray-700 text-center">
                    Explore artifacts shared by historians, archaeologists, and collectors from around the world.
                </p>
            </section>
           </div>
        </div>
    );
};

export default FeaturedArtifacts;
