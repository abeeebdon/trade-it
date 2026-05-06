'use client';

import { createContext, useContext, useState } from 'react';

type HeaderData = {
  title: string;
  kicker: string;
};

type HeaderContextType = {
  title: string | null;
  kicker: string | null;
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
