import { motion } from "framer-motion";
import Image from "next/image";

interface OnboardingSectionProps {
  isLoggedIn: boolean;
}

export default function OnboardingSection({ isLoggedIn }: OnboardingSectionProps) {
  const buttonText = isLoggedIn ? "Chat Now" : "Get Started";

  const handleButtonClick = () => {
    if (isLoggedIn) {
      window.location.href = "/chat";
    } else {
      window.location.href = "/signin";
    }
  };

  return (
    <section id="onboarding" className="min-h-screen flex flex-col md:flex-row items-center justify-between p-8 pt-24">
      <motion.div 
        className="md:w-1/2 mb-8 md:mb-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-magenta to-fuchsia text-transparent bg-clip-text">
          Speak Out
        </h1>
        <p className="text-lg md:text-xl mb-8 text-wine leading-relaxed">
          SHE LAW aims to empower women by making legal knowledge accessible,
          understandable, and actionable. Together, we can amplify your voice
          and protect your rights.
        </p>
        <button
          onClick={handleButtonClick}
          className="bg-pinkCustom text-white py-3 px-5 rounded shadow-md hover:bg-magenta transition-colors"
        >
          {buttonText}
        </button>
      </motion.div>
      <motion.div 
        className="md:w-1/2 flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Image
          src="/images/women.png"
          alt="Know Your Rights"
          width={500}
          height={500}
          className="rounded-lg shadow-lg"
        />
      </motion.div>
    </section>
  );
}

