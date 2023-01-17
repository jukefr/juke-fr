import React, { createContext, useContext, useMemo, useState } from 'react';
import Introduction from './Introduction';

const AppContext = createContext(null);

// so we dont have GL Context loss on page switch
const introInstance = <Introduction />;

export function AppWrapper({ children }: { children: React.ReactElement }) {
  const [appState, setAppState] = useState({ introInstance });

  const appContextState = useMemo(
    () => ({ appState, setAppState }),
    [appState, setAppState],
  );

  return (
    <AppContext.Provider value={appContextState as any}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
