import { createContext, useContext, useEffect, useState } from "react";

const PwaContext = createContext(null);

export const usePwa = () => useContext(PwaContext);

// eslint-disable-next-line react/prop-types
export const PwaProvider = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installPwa = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    setDeferredPrompt(null);
  };

  const value = {
    deferredPrompt,
    installPwa,
  };

  return <PwaContext.Provider value={value}>{children}</PwaContext.Provider>;
};