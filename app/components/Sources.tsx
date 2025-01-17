import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, LinkIcon } from 'lucide-react';

interface Source {
  url: string;
  summary: string;
}

interface SourcesProps {
  sources: Source[];
  sourceType: string;
}

export const Sources: React.FC<SourcesProps> = ({ sources, sourceType }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-4 border-t border-gray-200 pt-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center text-sm text-gray-500 hover:text-[#a05290] transition-colors duration-200"
      >
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 mr-1" />
        ) : (
          <ChevronDown className="w-4 h-4 mr-1" />
        )}
        Sources ({sourceType})
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {sources.map((source, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="mt-3 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <LinkIcon className="w-4 h-4 text-[#a05290]" />
                  </div>
                  <div className="space-y-2">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a05290] hover:text-[#d98cb3] transition-colors duration-200 text-sm break-all"
                    >
                      {source.url}
                    </a>
                    <p className="text-sm text-gray-600 mt-2">{source.summary}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

