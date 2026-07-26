import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Home } from './pages/Home';
import { FlatList } from './pages/FlatList';
import { FlatDetails } from './pages/FlatDetails';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { StudentDashboard } from './pages/StudentDashboard';
import { LandlordDashboard } from './pages/LandlordDashboard';
import { AddFlat } from './pages/AddFlat';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/flats" element={<FlatList />} />
              <Route path="/flats/:id" element={<FlatDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Student Routes */}
              <Route
                path="/dashboard/student"
                element={
                  <ProtectedRoute allowedRoles={['ROLE_STUDENT']}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Protected Landlord Routes */}
              <Route
                path="/dashboard/landlord"
                element={
                  <ProtectedRoute allowedRoles={['ROLE_LANDLORD', 'ROLE_ADMIN']}>
                    <LandlordDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/flats/new"
                element={
                  <ProtectedRoute allowedRoles={['ROLE_LANDLORD', 'ROLE_ADMIN']}>
                    <AddFlat />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
