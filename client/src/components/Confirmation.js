// src/components/ConfirmationModal.js
import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
            <div className="bg-white rounded-lg p-6 space-y-4">
                <h2 className="text-lg font-semibold">Confirm Deletion</h2>
                <p>Are you sure you want to delete this product?</p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-gray-200 px-4 py-2 rounded-md"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded-md"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
