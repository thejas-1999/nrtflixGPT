import { motion } from "framer-motion";
import { Film } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white z-50">
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
        className="border-4 border-gray-600 border-t-red-500 rounded-full w-16 h-16 mb-4"
      ></motion.div>

      <div className="flex items-center gap-2 text-xl font-semibold tracking-wide">
        <Film className="text-red-500 w-6 h-6 animate-pulse" />
        <motion.span
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Loading movies...
        </motion.span>
      </div>

      <motion.div
        className="mt-4 h-1 w-40 bg-gray-700 rounded-full overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: ["0%", "100%", "0%"] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <motion.div className="h-full bg-red-500"></motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
