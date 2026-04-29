"use client";

import { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

const ReduxPersistGate = ({ children }: { children: React.ReactNode }) => {
  return (
    <PersistGate persistor={persistor} loading={null}>
      {children}
    </PersistGate>
  );
};

export default ReduxPersistGate;
