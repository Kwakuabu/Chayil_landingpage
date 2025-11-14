import React, { useState } from 'react';
import { FiUser, FiUserPlus, FiEdit, FiTrash2, FiMail, FiPhone, FiShield, FiSettings } from 'react-icons/fi';

const AdminTeam = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@chayilsecurex.com',
      phone: '+1 (555) 123-4567',
      role: 'SOC Analyst',
      status: 'Active',
      lastActive: '2024-01-15 14:30',
      avatar: null
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@chayilsecurex.com',
      phone: '+1 (555) 234-5678',
      role: 'Security Engineer',
      status: 'Active',
      lastActive: '2024-01-15 13:45',
      avatar: null
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike.davis@chayilsecurex.com',
      phone: '+1 (555) 345-6789',
      role: 'Threat Intelligence Analyst',
      status: 'Inactive',
      lastActive: '2024-01-14 16:20',
      avatar: null
    },
    {
      id: 4,
      name: 'Emily Chen',
      email: 'emily.chen@chayilsecurex.com',
      phone: '+1 (555) 456-7890',
      role: 'Incident Response Lead',
      status: 'Active',
      lastActive: '2024-01-15 12:15',
      avatar: null
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'SOC Analyst'
  });

  const roles = [
    'SOC Analyst',
    'Security Engineer',
    'Threat Intelligence Analyst',
    'Incident Response Lead',
    'Compliance Officer',
    'System Administrator'
  ];

  const handleAddMember = () => {
    const newMember = {
      id: Date.now(),
      ...formData,
      status: 'Active',
      lastActive: new Date().toISOString().slice(0, 16).replace('T', ' '),
      avatar: null
    };
    setTeamMembers([...teamMembers, newMember]);
    setShowAddModal(false);
    setFormData({ name: '', email: '', phone: '', role: 'SOC Analyst' });
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      role: member.role
    });
  };

  const handleUpdateMember = () => {
    setTeamMembers(teamMembers.map(member =>
      member.id === editingMember.id
        ? { ...member, ...formData }
        : member
    ));
    setEditingMember(null);
    setFormData({ name: '', email: '', phone: '', role: 'SOC Analyst' });
  };

  const handleDeleteMember = (id) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      setTeamMembers(teamMembers.filter(member => member.id !== id));
    }
  };

  const getStatusColor = (status) => {
    return status === 'Active'
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'SOC Analyst':
        return <FiShield className="w-4 h-4" />;
      case 'Security Engineer':
        return <FiSettings className="w-4 h-4" />;
      default:
        return <FiUser className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Team Management</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage security team members and their roles
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
          >
            <FiUserPlus className="w-4 h-4" />
            Add Team Member
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Members</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{teamMembers.length}</p>
              </div>
              <FiUser className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Members</p>
                <p className="text-2xl font-bold text-green-600">
                  {teamMembers.filter(m => m.status === 'Active').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">SOC Analysts</p>
                <p className="text-2xl font-bold text-purple-600">
                  {teamMembers.filter(m => m.role === 'SOC Analyst').length}
                </p>
              </div>
              <FiShield className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Engineers</p>
                <p className="text-2xl font-bold text-orange-600">
                  {teamMembers.filter(m => m.role === 'Security Engineer').length}
                </p>
              </div>
              <FiSettings className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Team Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Team Members</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {teamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {member.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {member.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getRoleIcon(member.role)}
                        <span className="text-sm text-gray-900 dark:text-white">{member.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        <div className="flex items-center gap-1">
                          <FiMail className="w-3 h-3" />
                          {member.email}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <FiPhone className="w-3 h-3" />
                          {member.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {member.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditMember(member)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {(showAddModal || editingMember) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {editingMember ? 'Edit Team Member' : 'Add Team Member'}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingMember(null);
                    setFormData({ name: '', email: '', phone: '', role: 'SOC Analyst' });
                  }}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={editingMember ? handleUpdateMember : handleAddMember}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  {editingMember ? 'Update' : 'Add'} Member
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTeam;
