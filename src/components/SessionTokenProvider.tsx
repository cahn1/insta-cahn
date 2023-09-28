import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

const STORAGE_KEY = 'session-token';

const initialToken = sessionStorage.getItem(STORAGE_KEY);

type SessionTokenContext = {
  sessionToken: string | null;
  setSessionToken: (sessionToken: string | null) => void;
};

const Context = createContext<SessionTokenContext | null>(null);

export function SessionTokenProvider(props: { children: ReactNode }) {
  const [sessionToken, setSessionToken] = useState(initialToken);
  const context = useMemo<SessionTokenContext>(() => {
    return {
      sessionToken,
      setSessionToken: (sessionToken) => {
        if (sessionToken === null) {
          sessionStorage.removeItem(STORAGE_KEY);
        } else {
          sessionStorage.setItem(STORAGE_KEY, sessionToken);
        }
        setSessionToken(sessionToken);
      },
    };
  }, [sessionToken, setSessionToken]);
  return <Context.Provider value={context}>{props.children}</Context.Provider>;
}

export function useSessionToken() {
  const context = useContext(Context);
  if (context === null) {
    throw new Error('useSessionToken must be within SessionTokenProvider');
  }
  return context;
}
