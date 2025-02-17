import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const LikedArtifacts = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient(); // React Query Client

    // Fetch liked artifacts
    const { data: artifacts = [], isLoading } = useQuery({
        queryKey: ["liked-artifacts", user?.uid],
        queryFn: async () => {
            if (!user?.uid) return [];
            const { data } = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/liked-artifacts/${user.uid}`);
            return data || [];
        },
        enabled: !!user?.uid,
    });

    // Mutation to remove a like with Optimistic UI update
    const removeLikeMutation = useMutation({
        mutationFn: async (artifactId) => {
            await axiosSecure.delete(`${import.meta.env.VITE_API_URL}/likes/${user.uid}/${artifactId}`);
            return artifactId; // Return ID to update cache
        },
        onMutate: async (artifactId) => {
            // Optimistically update cache before API call completes
            await queryClient.cancelQueries(["liked-artifacts", user?.uid]);
            const previousData = queryClient.getQueryData(["liked-artifacts", user?.uid]);

            queryClient.setQueryData(["liked-artifacts", user?.uid], (oldData) =>
                oldData ? oldData.filter(artifact => artifact._id !== artifactId) : []
            );

            return { previousData }; // Return rollback data in case of error
        },
        onError: (error, artifactId, context) => {
            toast.error("Failed to remove like. Try again.");
            queryClient.setQueryData(["liked-artifacts", user?.uid], context.previousData); // Rollback on error
        },
        onSettled: () => {
            queryClient.invalidateQueries(["liked-artifacts", user?.uid]); // Refetch data after mutation
        },
        onSuccess: () => {
            toast.success("Removed from liked artifacts!");
        }
    });

    // Handle dislike action
    const handleDislike = (artifactId) => {
        if (window.confirm("Are you sure you want to remove this artifact from your likes?")) {
            removeLikeMutation.mutate(artifactId);
        }
    };

    if (isLoading) return <p className="text-gray-500">Loading...</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {artifacts.map((artifact) => (
                <div key={artifact._id} className="border rounded-lg shadow-md p-4 bg-white flex flex-col h-full">
                    <img src={artifact.imageUrl} alt={artifact.name} className="w-full h-40 object-cover rounded-md mb-4" />

                    {/* Fixed height for text content */}
                    <div className="flex-grow">
                        <h3 className="text-lg font-semibold">{artifact.name}</h3>
                        <p className="text-sm text-gray-600"><strong>Type:</strong> {artifact.artifactType}</p>
                        <p className="text-sm text-gray-600"><strong>Location:</strong> {artifact.presentLocation}</p>
                        <p className="text-sm text-gray-600"><strong>Likes:</strong> {artifact.likesCount}</p>
                    </div>

                    {/* Buttons aligned at the bottom */}
                    <div className="mt-auto">
                    <Link to={`/artifacts/${artifact._id}`}>
    <button className="bg-gray-700 hover:bg-gray-400 text-white px-4 py-2 rounded w-full mt-2">
        View Details
    </button>
</Link>   

                        <button
                            onClick={() => handleDislike(artifact._id)}
                            className="btn btn-danger bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded w-full mt-2"
                        >
                            Dislike
                        </button>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default LikedArtifacts;
