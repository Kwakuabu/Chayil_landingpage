import React, { useState, useEffect, useRef } from 'react';
import { FiPlay, FiPause, FiAlertTriangle, FiInfo } from 'react-icons/fi';
import LogStream from '../components/admin/LogStream';
import SeverityFilter from '../components/admin/SeverityFilter';
import PauseButton from '../components/admin/PauseButton';
import { apiService } from '../services/api';

const AdminSOC = () => {
  const [isStreaming, setIsStreaming] = useState(true);
  const [severityFilter, setSeverityFilter] = useState('all');
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  const fetchLogs = async () => {
    try {
      setError(null);
      const latestLogs = await apiService.getLogs();
      setLogs(latestLogs);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch logs.');
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    if (isStreaming) {
      fetchLogs();
      intervalRef.current = setInterval(fetchLogs, 2000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isStreaming]);

  const filteredLogs = severityFilter === 'all'
    ? logs
    : logs.filter(log => log.severity === severityFilter);

  const stats = {
    total: logs.length,
    critical: logs.filter(l => l.severity === 'critical').length,
    high: logs.filter(l => l.severity === 'high').length,
    medium: logs.filter(l => l.severity === 'medium').length,
    low: logs.filter(l => l.severity === 'low').length
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-600">
        <p>{error}</p>
        <button className="mt-4 px-4 py-2 bg-teal-600 rounded text-white" onClick={fetchLogs}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">SOC Monitoring</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Real-time security monitoring and log analysis
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <PauseButton
                isPaused={!isStreaming}
                onToggle={() => setIsStreaming(!isStreaming)}
              />
              <SeverityFilter
                value={severityFilter}
                onChange={setSeverityFilter}
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {isStreaming ? 'Live Streaming' : 'Paused'}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Logs</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <FiInfo className="w-6 h-6 text-blue-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Critical</p>
                <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
              </div>
              <FiAlertTriangle className="w-6 h-6 text-red-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">High</p>
                <p className="text-2xl font-bold text-orange-600">{stats.high}</p>
              </div>
              <FiAlertTriangle className="w-6 h-6 text-orange-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Medium</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.medium}</p>
              </div>
              <FiAlertTriangle className="w-6 h-6 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Low</p>
                <p className="text-2xl font-bold text-green-600">{stats.low}</p>
              </div>
              <FiAlertTriangle className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        {/* Log Stream */}
        <LogStream logs={filteredLogs} />
      </div>
    </div>
  );
};

export default AdminSOC;
