import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Bell, Key, Save, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ClientAccount = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    jobTitle: user?.jobTitle || '',
    timezone: user?.timezone || 'UTC',
    language: user?.language || 'en'
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notification preferences state
  const [notificationPrefs, setNotificationPrefs] = useState({
    emailAlerts: true,
    smsAlerts: false,
    securityAlerts: true,
    weeklyReports: true,
    incidentAlerts: true,
    complianceUpdates: true,
    marketingEmails: false
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Handle profile update logic
    console.log('Updating profile:', profileData);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    // Handle password change logic
    console.log('Changing password');
  };

  const handleNotificationUpdate = (e) => {
    e.preventDefault();
    // Handle notification preferences update
    console.log('Updating notifications:', notificationPrefs);
  };

  const ProfileForm = () => (
    <form onSubmit={handleProfileUpdate} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            First Name
          </label>
          <input
            type="text"
            value={profileData.firstName}
            onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={profileData.lastName}
            onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={profileData.email}
          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          value={profileData.phone}
          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company
          </label>
          <input
            type="text"
            value={profileData.company}
            onChange={(e) => setProfileData({...profileData, company: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Job Title
          </label>
          <input
            type="text"
            value={profileData.jobTitle}
            onChange={(e) => setProfileData({...profileData, jobTitle: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Timezone
          </label>
          <select
            value={profileData.timezone}
            onChange={(e) => setProfileData({...profileData, timezone: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="UTC">UTC</option>
            <option value="EST">Eastern Time</option>
            <option value="PST">Pacific Time</option>
            <option value="GMT">Greenwich Mean Time</option>
            <option value="CET">Central European Time</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Language
          </label>
          <select
            value={profileData.language}
            onChange={(e) => setProfileData({...profileData, language: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Save size={16} />
          Update Profile
        </button>
      </div>
    </form>
  );

  const PasswordForm = () => (
    <form onSubmit={handlePasswordChange} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Current Password
        </label>
        <div className="relative">
          <input
            type={showCurrentPassword ? 'text' : 'password'}
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
            className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          New Password
        </label>
        <div className="relative">
          <input
            type={showNewPassword ? 'text' : 'password'}
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
            className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Confirm New Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
            className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Key size={16} />
          Change Password
        </button>
      </div>
    </form>
  );

  const NotificationForm = () => (
    <form onSubmit={handleNotificationUpdate} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Alerts
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Receive email notifications for important updates
            </p>
          </div>
          <input
            type="checkbox"
            checked={notificationPrefs.emailAlerts}
            onChange={(e) => setNotificationPrefs({...notificationPrefs, emailAlerts: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              SMS Alerts
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Receive SMS notifications for critical alerts
            </p>
          </div>
          <input
            type="checkbox"
            checked={notificationPrefs.smsAlerts}
            onChange={(e) => setNotificationPrefs({...notificationPrefs, smsAlerts: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Security Alerts
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Get notified about security-related events
            </p>
          </div>
          <input
            type="checkbox"
            checked={notificationPrefs.securityAlerts}
            onChange={(e) => setNotificationPrefs({...notificationPrefs, securityAlerts: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Weekly Reports
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Receive weekly summary reports
            </p>
          </div>
          <input
            type="checkbox"
            checked={notificationPrefs.weeklyReports}
            onChange={(e) => setNotificationPrefs({...notificationPrefs, weeklyReports: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Incident Alerts
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Get notified about new incidents
            </p>
          </div>
          <input
            type="checkbox"
            checked={notificationPrefs.incidentAlerts}
            onChange={(e) => setNotificationPrefs({...notificationPrefs, incidentAlerts: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Compliance Updates
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Receive updates about compliance requirements
            </p>
          </div>
          <input
            type="checkbox"
            checked={notificationPrefs.complianceUpdates}
            onChange={(e) => setNotificationPrefs({...notificationPrefs, complianceUpdates: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Marketing Emails
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Receive promotional emails and newsletters
            </p>
          </div>
          <input
            type="checkbox"
            checked={notificationPrefs.marketingEmails}
            onChange={(e) => setNotificationPrefs({...notificationPrefs, marketingEmails: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Bell size={16} />
          Update Preferences
        </button>
      </div>
    </form>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Account Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account information and preferences
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <User size={16} className="inline mr-2" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'security'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <Shield size={16} className="inline mr-2" />
              Security
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'notifications'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <Bell size={16} className="inline mr-2" />
              Notifications
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && <ProfileForm />}
          {activeTab === 'security' && <PasswordForm />}
          {activeTab === 'notifications' && <NotificationForm />}
        </div>
      </div>
    </motion.div>
  );
};

export default ClientAccount;
