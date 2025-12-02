import { useTheme } from "../context/ThemeContext";

export default function CookiePolicy() {
  const { isDark } = useTheme();

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/background5.jpg')` }}
      />

      <div
        className={`relative py-16 px-6 min-h-screen transition-colors duration-300 flex items-center justify-center`}
      >
        <div className="max-w-3xl w-full">
          {/* Content Card */}
          <div
            className={`p-8 rounded-2xl shadow-2xl border border-teal-500/30 backdrop-blur-md ${
              isDark ? "bg-gray-900/70 text-gray-300" : "bg-white/80 text-gray-800"
            }`}
          >
            {/* Header */}
            <h1 className="text-4xl font-extrabold mb-8 text-center text-teal-400 drop-shadow-lg">
              Cookie Policy
            </h1>

            {/* Content */}
            <p className="mb-6 text-lg leading-relaxed">
              This Cookie Policy explains how <strong>Chayil SecureX</strong> uses cookies and similar technologies on our website.
            </p>

            <h2 className="text-2xl font-semibold mb-3 text-teal-400">What Are Cookies</h2>
            <p className="mb-6 text-lg leading-relaxed">
              Cookies are small text files stored on your device to enhance your browsing experience, remember preferences, and provide personalized content.
            </p>

            <h2 className="text-2xl font-semibold mb-3 text-teal-400">How We Use Cookies</h2>
            <p className="mb-6 text-lg leading-relaxed">
              We use cookies to remember your preferences, analyze site traffic, optimize website performance, and improve our services.
            </p>

            <h2 className="text-2xl font-semibold mb-3 text-teal-400">Managing Cookies</h2>
            <p className="mb-6 text-lg leading-relaxed">
              You can manage or disable cookies through your browser settings. Some website features may not function properly if cookies are disabled.
            </p>

            <p className="text-lg">
              For more information or inquiries, email us at{" "}
              <a
                href="mailto:privacy@chayilsecurex.com"
                className="text-teal-400 hover:text-cyan-300 underline transition-colors"
              >
                privacy@chayilsecurex.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
