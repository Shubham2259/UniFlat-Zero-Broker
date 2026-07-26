import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, Search, Heart, User, LogOut, PlusCircle, ShieldCheck, Home } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Building2 className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white">Uni<span className="custom-gradient-text">Flat</span></span>
              <span className="block text-[10px] font-semibold text-emerald-400/90 tracking-widest uppercase -mt-1">Zero Broker Fee</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-slate-300 hover:text-emerald-400 font-medium transition-colors flex items-center gap-2">
              <Home className="w-4 h-4" /> Home
            </Link>
            <Link to="/flats" className="text-slate-300 hover:text-emerald-400 font-medium transition-colors flex items-center gap-2">
              <Search className="w-4 h-4" /> Find Student Flats
            </Link>
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                {user.role === 'ROLE_LANDLORD' || user.role === 'ROLE_ADMIN' ? (
                  <Link
                    to="/flats/new"
                    className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all duration-300"
                  >
                    <PlusCircle className="w-4 h-4" /> Post Free Flat
                  </Link>
                ) : null}

                {user.role === 'ROLE_STUDENT' && (
                  <Link
                    to="/dashboard/student"
                    className="flex items-center gap-2 text-slate-300 hover:text-white px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <Heart className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium">Dashboard</span>
                  </Link>
                )}

                {user.role === 'ROLE_LANDLORD' && (
                  <Link
                    to="/dashboard/landlord"
                    className="flex items-center gap-2 text-slate-300 hover:text-white px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium">My Listings</span>
                  </Link>
                )}

                <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
                  <div className="text-right hidden sm:block">
                    <span className="block text-sm font-semibold text-white">{user.fullName}</span>
                    <span className="block text-[11px] font-medium text-emerald-400/90 uppercase tracking-wider">
                      {user.role === 'ROLE_STUDENT' ? 'Student' : user.role === 'ROLE_LANDLORD' ? 'Landlord' : 'Admin'}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="p-2.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl border border-transparent hover:border-rose-500/20 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-900 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
