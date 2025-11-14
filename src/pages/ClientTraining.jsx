import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, Filter, Search, Grid, List } from 'lucide-react';
import ModuleCard from '../components/client/ModuleCard';
import Certificate from '../components/client/Certificate';
import Quiz from '../components/client/Quiz';
import { mockTrainingModules, mockCertificates } from '../data/mockData';

const ClientTraining = () => {
  const [activeTab, setActiveTab] = useState('modules');
  const [viewMode, setViewMode] = useState('grid');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentModule, setCurrentModule] = useState(null);

  const filteredModules = mockTrainingModules.filter(module => {
    const matchesFilter = filter === 'all' || module.status === filter;
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    totalModules: mockTrainingModules.length,
    completedModules: mockTrainingModules.filter(m => m.status === 'completed').length,
    inProgressModules: mockTrainingModules.filter(m => m.status === 'in_progress').length,
    certificatesEarned: mockCertificates.length,
  };

  const handleStartModule = (moduleId) => {
    const module = mockTrainingModules.find(m => m.id === moduleId);
    setCurrentModule(module);
    setShowQuiz(true);
  };

  const handleContinueModule = (moduleId) => {
    const module = mockTrainingModules.find(m => m.id === moduleId);
    setCurrentModule(module);
    setShowQuiz(true);
  };

  const handleQuizComplete = (score, answers) => {
    // In a real app, this would update the backend
    console.log('Quiz completed:', { score, answers, module: currentModule });
    setShowQuiz(false);
    setCurrentModule(null);
  };

  const handleDownloadCertificate = (certificate) => {
    // In a real app, this would trigger a download
    console.log('Downloading certificate:', certificate);
  };

  // Mock quiz questions - in a real app, these would come from the backend
  const quizQuestions = [
    {
      question: "What is the most common type of cyber attack?",
      options: ["Phishing", "Ransomware", "DDoS", "SQL Injection"],
      correctAnswer: 0,
      explanation: "Phishing is the most common type of cyber attack, accounting for over 90% of data breaches."
    },
    {
      question: "Which of the following is a strong password?",
      options: ["password123", "P@ssw0rd!", "MyName123", "abc123"],
      correctAnswer: 1,
      explanation: "A strong password should be at least 8 characters long, contain uppercase and lowercase letters, numbers, and special characters."
    },
    {
      question: "What should you do if you receive a suspicious email?",
      options: ["Click the links to check", "Forward it to colleagues", "Report it to IT security", "Delete it immediately"],
      correctAnswer: 2,
      explanation: "Always report suspicious emails to your IT security team rather than interacting with them."
    }
  ];

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button
              onClick={() => setShowQuiz(false)}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
            >
              ← Back to Training
            </button>
          </div>
          <Quiz
            questions={quizQuestions}
            onComplete={handleQuizComplete}
            onRestart={() => setShowQuiz(false)}
          />
        </div>
      </div>
    );
  }

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
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Security Training
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Enhance your cybersecurity knowledge with interactive training modules and earn certificates.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Modules</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalModules}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completedModules}</p>
              </div>
              <Award className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.inProgressModules}</p>
              </div>
              <BookOpen className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Certificates</p>
                <p className="text-2xl font-bold text-purple-600">{stats.certificatesEarned}</p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setActiveTab('modules')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'modules'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Training Modules
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'certificates'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Certificates
            </button>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search modules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-64"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Modules</option>
                <option value="completed">Completed</option>
                <option value="in_progress">In Progress</option>
                <option value="not_started">Not Started</option>
              </select>
            </div>

            {activeTab === 'modules' && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {activeTab === 'modules' ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}>
              {filteredModules.map((module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  onStart={handleStartModule}
                  onContinue={handleContinueModule}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCertificates.map((certificate) => (
                <Certificate
                  key={certificate.id}
                  certificate={certificate}
                  onDownload={handleDownloadCertificate}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ClientTraining;
