import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useState } from 'react'

export default function CustomerService() {
  const { isDark } = useTheme()
  const [selectedTopic, setSelectedTopic] = useState(null)

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/background5.jpg')` }}>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative max-w-6xl mx-auto px-6 py-16"
      >
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-teal-400 drop-shadow-lg">
          Customer Service
        </h1>

        {/* Intro Card */}
        <div className={`p-6 rounded-2xl shadow-2xl border border-teal-500/30 max-w-4xl mx-auto mb-12 backdrop-blur-md ${isDark ? "bg-gray-900/70 text-gray-300" : "bg-white/80 text-gray-800"}`}>
          <p className="text-base md:text-lg">
            We're here to help! Get in touch with our customer service team for support with our services, billing, or any other inquiries.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl shadow-2xl border border-teal-500/30 backdrop-blur-md bg-gray-900/70 text-gray-300"
          >
            <h2 className="text-2xl font-semibold mb-4 text-teal-400">Contact Information</h2>
            <div className="space-y-3 text-left text-sm md:text-base">
              <p><strong>Email:</strong> support@chayilsecurex.com</p>
              <p><strong>Phone:</strong> +233 123 456 789</p>
              <p><strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM GMT</p>
              <p><strong>Address:</strong> Accra Digital Centre, Ghana</p>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl shadow-2xl border border-teal-500/30 backdrop-blur-md bg-gray-900/70 text-gray-300"
          >
            <h2 className="text-2xl font-semibold mb-4 text-teal-400">Quick Actions</h2>
            <div className="space-y-3 text-sm md:text-base">
              <Link to="/contact" className="block bg-teal-500 text-black px-4 py-2 rounded-lg hover:bg-teal-400 transition font-semibold text-center">
                Send Us a Message
              </Link>
              <Link to="/faq" className="block bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600 transition border border-teal-500/30 text-center">
                View FAQ
              </Link>
              <Link to="/services" className="block bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600 transition border border-teal-500/30 text-center">
                Our Services
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Common Topics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 rounded-2xl shadow-2xl border border-teal-500/30 backdrop-blur-md bg-gray-900/70 text-gray-300 max-w-5xl mx-auto"
        >
          <h2 className="text-2xl font-semibold mb-6 text-teal-400 text-center">Common Support Topics</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { key: 'service', title: 'Service Inquiries', desc: 'Questions about our GRC and cybersecurity services' },
              { key: 'billing', title: 'Billing & Payments', desc: 'Issues with invoices, payments, or subscriptions' },
              { key: 'technical', title: 'Technical Support', desc: 'Help with our tools, platforms, or integrations' },
            ].map(topic => (
              <div
                key={topic.key}
                className="text-center cursor-pointer hover:bg-gray-800 p-4 rounded-lg transition-colors duration-200"
                onClick={() => setSelectedTopic(topic.key)}
              >
                <h3 className="font-semibold text-cyan-300 mb-2">{topic.title}</h3>
                <p className="text-gray-400 text-sm">{topic.desc}</p>
              </div>
            ))}
          </div>

          {/* Topic Details */}
          {selectedTopic && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mt-6 p-4 rounded-lg border border-teal-500/30 bg-gray-800"
            >
              <h3 className="text-lg font-semibold text-teal-400 mb-3">
                {selectedTopic === 'service' && 'Service Inquiries'}
                {selectedTopic === 'billing' && 'Billing & Payments'}
                {selectedTopic === 'technical' && 'Technical Support'}
              </h3>
              <div className="text-gray-300 text-sm md:text-base space-y-2">
                {selectedTopic === 'service' && (
                  <>
                    <p>• Learn about our comprehensive GRC (Governance, Risk, and Compliance) solutions</p>
                    <p>• Understand our cybersecurity assessment and monitoring services</p>
                    <p>• Get information about service packages and pricing</p>
                    <p>• Schedule a consultation with our experts</p>
                  </>
                )}
                {selectedTopic === 'billing' && (
                  <>
                    <p>• View and download your invoices</p>
                    <p>• Update payment methods and billing information</p>
                    <p>• Understand subscription plans and renewal dates</p>
                    <p>• Request refunds or billing adjustments</p>
                  </>
                )}
                {selectedTopic === 'technical' && (
                  <>
                    <p>• Access documentation and user guides</p>
                    <p>• Troubleshoot platform access issues</p>
                    <p>• Learn about API integrations and webhooks</p>
                    <p>• Get help with dashboard features and reports</p>
                  </>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-3 justify-center">
                <Link to="/contact" className="bg-teal-500 text-black px-4 py-2 rounded-lg hover:bg-teal-400 transition font-semibold text-sm">
                  Contact Support
                </Link>
                <button onClick={() => setSelectedTopic(null)} className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600 transition text-sm">
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.section>
    </div>
  )
}
