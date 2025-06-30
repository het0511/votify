import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import VoterDashboard from './pages/VoterDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import { useAuthStore } from './store/authStore';

function App() {
  const { isAuthenticated, checkAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/" element={<Layout />}>
        <Route 
          index 
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard\" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              {useAuthStore.getState().user?.role.toLowerCase() === 'admin' ? (
                <AdminDashboard />
              ) : (
                <VoterDashboard />
              )}
            </ProtectedRoute>
          } 
        />
      </Route>
    </Routes>
  );
}

export default App;