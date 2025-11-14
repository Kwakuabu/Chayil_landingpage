import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertTriangle, Clock, Filter } from 'lucide-react';
import Checklist from '../components/client/Checklist';
import ProgressBar from '../components/client/ProgressBar';
import { mockComplianceData } from '../data/mockData';

const ClientCompliance = () => {
  const [filter, setFilter] = useState('all');
  const [complianceData, setComplianceData] = useState(mockComplianceData);

  const filteredData = complianceData.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const overallProgress = Math.round(
    complianceData.reduce((acc, item) => acc + item.progress, 0) / complianceData.length
  );

  const stats = {
    total: complianceData.length,
    completed: complianceData.filter(item => item.status === 'completed').length,
    inProgress: complianceData.filter(item => item.status === 'in_progress').length,
    pending: complianceData.filter(item => item.status === 'pending').length,
  };

  const handleItemToggle = (itemId) => {
    // In a real app, this would update the backend
    setComplianceData(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, progress: Math.min(item.progress + 10, 100),
              status: item.progress + 10 >= 100 ? 'completed' : 'in_progress' }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Compliance Management
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Track and manage your organization's compliance with industry standards and regulations.
          </p>
        </motion.div>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Overall Compliance Progress
          </h2>
          <ProgressBar progress={overallProgress} label="Compliance Score" size="large" />
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {stats.completed} of {stats.total} compliance items completed
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Items</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-red-600">{stats.pending}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Compliance Checklist
            </h2>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Items</option>
                <option value="completed">Completed</option>
                <option value="in_progress">In Progress</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Compliance Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Checklist items={filteredData} onItemToggle={handleItemToggle} />
        </motion.div>
      </div>
    </div>
  );
};

export default ClientCompliance;
