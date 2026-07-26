import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { flatService, inquiryService } from '../services/api';
import { PlusCircle, Building2, MessageSquare, Check, X, Trash2, Edit, Calendar, User, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandlordDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('listings');
  const [listings, setListings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLandlordData = async () => {
    try {
      const [listRes, inqRes] = await Promise.all([
        flatService.getMyListings(),
        inquiryService.getLandlordInquiries(),
      ]);

      if (listRes.success) setListings(listRes.data);
      if (inqRes.success) setInquiries(inqRes.data);
    } catch (err) {
      console.error('Error loading landlord data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLandlordData();
  }, []);

  const handleInquiryStatus = async (inquiryId, newStatus) => {
    try {
      const res = await inquiryService.updateStatus(inquiryId, newStatus);
      if (res.success) {
        setInquiries(inquiries.map((inq) => (inq.id === inquiryId ? res.data : inq)));
      }
    } catch (err) {
      console.error('Failed to update inquiry status', err);
    }
  };

  const handleDeleteListing = async (flatId) => {
    if (!window.confirm('Are you sure you want to remove this property listing?')) return;
    try {
      const res = await flatService.deleteFlat(flatId);
      if (res.success) {
        setListings(listings.filter((f) => f.id !== flatId));
      }
    } catch (err) {
      console.error('Failed to delete flat listing', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-8 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800">
        <div>
          <h1 className="text-3xl font-black text-white">Landlord Portal</h1>
          <p className="text-slate-400 text-sm">
            Manage your student properties and review direct visit requests from university students.
          </p>
        </div>
        <Link
          to="/flats/new"
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-2xl shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 text-sm shrink-0"
        >
          <PlusCircle className="w-4 h-4" /> Post New Student Flat
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('listings')}
          className={`flex items-center gap-2 pb-3 px-2 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'listings'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" /> My Flat Listings ({listings.length})
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`flex items-center gap-2 pb-3 px-2 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'inquiries'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Student Visit Inquiries ({inquiries.length})
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : activeTab === 'listings' ? (
        listings.length === 0 ? (
          <div className="glass-card p-12 text-center rounded-3xl space-y-4">
            <Building2 className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-xl font-bold text-white">No Properties Listed Yet</h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto">
              Post your student accommodation flat to start receiving zero-commission inquiries.
            </p>
            <Link to="/flats/new" className="inline-block bg-emerald-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl">
              List Property Free
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((flat) => (
              <div key={flat.id} className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-800">
                <div className="relative aspect-video bg-slate-900">
                  <img
                    src={flat.imageUrls?.[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'}
                    alt={flat.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-xl text-emerald-400 font-black text-sm">
                    ${flat.rentAmount} / mo
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-white text-base line-clamp-1">{flat.title}</h3>
                  <p className="text-xs text-slate-400">{flat.address}, {flat.city}</p>
                  <p className="text-xs text-emerald-400 font-semibold">{flat.nearestUniversity}</p>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800/80 pt-4">
                  <Link
                    to={`/flats/${flat.id}`}
                    className="text-xs text-slate-300 hover:text-white font-semibold flex items-center gap-1"
                  >
                    View Page
                  </Link>

                  <button
                    onClick={() => handleDeleteListing(flat.id)}
                    className="p-2 text-rose-400 hover:text-white hover:bg-rose-500/20 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : inquiries.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-3xl space-y-4">
          <MessageSquare className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-xl font-bold text-white">No Received Inquiries Yet</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
            When students request to visit your flats, their inquiries will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div key={inq.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{inq.flat.title}</h3>
                  <span className="text-xs text-slate-400">Property ID: #{inq.flat.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold mr-2">Status: {inq.status}</span>
                  {inq.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => handleInquiryStatus(inq.id, 'ACCEPTED')}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Accept Visit
                      </button>
                      <button
                        onClick={() => handleInquiryStatus(inq.id, 'REJECTED')}
                        className="bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" /> Decline
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                <div>
                  <span className="text-slate-400 block font-semibold">Student Name:</span>
                  <span className="font-bold text-white flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-emerald-400" /> {inq.student.fullName}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Student Email:</span>
                  <span className="font-bold text-white flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" /> {inq.student.email}
                  </span>
                </div>
                {inq.student.phone && (
                  <div>
                    <span className="text-slate-400 block font-semibold">Student Phone:</span>
                    <span className="font-bold text-white flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" /> {inq.student.phone}
                    </span>
                  </div>
                )}
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl text-xs text-slate-300 space-y-1">
                <span className="text-slate-400 font-semibold block">Student Message:</span>
                <p className="italic">"{inq.message}"</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
