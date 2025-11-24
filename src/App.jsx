import { Routes, Route, useLocation, Navigate, Link } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import TwoFactorAuth from './pages/TwoFactorAuth'
import Services from './pages/Services'
import Blog from './pages/Blog'
import FAQ from './pages/FAQ'
import CustomerService from './pages/CustomerService'
import Contact from './pages/Contact'
import AdminDashboard from './pages/AdminDashboardNew'
import AdminClients from './pages/AdminClients'
import AdminIncidents from './pages/AdminIncidents'
import AdminThreats from './pages/AdminThreats'
import AdminReports from './pages/AdminReports'
import AdminSOC from './pages/AdminSOC'
import AdminTeam from './pages/AdminTeam'
import AdminSettings from './pages/AdminSettings'
import ClientDashboard from './pages/ClientDashboard'
import ClientIncidents from './pages/ClientIncidents'
import ClientReports from './pages/ClientReports'
import ClientCompliance from './pages/ClientCompliance'
import ClientTraining from './pages/ClientTraining'
import ClientAccount from './pages/ClientAccount'
import ClientCommunication from './pages/ClientCommunication'
import ClientBilling from './pages/ClientBilling'

export default function App() {
  const location = useLocation()
  const isDashboard = location.pathname.includes('dashboard') || location.pathname === '/2fa';

  return (
    <ThemeProvider>
      <AuthProvider>
    <div className="flex flex-col min-h-screen bg-transparent text-black dark:bg-transparent dark:text-white transition-colors duration-300">
          {!isDashboard && <Header />}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/2fa" element={<TwoFactorAuth />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/customer-service" element={<CustomerService />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin-dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/clients" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminClients />
                </ProtectedRoute>
              } />
              <Route path="/admin/incidents" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminIncidents />
                </ProtectedRoute>
              } />
              <Route path="/admin/threats" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminThreats />
                </ProtectedRoute>
              } />
              <Route path="/admin/reports" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminReports />
                </ProtectedRoute>
              } />
              <Route path="/admin/soc" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminSOC />
                </ProtectedRoute>
              } />
              <Route path="/admin/team" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminTeam />
                </ProtectedRoute>
              } />
              <Route path="/admin/settings" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminSettings />
                </ProtectedRoute>
              } />
              <Route path="/client-dashboard" element={
                <ProtectedRoute allowedRoles={['client', 'analyst']}>
                  <ClientDashboard />
                </ProtectedRoute>
              } />
              <Route path="/client-incidents" element={
                <ProtectedRoute allowedRoles={['client', 'analyst']}>
                  <ClientIncidents />
                </ProtectedRoute>
              } />
              <Route path="/client-reports" element={
                <ProtectedRoute allowedRoles={['client', 'analyst']}>
                  <ClientReports />
                </ProtectedRoute>
              } />
              <Route path="/client-compliance" element={
                <ProtectedRoute allowedRoles={['client', 'analyst']}>
                  <ClientCompliance />
                </ProtectedRoute>
              } />
              <Route path="/client-training" element={
                <ProtectedRoute allowedRoles={['client', 'analyst']}>
                  <ClientTraining />
                </ProtectedRoute>
              } />
              <Route path="/client-communication" element={
                <ProtectedRoute allowedRoles={['client', 'analyst']}>
                  <ClientCommunication />
                </ProtectedRoute>
              } />
              <Route path="/client-billing" element={
                <ProtectedRoute allowedRoles={['client', 'analyst']}>
                  <ClientBilling />
                </ProtectedRoute>
              } />
              <Route path="/client-account" element={
                <ProtectedRoute allowedRoles={['client', 'analyst']}>
                  <ClientAccount />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardRedirect />
                </ProtectedRoute>
              } />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          {!isDashboard && <Footer />}
        </div>
      </AuthProvider>
    </ThemeProvider>
  )

// NotFound component to show for unmatched routes
function NotFound() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{ backgroundImage: "url('/images/background5.jpg')" }}>
      <div className="bg-gray-900/90 backdrop-blur-md p-8 rounded-lg border border-red-500/50 shadow-2xl text-center max-w-md mx-4">
        <h1 className="text-4xl font-bold text-red-400 mb-4">404 - Page Not Found</h1>
        <p className="text-white mb-6">Sorry, the page you are looking for does not exist.</p>
        <a href="/" className="inline-block px-6 py-3 bg-red-500 hover:bg-red-600 text-black font-semibold rounded-md transition-colors duration-200">
          Go to Home
        </a>
      </div>
    </div>
  )
}
}

// Component to redirect to appropriate dashboard based on user role
function DashboardRedirect() {
  const { user } = useAuth();

  if (user?.role === 'admin' || user?.role === 'analyst') {
    return <Navigate to="/admin-dashboard" replace />;
  } else if (user?.role === 'client') {
    return <Navigate to="/client-dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
}

// Unauthorized access page
function Unauthorized() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{ backgroundImage: "url('/background5.jpg')" }}>
      <div className="bg-gray-900/95 backdrop-blur-md p-8 rounded-lg border border-teal-500/30 shadow-2xl text-center max-w-md">
        <div className="mx-auto h-16 w-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
          <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-cyan-300 mb-2">Access Denied</h2>
        <p className="text-gray-400 mb-6">
          You don't have permission to access this page.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-teal-400 hover:bg-teal-300 transition-colors duration-200"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
