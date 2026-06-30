'use client';

import { createContext, useContext, useState } from 'react';

type HeaderData = {
  title: string;
  kicker: string;
  badge?: string;
  action?: React.ReactNode;
};

type HeaderContextType = {
  title: string | null;
  kicker: string | null;
  badge: string | null;
  action: React.ReactNode | null; // ← new
  setHeader: (data: HeaderData | null) => void;
};

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [header, setHeaderState] = useState<HeaderData | null>(null);

  const setHeader = (data: HeaderData | null) => {
    setHeaderState(data);
  };

  return (
    <HeaderContext.Provider
      value={{
        title: header?.title ?? null,
        kicker: header?.kicker ?? null,
        badge: header?.badge ?? null,
        action: header?.action ?? null, // ← new
        setHeader,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within HeaderProvider');
  }
  return context;
};
