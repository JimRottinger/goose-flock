import React, { useState } from 'react';
import '../../styles/flock-sidebar.css';

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
    <div className="flock-sidebar">
      <div className="flock-sidebar-header">
        <h2>Flocks</h2>
      </div>
      <div className="flock-list">
        {flocks.map(flock => (
          <div
            key={flock.id}
            className={`flock-item ${activeFlock === flock.id ? 'active' : ''}`}
            onClick={() => handleFlockSelect(flock.id)}
          >
            <div className="flock-item-content">
              <h3>{flock.name}</h3>
              <p>{flock.description}</p>
              <div className="flock-item-meta">
                <span>{flock.memberCount} members</span>
                {flock.unreadCount && (
                  <span className="unread-count">{flock.unreadCount}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};