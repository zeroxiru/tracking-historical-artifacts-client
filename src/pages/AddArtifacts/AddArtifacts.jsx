import React, { useContext, useState } from 'react';

import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddArtifacts = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        imageUrl: '',
        artifactType: '',
        historicalContext: '',
        createdAt: '',
        discoveredAt: '',
        discoveredBy: '',
        presentLocation: '',
        adderName: user?.displayName || 'N/A',
        adderEmail: user?.email || ''
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/addArtifact`, {
                ...formData,
                likeCount: 0
            });
            toast.success('Artifact added successfully!');
            
            setTimeout(() => navigate('/all-artifacts'), 2000);
        } catch (error) {
            toast.error('Failed to add artifact. Please try again.');
        }
    };

    return (
        <div className="text-center py-10">
            <h2 className="text-blue-900 font-bold text-4xl mb-6 ">Add Artifact</h2>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-base-200 p-8 rounded-lg">
                <div className="mb-4">
                    <label className="block text-left mb-2 font-medium">Artifact Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-left mb-2 font-medium">Artifact Image (URL)</label>
                    <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-left mb-2 font-medium">Artifact Type</label>
                    <select
                        name="artifactType"
                        value={formData.artifactType}
                        onChange={handleInputChange}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="">Select Artifact Type</option>
                        <option value="Tools">Tools</option>
                        <option value="Weapons">Weapons</option>
                        <option value="Documents">Documents</option>
                        <option value="Writings">Writings</option> 
                        <option value="Sculptures">Sculptures</option> 
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-left mb-2 font-medium">Historical Context</label>
                    <textarea
                        name="historicalContext"
                        value={formData.historicalContext}
                        onChange={handleInputChange}
                        className="textarea textarea-bordered w-full"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-left mb-2 font-medium">
                        Created At (e.g., "100 BC")
                    </label>
                    <input
                        type="text"
                        name="createdAt"
                        value={formData.createdAt}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="e.g., 100 BC or 1500 AD"
                        pattern="^(?:(\d{1,4} (BC|AD))|\d{1,4})$"
                        title='Enter a year like "100 BC" or "1500"'
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-left mb-2 font-medium">
                        Discovered At (e.g., "1799" or "100 BC")
                    </label>
                    <input
                        type="text"
                        name="discoveredAt"
                        value={formData.discoveredAt}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder='Enter a year (e.g., "1799" or "100 BC")'
                        title='Enter a valid year like "1799" or "100 BC"'
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-left mb-2 font-medium">Discovered By</label>
                    <input
                        type="text"
                        name="discoveredBy"
                        value={formData.discoveredBy}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="Name of discoverer (e.g., John Doe)"
                        required
                    />
                </div>


                <div className="mb-4">
                    <label className="block text-left mb-2 font-medium">Present Location</label>
                    <input
                        type="text"
                        name="presentLocation"
                        value={formData.presentLocation}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-left mb-2 font-medium">Artifact Adder Name</label>
                    <input
                        type="text"
                        value={formData.adderName}
                        readOnly
                        className="input input-bordered w-full bg-gray-200"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-left mb-2 font-medium">Artifact Adder Email</label>
                    <input
                        type="email"
                        value={formData.adderEmail}
                        readOnly
                        className="input input-bordered w-full bg-gray-200"
                    />
                </div>

                <button type="submit" className="btn bg-yellow-800 text-black w-full input-bordered mt-4">
                    Add Artifact
                </button>
            </form>

        </div>
    );
};

export default AddArtifacts;
