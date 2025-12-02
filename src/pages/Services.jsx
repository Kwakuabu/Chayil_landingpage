import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

export default function Services() {
  const { id } = useParams();
  const [selectedService, setSelectedService] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  const services = [
    {
      id: "grc-consulting",
      title: "GRC Consulting",
      desc: "Comprehensive Governance, Risk & Compliance advisory services.",
      details: "Our GRC Consulting services help organizations establish robust governance frameworks, manage risks effectively, and ensure compliance with international standards and local regulations.",
      features: ["Risk Assessment", "Compliance Audits", "Policy Development", "Governance Frameworks"]
    },
    {
      id: "cybersecurity-assurance",
      title: "Cybersecurity Assurance",
      desc: "Advanced cybersecurity solutions to protect your digital assets.",
      details: "We provide end-to-end cybersecurity assurance, including threat detection, incident response, and continuous monitoring to safeguard your organization against cyber threats.",
      features: ["Vulnerability Scanning", "Penetration Testing", "Incident Response", "Security Monitoring"]
    },
    {
      id: "it-audit",
      title: "IT Audit",
      desc: "Thorough IT audits to ensure system integrity and compliance.",
      details: "Our IT audit services evaluate your information systems, controls, and processes to identify vulnerabilities and ensure alignment with best practices and regulatory requirements.",
      features: ["Control Assessment", "System Reviews", "Compliance Checks", "Audit Reporting"]
    },
    {
      id: "regulatory-alignment",
      title: "Regulatory Alignment",
      desc: "Navigate complex regulatory landscapes with expert guidance.",
      details: "We help organizations understand and comply with evolving regulations, including data protection laws, financial regulations, and industry-specific standards.",
      features: ["Regulatory Mapping", "Compliance Strategies", "Documentation Support", "Training Programs"]
    },
    {
      id: "capacity-building",
      title: "Capacity Building",
      desc: "Empower your team with knowledge and skills in GRC and cybersecurity.",
      details: "Our training programs build internal capabilities, equipping your staff with the knowledge and skills needed to maintain strong security postures and compliance.",
      features: ["Technical Training", "Awareness Programs", "Certification Preparation", "Ongoing Support"]
    }
  ];

  useEffect(() => {
    if (id) {
      const service = services.find(s => s.id === id);
      if (service) {
        setSelectedService(service);
      }
    }
  }, [id, services]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const handleBookAppointment = () => {
    setShowAppointmentForm(true);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/background5.jpg')` }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70 -z-5" />

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative text-center max-w-6xl mx-auto px-4 py-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-teal-400">Our Services</h1>

        {/* Intro Box */}
        <div className="bg-gray-900/90 p-6 rounded-lg shadow-lg border border-teal-500/20 max-w-4xl mx-auto mb-8">
          <p className="text-gray-300 text-base">
            Comprehensive GRC and Cybersecurity solutions tailored for African organizations.
          </p>
        </div>

        {/* Selected Service Details */}
        {selectedService && !showAppointmentForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/90 p-8 rounded-lg mb-8 border border-teal-500/30 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-teal-400">{selectedService.title}</h2>
            <p className="text-gray-300 mb-6">{selectedService.details}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {selectedService.features.map((feature, i) => (
                <div key={i} className="bg-gray-800/90 p-3 rounded text-cyan-300 border border-teal-500/20">
                  {feature}
                </div>
              ))}
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleBookAppointment}
                className="bg-teal-500 text-black px-6 py-2 rounded hover:bg-teal-400 transition font-semibold"
              >
                Book Appointment
              </button>
              <button
                onClick={() => setSelectedService(null)}
                className="bg-gray-700 text-gray-300 px-6 py-2 rounded hover:bg-gray-600 transition border border-teal-500/20"
              >
                Back to Services
              </button>
            </div>
          </motion.div>
        )}

        {/* Appointment Form */}
        {showAppointmentForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/90 p-8 rounded-lg mb-8 border border-teal-500/30 shadow-lg max-w-md mx-auto"
          >
            <h2 className="text-2xl font-bold mb-4 text-teal-400">Book Appointment</h2>
            <p className="text-gray-300 mb-4">Service: {selectedService.title}</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Appointment booked!'); setShowAppointmentForm(false); setSelectedService(null); }} className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full bg-gray-800/90 border border-teal-500/20 p-2 rounded text-gray-300 placeholder-gray-500" required />
              <input type="email" placeholder="Email" className="w-full bg-gray-800/90 border border-teal-500/20 p-2 rounded text-gray-300 placeholder-gray-500" required />
              <input type="tel" placeholder="Phone" className="w-full bg-gray-800/90 border border-teal-500/20 p-2 rounded text-gray-300 placeholder-gray-500" required />
              <input type="date" className="w-full bg-gray-800/90 border border-teal-500/20 p-2 rounded text-gray-300" required />
              <select className="w-full bg-gray-800/90 border border-teal-500/20 p-2 rounded text-gray-300" required>
                <option value="">Select Time</option>
                <option value="9:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
              </select>
              <textarea placeholder="Additional Notes" className="w-full bg-gray-800/90 border border-teal-500/20 p-2 rounded text-gray-300 placeholder-gray-500" rows="3"></textarea>
              <div className="flex gap-4">
                <button type="submit" className="flex-1 bg-teal-500 text-black py-2 rounded hover:bg-teal-400 transition font-semibold">Book Appointment</button>
                <button
                  type="button"
                  onClick={() => setShowAppointmentForm(false)}
                  className="flex-1 bg-gray-700 text-gray-300 py-2 rounded hover:bg-gray-600 transition border border-teal-500/20"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="bg-gray-900/90 text-gray-300 p-6 rounded-lg shadow-lg border border-teal-500/20 cursor-pointer hover:border-teal-400/60 hover:shadow-teal-500/20 transition"
            >
              <Link to={`/services/${service.id}`} onClick={() => handleServiceClick(service)}>
                <h3 className="font-semibold text-lg mb-2 text-teal-400">{service.title}</h3>
                <p className="text-gray-400 text-sm">{service.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
