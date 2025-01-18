import { motion } from "framer-motion";

export default function VisionSection() {
  return (
    <section id="vision" className="py-16 bg-pink-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-magenta to-fuchsia text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Vision
        </motion.h2>
        <div className="flex flex-wrap -mx-4">
          {[
            {
              title: "Motive",
              content: "We strive to empower every woman with the confidence to speak up and the resources to act. SHE LAW champions justice and equality as a collaborative movement.",
            },
            {
              title: "Future Work",
              content: "We're expanding our reach and enhancing features to better serve women worldwide. Your collaboration can drive greater impact. Making it available in multiple languages and getting required data.",
            },
            {
              title: "Collaborate with Us",
              content: "Interested in joining our mission? Reach us at nezukosan.mcs@gmail.com",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="w-full md:w-1/3 px-4 mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="bg-white p-6 rounded-lg shadow-lg h-full">
                <h3 className="text-2xl font-semibold text-magenta mb-4">{item.title}</h3>
                <p className="text-lg">{item.content}</p>
                {item.title === "Collaborate with Us" && (
                  <a href="mailto:nezukosan.mcs@gmail.com" className="text-magenta underline mt-4 inline-block">
                    nezukosan.mcs@gmail.com
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

