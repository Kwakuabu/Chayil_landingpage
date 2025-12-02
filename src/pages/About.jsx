import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const tabs = [
  {
    id: "mission",
    title: "Our Mission",
    content:
      "To simplify compliance, strengthen risk management, and accelerate growth for African organizations through world-class GRC advisory, cybersecurity assurance, and capacity-building initiatives.",
  },
  {
    id: "vision",
    title: "Our Vision",
    content:
      "To be Africa's trusted partner in building a secure, compliant, and resilient digital economy.",
  },
  {
    id: "team",
    title: "Our Team",
    content: [
      {
        name: "Charles Fiifi Hagan",
        role: "Founder & CEO",
        image: `${import.meta.env.BASE_URL}images/ceo.jpg`,
        description: "Expert in GRC, IT Audit, Cybersecurity Compliance",
      },
      {
        name: "Ebenezer Oduro",
        role: "COO",
        image: `${import.meta.env.BASE_URL}images/Ebenezer.jpg`,
        description: "BSc IT, MSc Cybersecurity; operational excellence",
      },
      {
        name: "Silas Asani Abudu",
        role: "CTO / Head of Cybersecurity",
        image: `${import.meta.env.BASE_URL}images/Silas.jpg`,
        description: "Healthcare cybersecurity, ML threat detection, DevSecOps",
      },
    ],
  },
  {
    id: "advisors",
    title: "Strategic Advisors",
    content: [
      {
        name: "Dr. Noah Darko-Adjei",
        role: "CEO - Yesyoucan Cybersecure",
        image: `${import.meta.env.BASE_URL}images/Noah.jpg`,
      },
      {
        name: "Seth Odoi Asare",
        role: "Cybersecurity Professional",
        image: `${import.meta.env.BASE_URL}images/Seth Odoi Asare.jpg`,
      },
      {
        name: "Ghana Digital Centres Limited",
        role: "Government Digital Partner",
        image: `${import.meta.env.BASE_URL}images/Accra Digital Center.png`,
      },
    ],
  },
];

export default function About() {
  const [activeTab, setActiveTab] = useState("mission");
  const { isDark } = useTheme();

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/background5.jpg')` }}
      />
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/70 -z-5" />

      {/* Main content */}
      <div className="relative py-12 px-4 text-white">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-teal-400">
            About Chayil SecureX
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Building Africa's digital trust through world-class GRC and cybersecurity solutions.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="max-w-5xl mx-auto mb-10 flex justify-center gap-4 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                activeTab === tab.id
                  ? "bg-teal-400 text-black shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === "mission" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-lg md:text-xl leading-relaxed"
            >
              {tabs[0].content}
            </motion.div>
          )}

          {activeTab === "vision" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-lg md:text-xl leading-relaxed"
            >
              {tabs[1].content}
            </motion.div>
          )}

          {activeTab === "team" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {tabs[2].content.map((member, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gray-900 rounded-xl shadow-lg p-6 text-center border border-teal-500/20 transition"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-28 h-28 rounded-full mx-auto mb-4 border-2 border-teal-500"
                  />
                  <h3 className="font-semibold text-teal-400">{member.name}</h3>
                  <p className="text-gray-300 text-sm mb-2">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "advisors" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {tabs[3].content.map((advisor, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gray-900 rounded-xl shadow-lg p-6 text-center border border-teal-500/20 transition"
                >
                  <img
                    src={advisor.image}
                    alt={advisor.name}
                    className="w-28 h-28 rounded-full mx-auto mb-4 border-2 border-teal-500"
                  />
                  <h3 className="font-semibold text-teal-400">{advisor.name}</h3>
                  <p className="text-gray-300 text-sm">{advisor.role}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
