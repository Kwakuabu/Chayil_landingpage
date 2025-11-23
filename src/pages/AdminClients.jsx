import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ClientTable from '../components/admin/ClientTable';
import ClientDetailModal from '../components/admin/ClientDetailModal';
import AddClientForm from '../components/admin/AddClientForm';
import { apiService } from '../services/api';

export default function AdminClients() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await apiService.getClients();
        setClients(data);
      } catch (error) {
        console.error('Failed to fetch clients:', error);
        setClients([]); // Clear clients on error
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setIsDetailModalOpen(true);
  };

  const handleAddClient = () => {
    setIsAddFormOpen(true);
  };

  const handleSaveClient = async (updatedClient) => {
    try {
      await apiService.updateClient(updatedClient);
      setClients(prev => prev.map(client =>
        client.id === updatedClient.id ? updatedClient : client
      ));
      setIsDetailModalOpen(false);
      setSelectedClient(null);
    } catch (error) {
      console.error('Failed to save client:', error);
    }
  };

  const handleDeleteClient = async (client) => {
    if (window.confirm(`Are you sure you want to delete ${client.name}? This action cannot be undone.`)) {
      try {
        await apiService.deleteClient(client.id);
        setClients(prev => prev.filter(c => c.id !== client.id));
        setIsDetailModalOpen(false);
        setSelectedClient(null);
      } catch (error) {
        console.error('Failed to delete client:', error);
      }
    }
  };

  const handleAddNewClient = async (newClient) => {
    try {
      const createdClient = await apiService.createClient(newClient);
      setClients(prev => [...prev, createdClient]);
      setIsAddFormOpen(false);
    } catch (error) {
      console.error('Failed to add client:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{ backgroundImage: "url('/background2.jpg')" }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <div className="text-cyan-300 text-lg">Loading Clients...</div>
        </div>
      </div>
    );
  }

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
                <h1 className="text-3xl font-bold text-cyan-300">Client Management</h1>
                <p className="text-gray-400 mt-2">Manage and monitor client accounts</p>
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

            {/* Client Table */}
            <ClientTable
              clients={clients}
              onClientSelect={handleClientSelect}
              onAddClient={handleAddClient}
            />

            {/* Summary Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              <div className="bg-gray-900/95 backdrop-blur-md border border-teal-500/30 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="bg-teal-500/20 p-3 rounded-lg">
                    <svg className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Total Clients</p>
                    <p className="text-2xl font-bold text-cyan-300">{clients.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/95 backdrop-blur-md border border-teal-500/30 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="bg-green-500/20 p-3 rounded-lg">
                    <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Active</p>
                    <p className="text-2xl font-bold text-green-300">
                      {clients.filter(c => c.status === 'active').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/95 backdrop-blur-md border border-teal-500/30 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="bg-yellow-500/20 p-3 rounded-lg">
                    <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Pending</p>
                    <p className="text-2xl font-bold text-yellow-300">
                      {clients.filter(c => c.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/95 backdrop-blur-md border border-teal-500/30 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="bg-red-500/20 p-3 rounded-lg">
                    <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Inactive</p>
                    <p className="text-2xl font-bold text-red-300">
                      {clients.filter(c => c.status === 'inactive').length}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <ClientDetailModal
        client={selectedClient}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedClient(null);
        }}
        onSave={handleSaveClient}
        onDelete={handleDeleteClient}
      />

      <AddClientForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSave={handleAddNewClient}
      />
    </div>
  );
}
