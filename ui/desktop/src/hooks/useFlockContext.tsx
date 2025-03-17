import React, { createContext, useContext, useState } from 'react';
import { Flock } from '../components/flock/FlockSidebar';

interface FlockContextType {
  activeFlock: Flock | null;
  setActiveFlock: (flock: Flock | null) => void;
}

const FlockContext = createContext<FlockContextType | undefined>(undefined);

export const FlockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeFlock, setActiveFlock] = useState<Flock | null>(null);

  return (
    <FlockContext.Provider value={{ activeFlock, setActiveFlock }}>
      {children}
    </FlockContext.Provider>
  );
};

export const useFlockContext = () => {
  const context = useContext(FlockContext);
  if (context === undefined) {
    throw new Error('useFlockContext must be used within a FlockProvider');
  }
  return context;
};