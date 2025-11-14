import React, { useState, useEffect } from 'react';
import { FiPlay, FiPause, FiFilter, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';
import LogStream from '../components/admin/LogStream';
import SeverityFilter from '../components/admin/SeverityFilter';
import PauseButton from '../components/admin/PauseButton';

const AdminSOC = () => {
  const [isStreaming, setIsStreaming] = useState(true);
  const [severityFilter, setSeverityFilter] = useState('all');
  const [logs, setLogs] = useState([]);

  // Mock log data generation
  useEffect(() => {
    if (!isStreaming) return;

    const generateLog = () => {
      const severities = ['critical', 'high', 'medium', 'low', 'info'];
      const sources = ['Firewall', 'IDS', 'SIEM', 'Endpoint', 'Network', 'Application'];
      const messages = [
        'Unauthorized access attempt detected',
        'Malware signature detected',
        'DDoS attack pattern identified',
        'Suspicious login from unknown IP',
        'SSL certificate expired',
        'High CPU usage detected',
        'Database connection failed',
        'File integrity check failed',
        'VPN tunnel disconnected',
        'Configuration change detected'
      ];

      const severity = severities[Math.floor(Math.random() * severities.length)];
      const source = sources[Math.floor(Math.random() * sources.length)];
      const message = messages[Math.floor(Math.random() * messages.length)];

      return {
        id: Date.now() + Math.random(),
        timestamp: new Date().toISOString(),
        severity,
        source,
        message,
        ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        user: Math.random() > 0.5 ? `user${Math.floor(Math.random() * 1000)}` : null
      };
    };

    const interval = setInterval(() => {
      const newLog = generateLog();
      setLogs(prev => [newLog, ...prev.slice(0, 99)]); // Keep last 100 logs
    }, 2000);

    return () => clearInterval(interval);
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
