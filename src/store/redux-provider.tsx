'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppDispatch } from '@/hooks/store/store';
import { setOrders } from './orders/orders.slice';

// Keeps the demo orders in sync across browser tabs/windows, so the
// admin, consumer and exporter dashboards always show the same shared
// pipeline even when each role is open in its own tab. When another
// tab writes a status change to localStorage (redux-persist), this
// picks it up and re-applies it to the local store.
function CrossTabOrdersSync() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onStorage = (e: StorageEvent) => {
      if (e.key !== 'persist:root' || !e.newValue) return;
      try {
        const root = JSON.parse(e.newValue);
        if (root.orders) {
          const ordersState = JSON.parse(root.orders);
          if (Array.isArray(ordersState.orders)) {
            dispatch(setOrders(ordersState.orders));
          }
        }
      } catch {
        // Ignore malformed/partial storage writes.
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [dispatch]);

  return null;
}

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <CrossTabOrdersSync />
      {children}
    </Provider>
  );
};

export default ReduxProvider;
