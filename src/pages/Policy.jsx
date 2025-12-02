import { motion } from "framer-motion";

export default function Policy() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/background5.jpg')` }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70 -z-5" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative py-12 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-teal-400">Privacy Policy</h1>
          <div className="bg-gray-900/90 p-6 rounded-lg shadow-lg border border-teal-500/20">
            <p className="mb-4 text-gray-300">
              At Chayil SecureX, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information.
            </p>
            <h2 className="text-xl font-semibold mb-2 text-teal-400">Information We Collect</h2>
            <p className="mb-4 text-gray-300">
              We may collect personal information such as your name, email address, and contact details when you interact with our website or services.
            </p>
            <h2 className="text-xl font-semibold mb-2 text-teal-400">How We Use Your Information</h2>
            <p className="mb-4 text-gray-300">
              Your information is used to provide our services, communicate with you, and improve our offerings.
            </p>
            <h2 className="text-xl font-semibold mb-2 text-teal-400">Data Security</h2>
            <p className="mb-4 text-gray-300">
              We implement appropriate security measures to protect your personal information against unauthorized access.
            </p>
            <p className="text-gray-300">
              For more details, please contact us at privacy@chayilsecurex.com.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
