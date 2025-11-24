import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import IncidentTable from '../components/admin/IncidentTable';
import IncidentDetailDrawer from '../components/admin/IncidentDetailDrawer';
import IncidentAssignForm from '../components/admin/IncidentAssignForm';
import { apiService } from '../services/api';

export default function AdminIncidents() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isAssignFormOpen, setIsAssignFormOpen] = useState(false);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const data = await apiService.getIncidents();
        setIncidents(data);
      } catch (error) {
        console.error('Failed to fetch incidents:', error);
        setIncidents([]); // Clear incidents on error
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const handleIncidentSelect = (incident) => {
    setSelectedIncident(incident);
    setIsDetailDrawerOpen(true);
  };

  const handleStatusUpdate = async (incidentId, newStatus) => {
    try {
      await apiService.updateIncidentStatus(incidentId, newStatus);
      setIncidents(prev => prev.map(incident => {
        if (incident.id === incidentId) {
          const statusMap = {
            'underinvestigation': 'Under Investigation',
            'inprogress': 'In Progress',
            'resolved': 'Resolved'
          };
          return {
            ...incident,
            status: statusMap[newStatus] || incident.status,
            resolvedDate: newStatus === 'resolved' ? new Date().toISOString().split('T')[0] : incident.resolvedDate
          };
        }
        return incident;
      }));
    } catch (error) {
      console.error('Failed to update incident status:', error);
    }
  };

  const handleAssignIncident = async (incidentId, assignmentData) => {
    try {
      await apiService.assignIncident(incidentId, assignmentData);
      setIncidents(prev => prev.map(incident => {
        if (incident.id === incidentId) {
          return {
            ...incident,
            assignedTo: assignmentData.team,
            status: 'In Progress'
          };
        }
        return incident;
      }));
      setIsAssignFormOpen(false);
    } catch (error) {
      console.error('Failed to assign incident:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
<div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{ backgroundImage: `url('${import.meta.env.BASE_URL}background2.jpg')` }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <div className="text-cyan-300 text-lg">Loading Incidents...</div>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalIncidents = incidents.length;
  const resolvedIncidents = incidents.filter(i => i.status === 'Resolved').length;
  const inProgressIncidents = incidents.filter(i => i.status === 'In Progress').length;
  const underInvestigationIncidents = incidents.filter(i => i.status === 'Under Investigation').length;
  const criticalIncidents = incidents.filter(i => i.severity === 'Critical').length;

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background2.jpg')" }}>
      <div className="min-h-screen bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-cyan-300">Incident Management</h1>
                <p className="text-gray-400 mt-2">Monitor and respond to security incidents</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/admin-dashboard')}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md transition-colors duration-200"
                >
                  ← Back to Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gray-900/95 backdrop-blur-md border border-teal-500/30 rounded-lg p-6"
              >
                <div className="flex items-center">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Total Incidents</p>
                    <p className="text-2xl font-bold text-cyan-300">{totalIncidents}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-900/95 backdrop-blur-md border border-teal-500/30 rounded-lg p-6"
              >
                <div className="flex items-center">
                  <div className="bg-green-500/20 p-3 rounded-lg">
                    <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Resolved</p>
                    <p className="text-2xl font-bold text-green-300">{resolvedIncidents}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gray-900/95 backdrop-blur-md border border-teal-500/30 rounded-lg p-6"
              >
                <div className="flex items-center">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">In Progress</p>
                    <p className="text-2xl font-bold text-blue-300">{inProgressIncidents}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gray-900/95 backdrop-blur-md border border-teal-500/30 rounded-lg p-6"
              >
                <div className="flex items-center">
                  <div className="bg-yellow-500/20 p-3 rounded-lg">
                    <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Under Investigation</p>
                    <p className="text-2xl font-bold text-yellow-300">{underInvestigationIncidents}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-gray-900/95 backdrop-blur-md border border-teal-500/30 rounded-lg p-6"
              >
                <div className="flex items-center">
                  <div className="bg-red-500/20 p-3 rounded-lg">
                    <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Critical</p>
                    <p className="text-2xl font-bold text-red-300">{criticalIncidents}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Incident Table */}
            <IncidentTable
              incidents={incidents}
              onIncidentSelect={handleIncidentSelect}
              onStatusUpdate={handleStatusUpdate}
            />
          </motion.div>
        </div>
      </div>

      {/* Detail Drawer */}
      <IncidentDetailDrawer
        incident={selectedIncident}
        isOpen={isDetailDrawerOpen}
        onClose={() => {
          setIsDetailDrawerOpen(false);
          setSelectedIncident(null);
        }}
        onStatusUpdate={handleStatusUpdate}
        onAssign={(incidentId) => {
          setIsAssignFormOpen(true);
        }}
      />

      {/* Assign Form */}
      <IncidentAssignForm
        incident={selectedIncident}
        isOpen={isAssignFormOpen}
        onClose={() => setIsAssignFormOpen(false)}
        onAssign={handleAssignIncident}
      />
    </div>
  );
}
