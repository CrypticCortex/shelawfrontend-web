"use client";

import React, { useState, useEffect, useRef } from "react";
import Config from "@/app/config";
import Link from "next/link";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ArrowLeft, Send, MessageSquare, Sparkles, Bot } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";
import { ChatBubble } from "@/app/components/ChatBubble";

interface Source {
  url: string;
  summary: string;
}

interface WsMessage {
  type: string;
  message?: string;
  short_answer?: string;
  full_answer?: string;
  sources?: Source[];
  source_type?: string;
}

interface ChatBubble {
  id: string;
  content: string;
  role: "user" | "assistant" | "status";
  statusMessages?: string[];
  timestamp?: string;
  sources?: Source[];
  sourceType?: string;
}

export default function ChatPage() {
  const [tone, setTone] = useState<"casual" | "detailed">("detailed");
  const [userInput, setUserInput] = useState("");
  const [, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatBubble[]>([]);
  const [isReceivingMessage, setIsReceivingMessage] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);
  const statusSetRef = useRef<Set<string>>(new Set());
  const wsRef = useRef<WebSocket | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Config.getInstance().fetchNgrokUrls().catch(err =>
      console.error("Failed to fetch config:", err)
    );

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, currentStatus]);

  const handleSend = async () => {
    if (!userInput.trim() || isReceivingMessage) return;

    try {
      const baseUrl = Config.getInstance().apiBaseUrl;
      const timestamp = new Date().toLocaleString();

      setMessages(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          content: userInput,
          role: "user",
          timestamp,
        },
      ]);

      setIsReceivingMessage(true);
      setCurrentStatus(null);
      statusSetRef.current.clear();

      const response = await fetch(`${baseUrl}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_input: userInput,
          tone,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.session_id) {
        throw new Error("No session_id in response");
      }

      setSessionId(data.session_id);
      setUserInput("");
      connectWebSocket(data.session_id, tone);

    } catch (err) {
      console.error("Error:", err);
      setMessages(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          content: "Sorry, there was an error processing your request. Please try again.",
          role: "status",
          timestamp: new Date().toLocaleString(),
        },
      ]);
      setIsReceivingMessage(false);
      setCurrentStatus(null);
    }
  };

  const connectWebSocket = (sessionId: string, tone: string) => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    const config = Config.getInstance();
    const wsUrl = `${config.webSocketUrl}?session_id=${sessionId}&tone=${tone}`;
    const socket = new WebSocket(wsUrl);
    wsRef.current = socket;

    socket.onopen = () => {
      socket.send(JSON.stringify({ event: "start" }));
    };

    socket.onmessage = (event) => {
      try {
        const msg: WsMessage = JSON.parse(event.data);
        const timestamp = new Date().toLocaleString();

        if (msg.type === "status" && msg.message) {
          if (!statusSetRef.current.has(msg.message)) {
            statusSetRef.current.add(msg.message);
            setCurrentStatus(msg.message);
          }
        } else if (msg.type === "final_answer") {
          const statusMessages = Array.from(statusSetRef.current);
          statusSetRef.current.clear();

          setMessages(prev => {
            const withoutStatus = prev.filter(m => m.role !== "status");
            const answerText = tone === "casual" ? (msg.short_answer || "") : (msg.full_answer || "");

            return [
              ...withoutStatus,
              {
                id: crypto.randomUUID(),
                content: answerText,
                role: "assistant",
                statusMessages,
                timestamp,
                sources: msg.sources,
                sourceType: msg.source_type,
              },
            ];
          });
          setIsReceivingMessage(false);
          setCurrentStatus(null);
        }
      } catch (err) {
        console.error("Error parsing WS message:", err);
        setIsReceivingMessage(false);
        setCurrentStatus(null);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
      setIsReceivingMessage(false);
      setCurrentStatus(null);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
      setIsReceivingMessage(false);
      setCurrentStatus(null);
    };
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#d98cb3] to-[#a05290]">
      <header className="bg-white text-[#a05290] p-4 flex items-center justify-between shadow-lg">
        <Link 
          href="/" 
          className="flex items-center space-x-2 text-[#a05290] hover:text-[#d98cb3] transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline font-medium">Back to Home</span>
        </Link>
        <h1 className="text-xl font-bold flex items-center text-[#a05290]">
          <MessageSquare className="w-6 h-6 mr-2" />
          SheLaw Chat
        </h1>
        <button
          onClick={() => setTone(prev => prev === "casual" ? "detailed" : "casual")}
          className={`px-3 py-1 rounded-full text-sm border border-[#a05290]
            transition-colors duration-200 hover:bg-[#a05290] hover:text-white
            ${tone === "casual" ? "bg-[#a05290] text-white" : "bg-white text-[#a05290]"}`}
        >
          <Sparkles className="w-4 h-4 mr-1 inline" />
          {tone === "casual" ? "Casual" : "Detailed"}
        </button>
      </header>

      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col"
            >
              <ChatBubble {...msg} />
            </motion.div>
          ))}
          {currentStatus && (
            <motion.div
              key="status"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col"
            >
              <ChatBubble
                content={currentStatus}
                role="status"
                timestamp={new Date().toLocaleString()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-white/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isReceivingMessage && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm
              border border-[#d98cb3] focus:outline-none focus:border-[#a05290]
              text-gray-800 placeholder-gray-500 transition-colors duration-200"
            disabled={isReceivingMessage}
          />
          <button
            onClick={handleSend}
            disabled={!userInput.trim() || isReceivingMessage}
            className="px-4 py-2 bg-[#a05290] text-white rounded-full
              hover:bg-[#d98cb3] transition-colors duration-200 disabled:opacity-50
              disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">{isReceivingMessage ? 'Receiving...' : 'Send'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

