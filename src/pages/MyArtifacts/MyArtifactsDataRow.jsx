import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/UseAxiosSecure';
import { MdCancel } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import DeleteModal from '../Modal/DeleteModal';
import toast from 'react-hot-toast';
import MyArtifactsUpdateModal from '../Modal/MyArtifactsUpdateModal';

const MyArtifactsDataRow = ({AppData, refetch, isDisabled = false}) => {
    console.log(AppData);
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth()

    const [deleteTargetId, setDeleteTargetId] = useState(null); // To track the item to delete
    const [updateTargetId, setUpdateTargetId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const { _id, name, imageUrl, artifactType, historicalContext, createdAt, discoveredAt, discoveredBy, presentLocation} = AppData
    console.log(imageUrl);

    const closeModal = () => {
        setIsDeleteModalOpen(false); 
        setIsUpdateModalOpen(false); 
        setDeleteTargetId(null); 
        setUpdateTargetId(null)
    
    };
    const openDeleteModal = (id) => {
        setDeleteTargetId(id); // Set the target ID for deletion
        setIsDeleteModalOpen(true); // Open the delete modal
    };
    const openUpdateModal = (id) => {
        setUpdateTargetId(id); // Set the target ID for update
        setIsUpdateModalOpen(true); // Open the update modal
    };
  
    const handleDelete = async () => {
        if (!deleteTargetId) return;

        try {
            await axiosSecure.delete(`/my-artifacts/${deleteTargetId}`);
            refetch(); // Refresh the UI
            toast.success('Application Deleted');
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data || 'Error cancelling application');
        } finally {
            closeModal();
        }
    };

    

    const handleUpdate = async (updatedData) => {
        if (!updateTargetId) return;
        console.log(updatedData);
        try {
          // Replace with your API endpoint and make sure `updateTargetId` is defined
          const response = await axiosSecure.put(
            `/my-artifacts/${updateTargetId}`, // API endpoint
            updatedData // Data to update
          );
      
          console.log('Update Target ID:', updateTargetId);
          console.log('Updated Data:', updatedData);
      
          // Handle success response
          if (response.status === 200) {
            console.log('Updated successfully:', response.data);
            toast.success('Application updated successfully!');
            refetch(); // Refresh the data to reflect changes
          } else {
            throw new Error('Failed to update the application');
          }
        } catch (error) {
          // Log and display error
          console.error('Error updating application:', error.message);
          toast.error('Failed to update application. Please try again.');
        }
      };

    return (
        <tr>
        {/* <td className='px-5 py-5 border-b border-gray-200 '>
        <img src={imageUrl} alt="Artifact" className="w-16 h-16 object-cover rounded-md mx-auto" />
        </td> */}
         
         <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={imageUrl}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
        </div>
      </td>

        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
            <p className='text-gray-900 whitespace-no-wrap'>{name}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
            <p className='text-gray-900 whitespace-no-wrap'>{artifactType}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
            <p className='text-gray-900 whitespace-no-wrap'>
                {historicalContext?.split(" ").slice(0, 5).join(" ")+(historicalContext?.split(" ").length > 5 ? "..." : "")}

            </p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
            <p className='text-gray-900 whitespace-no-wrap'>{createdAt}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
            <p className='text-gray-900 whitespace-no-wrap'>{discoveredAt}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
            <p className='text-gray-900 whitespace-no-wrap'>{discoveredBy}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
            <p className='text-gray-900 whitespace-no-wrap'>{presentLocation}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
            <div
                className={`relative ${isDisabled ? 'disabled:cursor-not-allowed opacity-50' : 'cursor-pointer'} inline-block px-3 py-1 font-semibold text-lime-900 leading-tight`}
            >
                <div className='flex items-center space-x-4 text-center'>
                    <span
                        className='relative cursor-pointer'
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isDisabled) openDeleteModal(_id); 
                        }}
                        title="Delete"
                    >
                        <MdCancel />
                    </span>
                    <span
                        className='relative cursor-pointer'
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isDisabled) openUpdateModal(_id);
                        }}
                        title="Edit"
                    >
                        <CiEdit />
                    </span>
                    
               
                </div>
            </div>
            <DeleteModal isDeleteModalOpen={isDeleteModalOpen} 
            closeModal={closeModal} 
            handleDelete={handleDelete} />

             <MyArtifactsUpdateModal
             isUpdateModalOpen={isUpdateModalOpen}
                closeModal={closeModal}
                applicationData={AppData}
                onUpdate={handleUpdate}></MyArtifactsUpdateModal> 
                
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
            {/* <button onClick={openReviewModal} disabled={isDisabled} className={`${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <MdRateReview />
            </button> */}
            {/* <MyApplicationReviewModal
            isReviewModalOpen={isReviewModalOpen}
            closeModal={closeModal}
            applicationData={AppData}
            user={user}
            >

            </MyApplicationReviewModal> */}
        </td>
    </tr>
    );
};

export default MyArtifactsDataRow;