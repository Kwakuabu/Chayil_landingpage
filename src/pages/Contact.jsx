import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa'

export default function Contact() {
  const { isDark } = useTheme()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const result = await response.json()
      if (result.success) {
        setMessage('✓ Message sent successfully! We\'ll get back to you shortly.')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setMessage(`✗ Error: ${result.error}`)
      }
    } catch (err) {
      setMessage(`✗ Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/background5.jpg')` }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60 -z-5" />

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative max-w-6xl mx-auto px-6 py-16 text-white"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 drop-shadow-lg">
          <img
            src={`${import.meta.env.BASE_URL}images/logo.jpg`}
            alt="Chayil SecureX"
            className="h-24 w-auto mb-4 rounded-full border-2 border-teal-400 shadow-lg"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Contact Us</h1>
          <p className="text-teal-200 max-w-2xl text-lg">
            Reach out for consultations, demos, partnerships, or general enquiries. We'd love to hear from you.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
          {/* Contact Form */}
          <motion.div
            className="bg-gray-900/90 p-6 rounded-2xl backdrop-blur-md border border-teal-500/50 shadow-lg max-w-md mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl font-semibold text-teal-400 mb-5">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              {['name', 'email', 'phone', 'message'].map((field, idx) => {
                const isTextArea = field === 'message'
                return isTextArea ? (
                  <textarea
                    key={idx}
                    name={field}
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full p-3 rounded-lg bg-gray-800/90 border border-teal-500/50 placeholder-teal-300 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                    required
                  />
                ) : (
                  <input
                    key={idx}
                    name={field}
                    type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                    placeholder={field === 'name' ? 'Full Name' : field === 'email' ? 'Email' : 'Phone (optional)'}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-gray-800/90 border border-teal-500/50 placeholder-teal-300 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                    required={field !== 'phone'}
                  />
                )
              })}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-teal-500 hover:bg-teal-400 rounded-lg font-semibold text-black transition disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>

              {/* Message feedback */}
              {message && (
                <p
                  className={`mt-3 px-3 py-2 rounded-md font-medium text-center ${
                    message.includes('✓')
                      ? 'bg-green-900/80 text-green-300'
                      : 'bg-red-900/80 text-red-300'
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="bg-gray-900/90 p-6 rounded-2xl backdrop-blur-md border border-teal-500/50 shadow-lg max-w-md mx-auto flex flex-col justify-between"
            whileHover={{ scale: 1.02 }}
          >
            <div>
              <h2 className="text-2xl font-semibold text-teal-400 mb-4">Our Office</h2>
              <p className="text-gray-200 mb-2">Accra Digital Centre, Accra, Ghana</p>
              <p className="text-gray-200 mb-2">
                Email: <a href="mailto:chayilsecurex@gmail.com" className="text-teal-400 hover:text-cyan-300 transition">chayilsecurex@gmail.com</a>
              </p>
              <div className="mt-3 mb-3">
                <label className="block text-sm font-semibold mb-1 text-gray-200">Phone Numbers:</label>
                <div className="flex flex-col gap-2">
                  <a href="tel:+233247881728" className="text-teal-400 hover:text-cyan-300 transition">+233247881728</a>
                  <a href="tel:+233553550665" className="text-teal-400 hover:text-cyan-300 transition">+233553550665</a>
                </div>
              </div>
              <a href="https://maps.google.com?q=Accra+Digital+Centre" target="_blank" rel="noreferrer" className="text-sm text-teal-400 underline hover:text-cyan-300 transition">
                View on Google Maps
              </a>
            </div>

            <div className="mt-6 text-center">
              <h3 className="text-sm text-gray-200 mb-2">Connect with us</h3>
              <div className="flex justify-center gap-5 text-teal-400 text-xl">
                <a href="https://twitter.com/ChayilSecureX" target="_blank" rel="noreferrer"><FaTwitter className="hover:text-cyan-300 transition" /></a>
                <a href="https://www.linkedin.com/company/chayilsecurex" target="_blank" rel="noreferrer"><FaLinkedin className="hover:text-cyan-300 transition" /></a>
                <a href="https://www.facebook.com/ChayilSecureX" target="_blank" rel="noreferrer"><FaFacebook className="hover:text-cyan-300 transition" /></a>
                <a href="https://www.instagram.com/chayilsecurex" target="_blank" rel="noreferrer"><FaInstagram className="hover:text-cyan-300 transition" /></a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
