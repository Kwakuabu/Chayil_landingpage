import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ThreatFeedTicker from '../components/admin/ThreatFeedTicker';
import ThreatTable from '../components/admin/ThreatTable';
import { mockThreats } from '../data/mockData';

export default function AdminThreats() {
  const [activeTab, setActiveTab] = useState('overview');

  const criticalThreats = mockThreats.filter(t => t.severity === 'Critical').length;
  const activeThreats = mockThreats.filter(t => t.status === 'Active').length;
  const totalAffectedSystems = mockThreats.reduce((sum, t) => sum + t.affectedSystems, 0);

  const stats = [
    {
      title: 'Total Threats',
      value: mockThreats.length,
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z',
      color: 'text-yellow-400'
    },
    {
      title: 'Critical Threats',
      value: criticalThreats,
      icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'text-red-400'
    },
    {
      title: 'Active Threats',
      value: activeThreats,
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      color: 'text-orange-400'
    },
    {
      title: 'Affected Systems',
      value: totalAffectedSystems,
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      color: 'text-cyan-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-900/95 backdrop-blur-md border-b border-teal-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/admin/dashboard"
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-white">Threat Intelligence</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-900/95 backdrop-blur-md border border-teal-500/30 rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-800 ${stat.color}`}>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Live Threat Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mb-8"
        >
          <ThreatFeedTicker />
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mb-8"
        >
          <div className="bg-gray-900/95 backdrop-blur-md border border-teal-500/30 rounded-lg p-1">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-teal-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                Threat Database
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'analytics'
                    ? 'bg-teal-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('integrations')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'integrations'
                    ? 'bg-teal-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                Integrations
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <ThreatTable />
          )}

          {activeTab === 'analytics' && (
            <div className="bg-gray-900/95 backdrop-blur-md border border-teal-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-cyan-300 mb-4">Threat Analytics</h3>
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-400">Analytics Dashboard</h3>
                <p className="mt-1 text-sm text-gray-500">Advanced threat analytics and reporting features coming soon.</p>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="bg-gray-900/95 backdrop-blur-md border border-teal-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-cyan-300 mb-4">External Integrations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'CrowdStrike', status: 'Connected', lastSync: '2 minutes ago' },
                  { name: 'Mandiant', status: 'Connected', lastSync: '5 minutes ago' },
                  { name: 'Proofpoint', status: 'Connected', lastSync: '1 minute ago' },
                  { name: 'Akamai', status: 'Connected', lastSync: '3 minutes ago' },
                  { name: 'Recorded Future', status: 'Connected', lastSync: '4 minutes ago' },
                  { name: 'Kaspersky', status: 'Pending', lastSync: 'Never' }
                ].map((integration, index) => (
                  <motion.div
                    key={integration.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-gray-800/50 border border-gray-600 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{integration.name}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        integration.status === 'Connected'
                          ? 'text-green-400 bg-green-500/20 border border-green-500/30'
                          : 'text-yellow-400 bg-yellow-500/20 border border-yellow-500/30'
                      }`}>
                        {integration.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">Last sync: {integration.lastSync}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
