import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Download, Calendar, AlertCircle, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { mockInvoices, mockPlans } from '../data/mockData';

const ClientBilling = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const currentPlan = mockPlans.find(plan => plan.current);
  const totalSpent = mockInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingInvoices = mockInvoices.filter(invoice => invoice.status === 'pending');

  const PlanInfo = ({ plan }) => (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
          Current Plan
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-blue-100 text-sm">Monthly Cost</p>
          <p className="text-2xl font-bold">${plan.price}/month</p>
        </div>
        <div>
          <p className="text-blue-100 text-sm">Next Billing</p>
          <p className="text-lg font-semibold">{plan.nextBilling}</p>
        </div>
      </div>
      <div className="space-y-2">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-300" />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const InvoiceTable = ({ invoices }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Invoice History
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Invoice #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {invoice.number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {invoice.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {invoice.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  ${invoice.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    invoice.status === 'paid'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : invoice.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                    <Download className="w-4 h-4" />
                  </button>
                  {invoice.status === 'pending' && (
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700">
                      Pay Now
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const UpgradeModal = ({ plan, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Upgrade to {plan.name}
        </h3>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-400">Current Plan</span>
            <span className="font-semibold">{currentPlan.name}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 dark:text-gray-400">New Plan</span>
            <span className="font-semibold text-blue-600">{plan.name}</span>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Monthly Price</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Billed monthly. Cancel anytime.
            </p>
          </div>
        </div>
        <div className="space-y-2 mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-white">What's included:</h4>
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
            </div>
          ))}
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Upgrade Plan
          </button>
        </div>
      </motion.div>
    </div>
  );

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
            <CreditCard className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Billing & Payments
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your subscription, view invoices, and update payment methods.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'invoices', label: 'Invoices' },
                { id: 'plans', label: 'Plans & Pricing' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Current Plan */}
            <PlanInfo plan={currentPlan} />

            {/* Billing Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Spent (YTD)
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${totalSpent}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Pending Invoices
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {pendingInvoices.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Next Billing Date
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {currentPlan.nextBilling}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Invoices */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Invoices
              </h3>
              <div className="space-y-3">
                {mockInvoices.slice(0, 3).map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        invoice.status === 'paid' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {invoice.description}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {invoice.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        ${invoice.amount}
                      </p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        invoice.status === 'paid'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {invoice.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'invoices' && (
          <InvoiceTable invoices={mockInvoices} />
        )}

        {activeTab === 'plans' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Choose Your Plan
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Upgrade or downgrade your plan at any time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-2 ${
                    plan.current
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {plan.current && (
                    <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded mb-3 inline-block">
                      Current Plan
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">/month</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {!plan.current && (
                    <button
                      onClick={() => setSelectedPlan(plan)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Upgrade to {plan.name}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upgrade Modal */}
        {selectedPlan && (
          <UpgradeModal
            plan={selectedPlan}
            onClose={() => setSelectedPlan(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ClientBilling;
