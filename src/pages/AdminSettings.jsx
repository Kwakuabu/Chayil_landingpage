import React, { useState } from 'react';
import { FiSettings, FiShield, FiBell, FiDatabase, FiMail, FiLock, FiSave } from 'react-icons/fi';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    // Security Settings
    twoFactorRequired: true,
    sessionTimeout: 30,
    passwordPolicy: 'strong',
    loginAttempts: 5,

    // Notification Settings
    emailAlerts: true,
    smsAlerts: false,
    criticalAlerts: true,
    weeklyReports: true,

    // System Settings
    maintenanceMode: false,
    debugMode: false,
    logRetention: 90,
    backupFrequency: 'daily',

    // Integration Settings
    apiRateLimit: 1000,
    webhookUrl: '',
    slackWebhook: '',
    emailProvider: 'smtp'
  });

  const [activeTab, setActiveTab] = useState('security');

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Mock save functionality
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'security', label: 'Security', icon: FiShield },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'system', label: 'System', icon: FiSettings },
    { id: 'integrations', label: 'Integrations', icon: FiDatabase }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Settings</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Configure system-wide settings and preferences
          </p>
        </div>

        {/* Settings Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-6">
            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security Configuration</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Require Two-Factor Authentication
                      </span>
                      <input
                        type="checkbox"
                        checked={settings.twoFactorRequired}
                        onChange={(e) => handleSettingChange('twoFactorRequired', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Force all users to enable 2FA for additional security
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <select
                      value={settings.sessionTimeout}
                      onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={60}>1 hour</option>
                      <option value={120}>2 hours</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password Policy
                    </label>
                    <select
                      value={settings.passwordPolicy}
                      onChange={(e) => handleSettingChange('passwordPolicy', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="basic">Basic (8+ characters)</option>
                      <option value="strong">Strong (12+ chars, mixed case, numbers, symbols)</option>
                      <option value="complex">Complex (16+ chars, advanced requirements)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Max Login Attempts
                    </label>
                    <select
                      value={settings.loginAttempts}
                      onChange={(e) => handleSettingChange('loginAttempts', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value={3}>3 attempts</option>
                      <option value={5}>5 attempts</option>
                      <option value={10}>10 attempts</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Preferences</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Alerts</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Receive security alerts via email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.emailAlerts}
                      onChange={(e) => handleSettingChange('emailAlerts', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">SMS Alerts</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Receive critical alerts via SMS</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.smsAlerts}
                      onChange={(e) => handleSettingChange('smsAlerts', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Critical Alerts Only</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Only send alerts for critical security events</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.criticalAlerts}
                      onChange={(e) => handleSettingChange('criticalAlerts', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Weekly Reports</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Receive weekly security summary reports</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.weeklyReports}
                      onChange={(e) => handleSettingChange('weeklyReports', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === 'system' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Configuration</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Maintenance Mode</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Put system in maintenance mode</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.maintenanceMode}
                      onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Debug Mode</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Enable detailed logging</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.debugMode}
                      onChange={(e) => handleSettingChange('debugMode', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Log Retention (days)
                    </label>
                    <select
                      value={settings.logRetention}
                      onChange={(e) => handleSettingChange('logRetention', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value={30}>30 days</option>
                      <option value={90}>90 days</option>
                      <option value={180}>180 days</option>
                      <option value={365}>1 year</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Backup Frequency
                    </label>
                    <select
                      value={settings.backupFrequency}
                      onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Integration Settings */}
            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Integration Settings</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      API Rate Limit (requests/minute)
                    </label>
                    <input
                      type="number"
                      value={settings.apiRateLimit}
                      onChange={(e) => handleSettingChange('apiRateLimit', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Webhook URL
                    </label>
                    <input
                      type="url"
                      value={settings.webhookUrl}
                      onChange={(e) => handleSettingChange('webhookUrl', e.target.value)}
                      placeholder="https://your-webhook-url.com"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Slack Webhook
                    </label>
                    <input
                      type="url"
                      value={settings.slackWebhook}
                      onChange={(e) => handleSettingChange('slackWebhook', e.target.value)}
                      placeholder="https://hooks.slack.com/..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Provider
                    </label>
                    <select
                      value={settings.emailProvider}
                      onChange={(e) => handleSettingChange('emailProvider', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="smtp">SMTP</option>
                      <option value="sendgrid">SendGrid</option>
                      <option value="mailgun">Mailgun</option>
                      <option value="ses">Amazon SES</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
              >
                <FiSave className="w-4 h-4" />
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
