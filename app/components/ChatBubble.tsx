/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown, { Components } from 'react-markdown';
import { ChevronDown, ChevronUp, MessageSquare, User, Bot } from 'lucide-react';
import { Sources } from './Sources';
import { ReactMarkdownProps } from "react-markdown/lib/complex-types";
//new

interface Source {
  url: string;
  summary: string;
}

interface ChatBubbleProps {
  content: string;
  role: "user" | "assistant" | "status";
  statusMessages?: string[];
  timestamp?: string;
  sources?: Source[];
  sourceType?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  content, 
  role, 
  statusMessages, 
  timestamp,
  sources,
  sourceType
}) => {
  const [showThoughts, setShowThoughts] = useState(false);

  const bubbleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const renderContent = () => {
    if (role === "status") {
      return (
        <div className="flex flex-col space-y-2">
          <div className="shimmer bg-opacity-10 bg-white p-2 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="animate-spin">
                <MessageSquare className="w-4 h-4" />
              </div>
              {content}
            </div>
          </div>
          {timestamp && (
            <div className="text-xs text-gray-300 italic">
              {timestamp}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <ReactMarkdown
          components={{
            a: ({ node, ...props }: ReactMarkdownProps) => (
              <a
                className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),
            p: ({ node, ...props }: ReactMarkdownProps) => (
              <p className="whitespace-pre-wrap mb-2" {...props} />
            ),
            ul: ({ node, ...props }: ReactMarkdownProps) => (
              <ul className="list-disc list-inside space-y-1 mb-2" {...props} />
            ),
            ol: ({ node, ...props }: ReactMarkdownProps) => (
              <ol className="list-decimal list-inside space-y-1 mb-2" {...props} />
            ),
            li: ({ node, ...props }: ReactMarkdownProps) => (
              <li className="ml-4" {...props} />
            ),
            strong: ({ node, ...props }: ReactMarkdownProps) => (
              <strong className="font-semibold" {...props} />
            ),
          } as Components}
          
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  };

  return (
    <motion.div
      className={`max-w-[85%] md:max-w-[75%] ${
        role === "user" 
          ? "ml-auto bg-[#a05290] text-white rounded-t-2xl rounded-bl-2xl" 
          : role === "assistant"
          ? "bg-white text-gray-800 rounded-t-2xl rounded-br-2xl shadow-lg"
          : "bg-gray-800 bg-opacity-40 text-white rounded-xl"
      } p-4 backdrop-blur-sm`}
      initial="hidden"
      animate="visible"
      variants={bubbleVariants}
    >
      <div className="flex items-start mb-2">
        {role === "user" ? (
          <div className="bg-white p-1 rounded-full mr-2">
            <User className="w-4 h-4 text-[#a05290]" />
          </div>
        ) : role === "assistant" ? (
          <div className="bg-[#a05290] p-1 rounded-full mr-2">
            <Bot className="w-4 h-4 text-white" />
          </div>
        ) : null}
        <div className="flex-grow">{renderContent()}</div>
      </div>
      
      {role === "assistant" && sources && sources.length > 0 && sourceType && (
        <Sources sources={sources} sourceType={sourceType} />
      )}

      {role === "assistant" && statusMessages && statusMessages.length > 0 && (
        <div className="mt-3 border-t border-gray-200 pt-2">
          <button
            onClick={() => setShowThoughts(!showThoughts)}
            className="flex items-center text-sm text-gray-500 hover:text-[#a05290] transition-colors duration-200"
          >
            {showThoughts ? (
              <ChevronUp className="w-4 h-4 mr-1" />
            ) : (
              <ChevronDown className="w-4 h-4 mr-1" />
            )}
            AI Thought Process
          </button>
          
          <AnimatePresence>
            {showThoughts && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 text-sm text-gray-600"
              >
                {statusMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className="p-2 bg-gray-50 rounded-lg mb-1 animate-fade-in"
                  >
                    {msg}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

