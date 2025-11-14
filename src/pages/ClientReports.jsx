import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockReports } from '../data/mockData';
import ReportCard from '../components/client/ReportCard';
import DownloadButton from '../components/client/DownloadButton';

// Simple icon components as fallback
const HomeIcon = () => <span>🏠</span>;
const ExclamationTriangleIcon = () => <span>⚠️</span>;
const DocumentTextIcon = () => <span>📄</span>;
const ShieldCheckIcon = () => <span>🛡️</span>;
const CogIcon = () => <span>⚙️</span>;
const ArrowRightOnRectangleIcon = () => <span>↗️</span>;
const FilterIcon = () => <span>🔍</span>;
const DownloadIcon = () => <span>⬇️</span>;

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '/client-dashboard', current: false },
  { name: 'Incidents', icon: ExclamationTriangleIcon, href: '/client-incidents', current: false },
  { name: 'Reports', icon: DocumentTextIcon, href: '/client-reports', current: true },
  { name: 'Security Services', icon: ShieldCheckIcon, href: '/client-services', current: false },
  { name: 'Settings', icon: CogIcon, href: '/client-settings', current: false },
];

export default function ClientReports() {
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [downloading, setDownloading] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredReports = mockReports.filter(report => {
    const typeMatch = filterType === 'All' || report.type === filterType;
    const statusMatch = filterStatus === 'All' || report.status === filterStatus;
    return typeMatch && statusMatch;
  });

  const handleDownload = async (report) => {
    if (report.status !== 'Completed') return;

    setDownloading(report.id);

    // Simulate download delay
    setTimeout(() => {
      // Create a mock download (in real app, this would trigger actual file download)
      const element = document.createElement('a');
      const file = new Blob([`Mock ${report.title} content`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${report.title.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setDownloading(null);
    }, 1500);
  };

  const reportTypes = ['All', ...new Set(mockReports.map(r => r.type))];
  const statusOptions = ['All', 'Completed', 'In Progress'];

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background2.jpg')" }}>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900/95 backdrop-blur-md min-h-screen border-r border-teal-500/30 shadow-xl">
          <div className="p-6 border-b border-teal-500/20">
            <h2 className="text-xl font-bold text-cyan-300">Client Portal</h2>
            <p className="text-sm text-gray-400 mt-1">Welcome, {user?.name}</p>
          </div>
          <nav className="px-4 py-6">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.href)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      item.current
                        ? 'bg-teal-500/25 text-cyan-300 border border-teal-500/40 shadow-lg'
                        : 'text-gray-300 hover:bg-gray-800/60 hover:text-cyan-300 hover:shadow-md'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:bg-red-500/25 hover:text-red-300 rounded-lg transition-all duration-200 border border-red-500/20 hover:border-red-500/40"
            >
              <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-cyan-300 mb-2">My Reports</h1>
              <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"></div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-teal-500/20"
              >
                <div className="flex items-center">
                  <DocumentTextIcon className="h-8 w-8 text-blue-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-300">Total Reports</p>
                    <p className="text-2xl font-bold text-blue-300">{mockReports.length}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-teal-500/20"
              >
                <div className="flex items-center">
                  <ShieldCheckIcon className="h-8 w-8 text-green-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-300">Completed</p>
                    <p className="text-2xl font-bold text-green-300">
                      {mockReports.filter(r => r.status === 'Completed').length}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-teal-500/20"
              >
                <div className="flex items-center">
                  <CogIcon className="h-8 w-8 text-blue-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-300">In Progress</p>
                    <p className="text-2xl font-bold text-blue-300">
                      {mockReports.filter(r => r.status === 'In Progress').length}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-teal-500/20"
              >
                <div className="flex items-center">
                  <DownloadIcon className="h-8 w-8 text-teal-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-300">Downloads</p>
                    <p className="text-2xl font-bold text-teal-300">
                      {mockReports.filter(r => r.status === 'Completed').length}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Report Type</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="bg-gray-800 border border-teal-500/20 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-teal-400"
                  >
                    {reportTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-gray-800 border border-teal-500/20 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-teal-400"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onDownload={handleDownload}
                />
              ))}
            </div>

            {filteredReports.length === 0 && (
              <div className="text-center py-12">
                <DocumentTextIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No reports found</h3>
                <p className="text-gray-500">
                  No reports match the current filters. Try adjusting your search criteria.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
