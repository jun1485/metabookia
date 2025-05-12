"use client";

import { BookSeries } from "../data/types/book";
import { motion } from "framer-motion";

interface SeriesTabsProps {
  seriesList: BookSeries[];
  selectedSeries: string | null;
  onSelectSeries: (seriesId: string) => void;
}

export default function SeriesTabs({
  seriesList,
  selectedSeries,
  onSelectSeries,
}: SeriesTabsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full md:w-60 bg-light-300 dark:bg-dark-200 rounded-lg p-4 shadow-md"
    >
      <h2 className="text-xl font-bold mb-4 text-secondary-700 dark:text-secondary-400">
        책 시리즈
      </h2>
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        {seriesList.map((series) => (
          <motion.li key={series.id} variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectSeries(series.id)}
              className={`w-full text-left px-4 py-2 rounded-md ${
                selectedSeries === series.id
                  ? "bg-primary-600 text-white"
                  : "hover:bg-light-400 dark:hover:bg-dark-100 text-gray-700 dark:text-gray-300"
              }`}
            >
              {series.name}
            </motion.button>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
