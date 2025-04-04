import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import logo from '../../assets/loggo.png'

export default function QuoteSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 200) {
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
        className="bg-white border border-amber-300 shadow-lg rounded-2xl p-8 max-w-3xl text-center relative mt-5 mb-5"
      >
        <div className="text-5xl font-bold text-gray-700">“</div>
        <p className="text-xl text-amber-600 font-semibold">
          "Preserving the past, enriching the future."
        </p>
        <div className="text-5xl font-bold text-gray-700">”</div>
        <p className="mt-4 text-amber-600 font-semibold">- Historical Archives</p>
        <div className="absolute bottom-4 right-4 opacity-50">
          <img src={logo} alt="Logo" className="w-10 h-10 border rounded-xl " />
        </div>
      </motion.div>
    </div>
  );
}
