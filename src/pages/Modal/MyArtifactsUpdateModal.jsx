import React, { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";
const MyArtifactsUpdateModal = ({isUpdateModalOpen, closeModal, applicationData, onUpdate}) => {
    

    const [formData, setFormData] = useState({
        name: "",
        artifactType: "",
        historicalContext: "",
        createdAt:"" ,
        discoveredAt: "",
        discoveredBy: "",
        presentLocation: ""
    });
  

    useEffect(() => { 
        if(applicationData) { 
            setFormData({ 
                name: applicationData.name || "",
                artifactType: applicationData.artifactType || "",
                historicalContext: applicationData.historicalContext || "",
                createdAt: applicationData.createdAt || "",
                discoveredAt: applicationData.discoveredAt || "",
                discoveredBy: applicationData.discoveredBy || "",
                presentLocation: applicationData.presentLocation || ""
            })
        }
    }, [applicationData])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{ 
            await onUpdate(formData);
           
            closeModal();
        }
        catch (error) { 
            console.error(error);
            toast.error("Error updating artifact");
        }
     }

     if (!isUpdateModalOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Update Artifact</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium">Artifact Type</label>
                        <input
                            type="text"
                            name="artifactType"
                            value={formData.artifactType}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium">Historical Context</label>
                        <textarea
                            name="historicalContext"
                            value={formData.historicalContext}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        ></textarea>
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium">Created At</label>
                        <input
                            type="text"
                            name="createdAt"
                            value={formData.createdAt}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium">Discovered At</label>
                        <input
                            type="text"
                            name="discoveredAt"
                            value={formData.discoveredAt}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium">Discovered By</label>
                        <input
                            type="text"
                            name="discoveredBy"
                            value={formData.discoveredBy}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium">Present Location</label>
                        <input
                            type="text"
                            name="presentLocation"
                            value={formData.presentLocation}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-400 text-white rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MyArtifactsUpdateModal;