import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShieldCheck, GraduationCap, Building2, Sparkles, MapPin, DollarSign, ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { flatService } from '../services/api';
import { FlatCard } from '../components/FlatCard';

export const Home = () => {
  const navigate = useNavigate();
  const [featuredFlats, setFeaturedFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    city: '',
    university: '',
    maxRent: '',
  });

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await flatService.searchFlats({});
        if (res.success && res.data) {
          // Page object response or array
          const flatsArray = res.data.content || res.data;
          setFeaturedFlats(flatsArray.slice(0, 6));
        }
      } catch (err) {
        console.error('Failed to fetch featured flats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchParams.keyword) query.append('keyword', searchParams.keyword);
    if (searchParams.city) query.append('city', searchParams.city);
    if (searchParams.university) query.append('university', searchParams.university);
    if (searchParams.maxRent) query.append('maxRent', searchParams.maxRent);
    navigate(`/flats?${query.toString()}`);
  };

  return (
    <div className="space-y-24">
      {/* Hero Banner Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-600/15 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> 100% Zero Brokerage Fee Guarantee
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Find Verified Student Flats <br />
            <span className="custom-gradient-text">Direct From Landlords</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Connect directly with verified property owners near Kolkata & global universities. No broker commission.
          </p>

          {/* Search Form Box */}
          <div className="max-w-4xl mx-auto glass-card p-4 sm:p-5 rounded-3xl shadow-2xl border border-slate-800/80">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-left">
              {/* Keyword / Title Input */}
              <div className="space-y-1 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                <label className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">Search Flat / Location</label>
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="e.g. 2BHK, Salt Lake"
                    value={searchParams.keyword}
                    onChange={(e) => setSearchParams({ ...searchParams, keyword: e.target.value })}
                    className="bg-transparent text-sm text-white focus:outline-none w-full"
                  />
                </div>
              </div>

              {/* University Select */}
              <div className="space-y-1 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                <label className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">University</label>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                  <select
                    value={searchParams.university}
                    onChange={(e) => setSearchParams({ ...searchParams, university: e.target.value })}
                    className="bg-transparent text-sm text-white focus:outline-none w-full cursor-pointer [&>option]:bg-slate-900 [&>option]:text-white"
                  >
                    <option value="">All Universities</option>
                    <option value="Techno Main Salt Lake">Techno Main Salt Lake</option>
                    <option value="Jadavpur University">Jadavpur University</option>
                    <option value="Heritage Institute of Technology">Heritage Institute of Technology</option>
                    <option value="MAKAUT">MAKAUT</option>
                    <option value="University of Calcutta">University of Calcutta</option>
                  </select>
                </div>
              </div>

              {/* Max Rent */}
              <div className="space-y-1 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                <label className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">Max Rent (₹/mo)</label>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="number"
                    placeholder="e.g. 15000"
                    value={searchParams.maxRent}
                    onChange={(e) => setSearchParams({ ...searchParams, maxRent: e.target.value })}
                    className="bg-transparent text-sm text-white focus:outline-none w-full"
                  />
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full h-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all p-3"
              >
                <Search className="w-5 h-5" /> Find Student Flats
              </button>
            </form>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4 text-center">
            <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
              <div className="text-2xl font-black text-white">₹0</div>
              <div className="text-xs text-slate-400 font-medium">Brokerage Commission</div>
            </div>
            <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
              <div className="text-2xl font-black text-emerald-400">100%</div>
              <div className="text-xs text-slate-400 font-medium">Direct Owner Contact</div>
            </div>
            <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
              <div className="text-2xl font-black text-white">5+</div>
              <div className="text-xs text-slate-400 font-medium">University Campuses Covered</div>
            </div>
            <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
              <div className="text-2xl font-black text-teal-400">4.9 ★</div>
              <div className="text-xs text-slate-400 font-medium">Student Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Student Flats Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Available Accommodations</span>
            <h2 className="text-3xl font-black text-white">Featured Student Flats</h2>
          </div>
          <Link
            to="/flats"
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold text-sm transition-colors"
          >
            Explore All Listings <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="glass-card rounded-2xl p-4 h-80 animate-pulse bg-slate-900/50"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredFlats.map((flat) => (
              <FlatCard key={flat.id} flat={flat} />
            ))}
          </div>
        )}
      </section>

      {/* Call to Action Banner for Landlords */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/20">
          <div className="max-w-2xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
              <CheckCircle2 className="w-4 h-4" /> FOR LANDLORDS & PROPERTY OWNERS
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Have a Student Apartment to Rent? List Free on UniFlat.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Connect with thousands of verified university students looking for academic year rentals. No listing fees, no agent commissions.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-2xl shadow-xl shadow-emerald-600/30 transition-all text-sm"
            >
              Post Your Property Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
