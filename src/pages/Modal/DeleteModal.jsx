import React from 'react';

const DeleteModal = ({ isDeleteModalOpen, closeModal, handleDelete }) => {
  if (!isDeleteModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold text-gray-800">Confirm Deletion</h2>
        <p className="mt-4 text-gray-600">
          Are you sure you want to delete this artifacts? This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end space-x-4">
          {/* Cancel button */}
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-gray-800"
          >
            Cancel
          </button>

          {/* Confirm delete button */}
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
