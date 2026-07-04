import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { GlobalLoader } from "../Loader/GlobalLoader";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate network/resource loading time on route change
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // 1.2s minimum loader display

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="global-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100]"
          >
            <GlobalLoader />
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-full flex flex-col flex-1"
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
