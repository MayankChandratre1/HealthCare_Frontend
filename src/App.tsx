import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import PatientList from './components/PatientList';
import './App.css';
import UserList from './components/UserList';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={user ? <Navigate to="/patients" replace /> : <Login />} 
      />
      <Route 
        path="/patients" 
        element={user ? <PatientList /> : <Navigate to="/login" replace />} 
      />
      <Route 
        path="/staff" 
        element={user && user.role === 'ADMIN' ? <UserList /> : <Navigate to="/login" replace />} 
      />
      <Route 
        path="/" 
        element={<Navigate to={user ? "/patients" : "/login"} replace />} 
      />
      <Route 
        path="*" 
        element={<Navigate to={user ? "/patients" : "/login"} replace />} 
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;


