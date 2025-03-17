import * as React from 'react';
import { useState } from 'react';

interface CreateFlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (flockData: { name: string; description: string }) => void;
}

export const CreateFlockModal: React.FC<CreateFlockModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description });
    setName('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* Header - matching the sidebar header style */}
        <div className="h-12 flex items-center px-4 bg-bgHeader border-b border-borderMain">
          <h2 className="text-sm font-semibold text-textStandard">Create New Flock</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 bg-white">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-borderMain rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-accentMain"
              placeholder="Enter flock name"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-borderMain rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-accentMain"
              placeholder="Enter flock description"
              rows={3}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-borderMain"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};