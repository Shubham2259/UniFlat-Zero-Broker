import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { inquiryService, favoriteService, flatService } from '../services/api';
import { FlatCard } from '../components/FlatCard';
import { MessageSquare, Heart, Clock, CheckCircle, XCircle, Building2, Calendar, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('explore');
  const [inquiries, setInquiries] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [availableFlats, setAvailableFlats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [inqRes, favRes, flatsRes] = await Promise.all([
          inquiryService.getStudentInquiries(),
          favoriteService.getStudentFavorites(),
          flatService.searchFlats({}),
        ]);

        if (inqRes.success) setInquiries(inqRes.data);
        if (favRes.success) setFavorites(favRes.data);
        if (flatsRes.success && flatsRes.data) {
          const flatsList = flatsRes.data.content || flatsRes.data;
          setAvailableFlats(flatsList);
        }

        // Default to 'inquiries' tab if inquiries exist, otherwise 'explore'
        if (inqRes.success && inqRes.data.length > 0) {
          setActiveTab('inquiries');
        } else {
          setActiveTab('explore');
        }
      } catch (err) {
        console.error('Error loading student dashboard data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACCEPTED':
        return (
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> Accepted by Owner
          </span>
        );
      case 'REJECTED':
        return (
          <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> Declined
          </span>
        );
      default:
        return (
          <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Pending Response
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="glass-card p-8 rounded-3xl space-y-2 border border-slate-800">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" /> Welcome Student Portal
        </div>
        <h1 className="text-3xl font-black text-white">Student Dashboard</h1>
        <p className="text-slate-400 text-sm">
          Welcome back, <strong className="text-white">{user?.fullName}</strong>. Explore sample zero-broker flats, manage visit requests, and view saved accommodations.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-4 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex items-center gap-2 pb-3 px-2 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'explore'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" /> Available Student Flats ({availableFlats.length})
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`flex items-center gap-2 pb-3 px-2 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'inquiries'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Sent Inquiries ({inquiries.length})
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-2 pb-3 px-2 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'favorites'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Heart className="w-4 h-4" /> Saved Favorites ({favorites.length})
        </button>
      </div>

      {/* Tab Contents */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : activeTab === 'explore' ? (
        <div className="space-y-6">
          <div className="text-xs text-slate-400 bg-slate-900/40 px-4 py-3 rounded-2xl border border-slate-800 flex items-center justify-between">
            <span>Showing verified student accommodations available for direct booking</span>
            <span className="text-emerald-400 font-semibold">Zero Broker Fee</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableFlats.map((flat) => (
              <FlatCard key={flat.id} flat={flat} />
            ))}
          </div>
        </div>
      ) : activeTab === 'inquiries' ? (
        inquiries.length === 0 ? (
          <div className="glass-card p-12 text-center rounded-3xl space-y-4">
            <MessageSquare className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-xl font-bold text-white">No Inquiries Submitted Yet</h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto">
              Select any flat from the "Available Student Flats" tab and send a direct visit inquiry to the owner.
            </p>
            <button
              onClick={() => setActiveTab('explore')}
              className="inline-block bg-emerald-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl"
            >
              Explore Available Flats
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inq) => (
              <div key={inq.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{inq.flat.title}</h3>
                    <p className="text-xs text-slate-400">{inq.flat.address}, {inq.flat.city}</p>
                  </div>
                  <div>{getStatusBadge(inq.status)}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                  <div className="space-y-1">
                    <span className="text-slate-400 font-semibold block">Landlord Contact:</span>
                    <span className="font-bold text-white">{inq.flat.landlord.fullName} ({inq.flat.landlord.email})</span>
                  </div>
                  {inq.preferredMoveInDate && (
                    <div className="space-y-1">
                      <span className="text-slate-400 font-semibold block">Requested Move-In Date:</span>
                      <span className="font-bold text-emerald-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {inq.preferredMoveInDate}
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl text-xs text-slate-300 space-y-1">
                  <span className="text-slate-400 font-semibold block">Your Message:</span>
                  <p className="italic">"{inq.message}"</p>
                </div>

                <div className="flex justify-end pt-1">
                  <Link
                    to={`/flats/${inq.flat.id}`}
                    className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <Building2 className="w-3.5 h-3.5" /> View Property Page
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )
      ) : favorites.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-3xl space-y-4">
          <Heart className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-xl font-bold text-white">No Saved Favorites</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
            Click the heart icon on any flat card to save it to your dashboard.
          </p>
          <button
            onClick={() => setActiveTab('explore')}
            className="inline-block bg-emerald-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl"
          >
            Explore Student Rentals
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <FlatCard key={fav.id} flat={fav.flat} isFavInitial={true} />
          ))}
        </div>
      )}
    </div>
  );
};
