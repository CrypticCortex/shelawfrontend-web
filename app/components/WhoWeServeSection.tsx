import { motion } from "framer-motion";
import Image from "next/image";

export default function WhoWeServeSection() {
  return (
    <section id="who-we-serve" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-magenta to-fuchsia text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          For Every Woman Everywhere
        </motion.h2>
        <motion.p 
          className="text-xl text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          At SHE LAW, we serve all women, empowering them with knowledge,
          support, and guidance to navigate legal challenges.
        </motion.p>
        <div className="flex flex-wrap justify-center -mx-4">
          {["2.png", "3.png", "4.png", "5.png", "6.png"].map((img, index) => (
            <motion.div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 px-4 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={`/images/${img}`}
                alt={`Image ${index + 1}`}
                width={300}
                height={300}
                className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

