import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function QuoteSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-10 bg-gray-100">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isVisible ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white border border-blue-300 shadow-lg rounded-2xl p-8 max-w-2xl text-center relative"
      >
        <div className="text-5xl font-bold text-gray-700">“</div>
        <p className="text-xl text-blue-500 font-semibold">
          "Preserving the past, enriching the future."
        </p>
        <div className="text-5xl font-bold text-gray-700">”</div>
        <p className="mt-4 text-blue-500 font-semibold">- Historical Archives</p>
        <div className="absolute bottom-4 right-4 opacity-50">
          <img src="/logo.png" alt="Logo" className="w-12" />
        </div>
      </motion.div>
    </div>
  );
}
