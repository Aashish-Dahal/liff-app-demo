"use client"; // Mark this as a Client Component

import type { Liff } from "@line/liff";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type LIFFContextType = {
  liff: Liff | null;
  liffError: string | null;
  liffUrl: string | null;
};

const LIFFContext = createContext<LIFFContextType | null>(null);

const LIFFContextProvider = ({ children }: { children: ReactNode }) => {
  const [liff, setLiff] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);
  const [liffUrl, setLiffUrl] = useState<string | null>(null);

  useEffect(() => {
    import("@line/liff")
      .then((liff) => liff.default)
      .then((liff) => {
        liff
          .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID || "" })
          .then(() => {
            setLiff(liff);
            setLiffUrl(
              `${process.env.NEXT_PUBLIC_LIFF_URL}/${process.env.NEXT_PUBLIC_LIFF_ID}`
            );
          })
          .catch((error: Error) => {
            console.log("LIFF init failed.");
            setLiffError(error.toString());
          });
      });
  }, []);

  return (
    <LIFFContext.Provider value={{ liff, liffError, liffUrl }}>
      {children}
    </LIFFContext.Provider>
  );
};

const useLIFFContext = () => {
  const context = useContext(LIFFContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { LIFFContextProvider, useLIFFContext };
