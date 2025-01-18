import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ModesSection() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const handleModeSelect = (mode: string) => {
    setSelectedMode(mode);
  };

  return (
    <section id="modes" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-magenta to-fuchsia text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Choose Your Mode
        </motion.h2>
        <div className="flex justify-center space-x-8 mb-12">
          <ModeButton mode="Casual" onSelect={handleModeSelect} />
          <ModeButton mode="Detailed" onSelect={handleModeSelect} />
        </div>
        {selectedMode && <ModeDetails mode={selectedMode} />}
      </div>
    </section>
  );
}

function ModeButton({ mode, onSelect }: { mode: string; onSelect: (mode: string) => void }) {
  return (
    <motion.button
      onClick={() => onSelect(mode)}
      className="bg-pinkCustom text-white py-3 px-6 rounded shadow-md hover:bg-magenta text-lg transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {mode} Mode
    </motion.button>
  );
}

function ModeDetails({ mode }: { mode: string }) {
  const isCasual = mode === "Casual";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto"
    >
      <h3 className="text-3xl font-semibold text-magenta mb-4">{mode} Mode</h3>
      <p className="text-lg mb-6">
        {isCasual
          ? "Your Comfort is Our Priority. We'll guide you with gentle and understanding responses to ensure you feel supported."
          : "Clear and Detailed Guidance. Get clear insights and actionable steps to move forward confidently."}
      </p>
      <Image
        src={isCasual ? "/images/casual.png" : "/images/detailed.png"}
        alt={`${mode} Mode`}
        width={600}
        height={400}
        className="rounded-lg mb-4"
      />
      <div className="space-y-2 text-pink-700">
        {isCasual ? (
          <>
            <p>• I&apos;m here for you! Let&apos;s take it one step at a time.</p>
            <p>• You&apos;re not alone, and we&apos;ll figure out the best way forward together.</p>
          </>
        ) : (
          <>
            <p>1. Write down details of the incidents, including dates and times.</p>
            <p>2. Consult relevant policies or laws applicable to your situation.</p>
          </>
        )}
      </div>
    </motion.div>
  );
}

