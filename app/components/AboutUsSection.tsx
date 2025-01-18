import { motion } from "framer-motion";

export default function AboutUsSection() {
  return (
    <section id="aboutus" className="py-16 bg-pink-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-magenta to-fuchsia text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About SHE LAW
        </motion.h2>
        <div className="flex flex-wrap -mx-4">
          <motion.div 
            className="w-full md:w-1/2 px-4 mb-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-3xl font-semibold mb-4 text-magenta">What We Do</h3>
            <p className="text-lg mb-4">SHE LAW bridges the gap between women and the legal world by offering:</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2 text-pinkCustom">✓</span>
                Easy-to-understand explanations of laws and rights
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-pinkCustom">✓</span>
                Step-by-step advice on what actions to take
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-pinkCustom">✓</span>
                A safe space for women to share concerns
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-pinkCustom">✓</span>
                AI-Powered assistance with personalized suggestions
              </li>
            </ul>
          </motion.div>
          <motion.div 
            className="w-full md:w-1/2 px-4 mb-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-3xl font-semibold mb-4 text-magenta">Why SHE LAW?</h3>
            <p className="text-lg mb-4">SHE LAW was created to dismantle barriers by providing a platform that is:</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2 text-pinkCustom">✓</span>
                Safe: Privacy and confidentiality are our priorities
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-pinkCustom">✓</span>
                Accessible: Easy-to-use for women of all backgrounds
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-pinkCustom">✓</span>
                Empowering: Equipping you with tools and knowledge to take control
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

