import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockClients, mockIncidents, mockReports, mockSecurityServices } from '../data/mockData';

// Simple icon components as fallback
const HomeIcon = () => <span>🏠</span>;
const UsersIcon = () => <span>👥</span>;
const ExclamationTriangleIcon = () => <span>⚠️</span>;
const DocumentTextIcon = () => <span>📄</span>;
const ShieldCheckIcon = () => <span>🛡️</span>;
const CogIcon = () => <span>⚙️</span>;
const ArrowRightOnRectangleIcon = () => <span>↗️</span>;

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, current: true },
  { name: 'Clients', icon: UsersIcon, current: false },
  { name: 'Incidents', icon: ExclamationTriangleIcon, current: false },
  { name: 'Reports', icon: DocumentTextIcon, current: false },
  { name: 'Security Services', icon: ShieldCheckIcon, current: false },
  { name: 'Settings', icon: CogIcon, current: false },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-teal-500/20"
      >
        <div className="flex items-center">
          <UsersIcon className="h-8 w-8 text-teal-400" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-300">Total Clients</p>
            <p className="text-2xl font-bold text-cyan-300">{mockClients.length}</p>
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
          <ExclamationTriangleIcon className="h-8 w-8 text-red-400" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-300">Active Incidents</p>
            <p className="text-2xl font-bold text-red-300">
              {mockIncidents.filter(i => i.status !== 'Resolved').length}
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
          <DocumentTextIcon className="h-8 w-8 text-blue-400" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-300">Reports Generated</p>
            <p className="text-2xl font-bold text-blue-300">{mockReports.length}</p>
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
          <ShieldCheckIcon className="h-8 w-8 text-green-400" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-300">Services Active</p>
            <p className="text-2xl font-bold text-green-300">{mockSecurityServices.length}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderClients = () => (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-teal-500/20 overflow-hidden">
      <div className="p-6 border-b border-teal-500/20">
        <h3 className="text-lg font-semibold text-cyan-300">Client Management</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Industry</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Activity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-teal-500/10">
            {mockClients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-800/30">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-cyan-300">{client.name}</div>
                    <div className="text-sm text-gray-400">{client.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{client.industry}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    client.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{client.lastActivity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderIncidents = () => (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-teal-500/20 overflow-hidden">
      <div className="p-6 border-b border-teal-500/20">
        <h3 className="text-lg font-semibold text-cyan-300">Incident Management</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Incident</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Severity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-teal-500/10">
            {mockIncidents.map((incident) => (
              <tr key={incident.id} className="hover:bg-gray-800/30">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-cyan-300">{incident.title}</div>
                    <div className="text-sm text-gray-400">{incident.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{incident.clientName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    incident.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                    incident.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {incident.severity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    incident.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                    incident.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {incident.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-teal-500/20 overflow-hidden">
      <div className="p-6 border-b border-teal-500/20">
        <h3 className="text-lg font-semibold text-cyan-300">Reports</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockReports.map((report) => (
            <div key={report.id} className="bg-gray-800/50 p-4 rounded-lg border border-teal-500/10">
              <h4 className="text-sm font-medium text-cyan-300 mb-2">{report.title}</h4>
              <p className="text-xs text-gray-400 mb-2">{report.type} - {report.period}</p>
              <div className="flex justify-between items-center">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  report.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {report.status}
                </span>
                <button className="text-teal-400 hover:text-cyan-300 text-sm">Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurityServices = () => (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-teal-500/20 overflow-hidden">
      <div className="p-6 border-b border-teal-500/20">
        <h3 className="text-lg font-semibold text-cyan-300">Security Services</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSecurityServices.map((service) => (
            <div key={service.id} className="bg-gray-800/50 p-4 rounded-lg border border-teal-500/10">
              <div className="flex items-center mb-3">
                <ShieldCheckIcon className="h-6 w-6 text-teal-400 mr-2" />
                <h4 className="text-sm font-medium text-cyan-300">{service.name}</h4>
              </div>
              <p className="text-xs text-gray-400 mb-3">{service.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-300">Clients: {service.clients}</span>
                <span className="text-green-400">Uptime: {service.uptime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-teal-500/20 p-6">
      <h3 className="text-lg font-semibold text-cyan-300 mb-4">Admin Settings</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Notification Preferences</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-sm text-gray-400">Email notifications for incidents</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-sm text-gray-400">Weekly reports</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard': return renderDashboard();
      case 'Clients': return renderClients();
      case 'Incidents': return renderIncidents();
      case 'Reports': return renderReports();
      case 'Security Services': return renderSecurityServices();
      case 'Settings': return renderSettings();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background2.jpg')" }}>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900/95 backdrop-blur-md min-h-screen border-r border-teal-500/30 shadow-xl">
          <div className="p-6 border-b border-teal-500/20">
            <h2 className="text-xl font-bold text-cyan-300">Admin Portal</h2>
            <p className="text-sm text-gray-400 mt-1">Welcome, {user?.name}</p>
          </div>
          <nav className="px-4 py-6">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => setActiveTab(item.name)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeTab === item.name
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
              <h1 className="text-4xl font-bold text-cyan-300 mb-2">{activeTab}</h1>
              <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"></div>
            </div>
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
