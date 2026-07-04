import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { GlobalLoader } from "../Loader/GlobalLoader";

// Module-level flag: show the full loader only on the very first app load
let hasLoadedOnce = false;

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const isFirstLoad = !hasLoadedOnce;
  const [isLoading, setIsLoading] = useState(isFirstLoad);

  useEffect(() => {
    if (!isFirstLoad) return;

    // Full loading screen duration (~4 seconds)
    const timer = setTimeout(() => {
      hasLoadedOnce = true;
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [isFirstLoad]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="global-loader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
              transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
            }}
            className="fixed inset-0 z-[100]"
          >
            <GlobalLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-full flex flex-col flex-1"
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
