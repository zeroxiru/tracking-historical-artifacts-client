import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ArtifactCard from './ArtifactCard';

const FeaturedArtifacts = () => {
    const { data: artifacts, isLoading } = useQuery({
        queryKey: ['filtered-artifacts'],
        queryFn: async () => {
            const { data: { data = [] } = {} } =
                await axios(`${import.meta.env.VITE_API_URL}/filtered-artifacts?sortBy=likes`);
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div>
            <section className="py-12">
                <h2 className="text-2xl font-bold text-center mb-8">Featured Artifacts</h2>
                {artifacts && artifacts.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
                        {artifacts.map(artifact => (
                            <ArtifactCard key={artifact._id} artifact={artifact} />
                        ))}
                    </div>
                ) : (
                    <p>No artifacts available in the database.</p>
                )}
                <Link to='/all-artifacts'>
                    <button className="btn bg-gray-500 mt-5 text-white justify-center">
                        See all Artifacts
                    </button>
                </Link>
            </section>

            {/* Extra Section 1 */}
            <section className="py-12 bg-gray-100">
                <h3 className="text-xl font-semibold mb-4">Why Artifacts Matter?</h3>
                <p className="text-gray-700">
                    Artifacts are vital in preserving history, providing a window into the past, and helping historians 
                    and archaeologists better understand ancient civilizations.
                </p>
            </section>

            {/* Extra Section 2 */}
            <section className="py-12">
                <h3 className="text-xl font-semibold mb-4">Top Artifact Contributors</h3>
                <p className="text-gray-700">
                    Explore artifacts shared by historians, archaeologists, and collectors from around the world.
                </p>
            </section>
        </div>
    );
};

export default FeaturedArtifacts;
