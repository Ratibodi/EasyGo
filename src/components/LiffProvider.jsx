"use client";

import { createContext, useContext, useEffect, useState } from "react";

const LiffContext = createContext({
  liff: null,
  isLoggedIn: false,
  isReady: false,
  error: null,
});

export function LiffProvider({ children }) {
  const [liff, setLiff] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    import("@line/liff")
      .then((liffModule) => {
        const liff = liffModule.default;
        liff
          .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID || "2011237849-bPMkiJSn" })
          .then(() => {
            if (isMounted) {
              setLiff(liff);
              setIsLoggedIn(liff.isLoggedIn());
              setIsReady(true);

              // If logged in but backend session might not exist, we should ideally verify.
              // We can handle this logic in the login page or a dedicated auth component.
            }
          })
          .catch((err) => {
            if (isMounted) {
              console.error("LIFF initialization failed", err);
              setError(err.toString());
              setIsReady(true);
            }
          });
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Failed to import LIFF", err);
          setError(err.toString());
          setIsReady(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <LiffContext.Provider value={{ liff, isLoggedIn, isReady, error }}>
      {children}
    </LiffContext.Provider>
  );
}

export const useLiff = () => useContext(LiffContext);
