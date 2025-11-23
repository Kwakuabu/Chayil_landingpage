import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReportIncidentForm from '../components/client/ReportIncidentForm';
import { apiService } from '../services/api';

// Simple icon components as fallback
const HomeIcon = () => <span>🏠</span>;
const ExclamationTriangleIcon = () => <span>⚠️</span>;
const DocumentTextIcon = () => <span>📄</span>;
const ShieldCheckIcon = () => <span>🛡️</span>;
const CogIcon = () => <span>⚙️</span>;
const ArrowRightOnRectangleIcon = () => <span>↗️</span>;
const PlusIcon = () => <span>+</span>;
const FilterIcon = () => <span>🔍</span>;
const EyeIcon = () => <span>👁️</span>;
const ChatBubbleLeftIcon = () => <span>💬</span>;
const XMarkIcon = () => <span>✕</span>;

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '/client-dashboard', current: false },
  { name: 'Incidents', icon: ExclamationTriangleIcon, href: '/client-incidents', current: true },
  { name: 'Reports', icon: DocumentTextIcon, href: '/client-reports', current: false },
  { name: 'Security Services', icon: ShieldCheckIcon, href: '/client-services', current: false },
  { name: 'Settings', icon: CogIcon, href: '/client-settings', current: false },
];

export default function ClientIncidents() {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [showReportForm, setShowReportForm] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIncidents = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiService.getClientIncidents();
        setIncidents(data);
      } catch (err) {
        setError('Failed to load incidents');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchIncidents();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const clientIncidents = incidents.filter(incident => incident.client === user?.company);

  const filteredIncidents = clientIncidents.filter(incident => {
    const statusMatch = filterStatus === 'All' || incident.status === filterStatus;
    const severityMatch = filterSeverity === 'All' || incident.severity === filterSeverity;
    return statusMatch && severityMatch;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Open': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const IncidentDetailModal = ({ incident, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900/95 backdrop-blur-md rounded-lg border border-teal-500/30 p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold text-cyan-300 mb-2">{incident.title}</h3>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getSeverityColor(incident.severity)}`}>
                {incident.severity}
              </span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(incident.status)}`}>
                {incident.status}
              </span>
              <span className="text-sm text-gray-400">{incident.category}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Description</h4>
            <p className="text-sm text-gray-400">{incident.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Reported Date</h4>
              <p className="text-sm text-gray-400">{new Date(incident.timestamp).toLocaleDateString()}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Assignee</h4>
              <p className="text-sm text-gray-400">{incident.assignee}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Affected Systems</h4>
            <div className="flex flex-wrap gap-2">
              {incident.affectedSystems.map((system, index) => (
                <span key={index} className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">
                  {system}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Indicators</h4>
            <div className="space-y-1">
              {incident.indicators.map((indicator, index) => (
                <div key={index} className="text-xs text-gray-400 font-mono bg-gray-800 p-2 rounded">
                  {indicator}
                </div>
              ))}
            </div>
          </div>

          {incident.comments && incident.comments.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Comments</h4>
              <div className="space-y-3">
                {incident.comments.map((comment, index) => (
                  <div key={index} className="bg-gray-800/50 p-3 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-medium text-cyan-300">{comment.user}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{comment.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {incident.resolution && (
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Resolution</h4>
              <p className="text-sm text-green-400">{incident.resolution}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );

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
              <h1 className="text-4xl font-bold text-cyan-300 mb-2">My Incidents</h1>
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
                  <ExclamationTriangleIcon className="h-8 w-8 text-red-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-300">Total Incidents</p>
                    <p className="text-2xl font-bold text-red-300">{clientIncidents.length}</p>
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
                    <p className="text-sm font-medium text-gray-300">Resolved</p>
                    <p className="text-2xl font-bold text-green-300">
                      {clientIncidents.filter(i => i.status === 'Resolved').length}
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
                      {clientIncidents.filter(i => i.status === 'In Progress').length}
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
                  <ExclamationTriangleIcon className="h-8 w-8 text-orange-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-300">Open</p>
                    <p className="text-2xl font-bold text-orange-300">
                      {clientIncidents.filter(i => i.status === 'Open').length}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Filters and Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-gray-800 border border-teal-500/20 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-teal-400"
                  >
                    <option value="All">All Status</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Severity</label>
                  <select
                    value={filterSeverity}
                    onChange={(e) => setFilterSeverity(e.target.value)}
                    className="bg-gray-800 border border-teal-500/20 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-teal-400"
                  >
                    <option value="All">All Severity</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => setShowReportForm(true)}
                className="bg-teal-500 text-black px-4 py-2 rounded hover:bg-teal-400 transition flex items-center"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Report New Incident
              </button>
            </div>

            {/* Incidents Table */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-teal-500/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Incident</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Severity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Reported</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-teal-500/10">
                    {filteredIncidents.map((incident) => (
                      <tr key={incident.id} className="hover:bg-gray-800/30">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-cyan-300">{incident.title}</div>
                            <div className="text-sm text-gray-400 truncate max-w-xs">{incident.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getSeverityColor(incident.severity)}`}>
                            {incident.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(incident.status)}`}>
                            {incident.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{incident.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(incident.timestamp).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedIncident(incident)}
                            className="text-teal-400 hover:text-cyan-300 text-sm flex items-center"
                          >
                            <EyeIcon className="h-4 w-4 mr-1" />
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredIncidents.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">No incidents found matching the current filters.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Incident Detail Modal */}
      {selectedIncident && (
        <IncidentDetailModal
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
        />
      )}

      {/* Report Incident Form */}
      <ReportIncidentForm
        isOpen={showReportForm}
        onClose={() => setShowReportForm(false)}
        onSubmit={async (incidentData) => {
          try {
            // Call API to report new incident
            const createdIncident = await apiService.reportIncident(incidentData);
            setIncidents(prevIncidents => [...prevIncidents, createdIncident]);
            setShowReportForm(false);
          } catch (error) {
            console.error('Failed to report incident:', error);
          }
        }}
      />
    </div>
  );
}
