import * as React from 'react';
import { useState } from 'react';
import { CreateFlockModal } from './CreateFlockModal';

export interface Flock {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  unreadCount?: number;
}

// Temporary mock data
const MOCK_FLOCKS: Flock[] = [
  {
    id: '1',
    name: 'ECOM Checkout',
    description: 'Checkout team knowledge base',
    memberCount: 5,
    unreadCount: 2,
  },
  {
    id: '2',
    name: 'Combos',
    description: 'Product combinations feature',
    memberCount: 3,
  },
];

export const FlockSidebar: React.FC = () => {
  const [flocks, setFlocks] = useState<Flock[]>(MOCK_FLOCKS);
  const [activeFlock, setActiveFlock] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleFlockSelect = (flockId: string) => {
    setActiveFlock(flockId);
    // TODO: Implement flock switching logic
  };

  const handleCreateFlock = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateFlockSubmit = (flockData: { name: string; description: string }) => {
    // Create a new flock with the form data
    const newFlock: Flock = {
      id: `${Date.now()}`, // Temporary ID generation
      name: flockData.name,
      description: flockData.description,
      memberCount: 1, // Default to 1 member (the creator)
    };

    setFlocks([...flocks, newFlock]);
    setIsCreateModalOpen(false);
    setActiveFlock(newFlock.id); // Automatically select the new flock
  };

  const handleLeaveFlock = (e: React.MouseEvent, flockId: string) => {
    e.stopPropagation(); // Prevent flock selection when clicking leave
    
    // If the flock being left is currently active, clear the selection
    if (activeFlock === flockId) {
      setActiveFlock(null);
    }
    
    // Remove the flock from the list
    setFlocks(flocks.filter(flock => flock.id !== flockId));
  };

  return (
    <div className="flex flex-col h-full w-64 flex-shrink-0">
      {/* Top padding area */}
      <div className="h-9 bg-borderSubtle" /> {/* 36px */}

      {/* Main sidebar content */}
      <div className="flex-1 bg-bgSecondary border-r border-borderMain">
        <div className="h-12 flex items-center justify-between px-4 bg-bgHeader border-b border-borderMain">
          <h2 className="text-sm font-semibold text-textStandard">Flocks</h2>
          <button
            onClick={handleCreateFlock}
            className="px-3 py-1 text-sm font-medium text-textStandard hover:bg-bgHover rounded-md border border-borderMain"
          >
            Create
          </button>
        </div>
        <div className="overflow-y-auto">
          {flocks.map(flock => (
            <div
              key={flock.id}
              className={`relative p-3 cursor-pointer border-b border-borderMain hover:bg-bgHover group ${
                activeFlock === flock.id ? 'bg-bgActive' : ''
              }`}
              onClick={() => handleFlockSelect(flock.id)}
            >
              <div className="flock-item-content">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-textStandard">{flock.name}</h3>
                  <button
                    onClick={(e) => handleLeaveFlock(e, flock.id)}
                    className="invisible group-hover:visible px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 rounded-md border border-red-200"
                  >
                    Leave
                  </button>
                </div>
                <p className="text-xs text-textSecondary mt-1">{flock.description}</p>
                <div className="flex justify-between items-center text-xs text-textSecondary mt-1">
                  <span>{flock.memberCount} members</span>
                  {flock.unreadCount && (
                    <span className="px-2 py-0.5 rounded-full bg-accentMain text-white text-xs font-semibold">
                      {flock.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom padding area */}
      <div className="h-9 bg-borderSubtle" /> {/* 36px */}

      {/* Create Flock Modal */}
      <CreateFlockModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateFlockSubmit}
      />
    </div>
  );
};