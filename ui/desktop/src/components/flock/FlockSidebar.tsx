import * as React from 'react';
import { useState } from 'react';

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
  const [flocks] = useState<Flock[]>(MOCK_FLOCKS);
  const [activeFlock, setActiveFlock] = useState<string | null>(null);

  const handleFlockSelect = (flockId: string) => {
    setActiveFlock(flockId);
    // TODO: Implement flock switching logic
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top padding area */}
      <div className="h-9 bg-borderSubtle" /> {/* 36px */}

      {/* Main sidebar content */}
      <div className="flex-1 bg-bgSecondary border-r border-borderMain">
        <div className="h-12 flex items-center px-4 bg-bgHeader border-b border-borderMain">
          <h2 className="text-sm font-semibold text-textStandard">Flocks</h2>
        </div>
        <div className="overflow-y-auto">
          {flocks.map(flock => (
            <div
              key={flock.id}
              className={`p-3 cursor-pointer border-b border-borderMain hover:bg-bgHover ${
                activeFlock === flock.id ? 'bg-bgActive' : ''
              }`}
              onClick={() => handleFlockSelect(flock.id)}
            >
              <div className="flock-item-content">
                <h3 className="text-sm font-semibold text-textStandard">{flock.name}</h3>
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
    </div>
  );
};