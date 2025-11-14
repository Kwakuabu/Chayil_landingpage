import React, { useState } from 'react';
import { FiTrendingUp, FiShield, FiClock, FiUsers } from 'react-icons/fi';
import ThreatChart from '../components/admin/ThreatChart';
import ReportFilters from '../components/admin/ReportFilters';
import ReportExportButton from '../components/admin/ReportExportButton';
import { mockReportsData } from '../data/mockData';

const AdminReports = () => {
  const [filters, setFilters] = useState({
    dateRange: 'last30days',
    threatType: 'all',
    severity: 'all',
    status: 'all'
  });
  const [isExporting, setIsExporting] = useState(false);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, this would trigger API calls to fetch filtered data
    console.log('Filters updated:', newFilters);
  };

  const handleExport = async (format) => {
    setIsExporting(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real app, this would generate and download the report
      console.log(`Exporting report in ${format} format`);

      // Show success message or trigger download
      alert(`Report exported successfully as ${format.toUpperCase()}`);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const statsCards = [
    {
      title: 'Total Threats',
      value: '1,247',
      change: '+12.5%',
      changeType: 'increase',
      icon: FiShield,
      color: 'text-red-600'
    },
    {
      title: 'Active Incidents',
      value: '23',
      change: '-8.2%',
      changeType: 'decrease',
      icon: FiTrendingUp,
      color: 'text-blue-600'
    },
    {
      title: 'Avg Response Time',
      value: '4.2h',
      change: '+2.1%',
      changeType: 'increase',
      icon: FiClock,
      color: 'text-yellow-600'
    },
    {
      title: 'Protected Clients',
      value: '156',
      change: '+5.7%',
      changeType: 'increase',
      icon: FiUsers,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Comprehensive security insights and threat intelligence reports
          </p>
        </div>

        {/* Filters */}
        <ReportFilters
          onFilterChange={handleFilterChange}
          onExport={() => handleExport('pdf')}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className={`text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Threat Trends Chart */}
          <div className="lg:col-span-2">
            <ThreatChart type="line" data={mockReportsData.threatTrends} />
          </div>

          {/* Threat Categories Pie Chart */}
          <ThreatChart type="pie" />

          {/* Severity Distribution Bar Chart */}
          <ThreatChart type="bar" />
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Client Security Scores */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Client Security Scores
            </h3>
            <div className="space-y-4">
              {mockReportsData.clientSecurityScores.map((client, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{client.client}</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${client.score}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{client.score}%</p>
                    <p className={`text-xs ${client.trend === 'up' ? 'text-green-600' : client.trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
                      {client.trend === 'up' ? '↑' : client.trend === 'down' ? '↓' : '→'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Incident Response Times */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Incident Response Times
            </h3>
            <ThreatChart
              type="line"
              data={mockReportsData.incidentResponseTimes.map(item => ({
                ...item,
                period: item.period
              }))}
            />
          </div>
        </div>

        {/* Export Options */}
        <div className="mt-8 flex justify-end">
          <ReportExportButton onExport={handleExport} isLoading={isExporting} />
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
