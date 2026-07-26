import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, MapPin, GraduationCap, DollarSign, RefreshCw } from 'lucide-react';
import { flatService } from '../services/api';
import { FlatCard } from '../components/FlatCard';

export const FlatList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [university, setUniversity] = useState(searchParams.get('university') || searchParams.get('nearestUniversity') || '');
  const [minRent, setMinRent] = useState(searchParams.get('minRent') || '');
  const [maxRent, setMaxRent] = useState(searchParams.get('maxRent') || '');
  const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || '');
  const [furnishingStatus, setFurnishingStatus] = useState(searchParams.get('furnishingStatus') || '');

  useEffect(() => {
    setKeyword(searchParams.get('keyword') || '');
    setCity(searchParams.get('city') || '');
    setUniversity(searchParams.get('university') || searchParams.get('nearestUniversity') || '');
    setMinRent(searchParams.get('minRent') || '');
    setMaxRent(searchParams.get('maxRent') || '');
    setBedrooms(searchParams.get('bedrooms') || '');
    setFurnishingStatus(searchParams.get('furnishingStatus') || '');
  }, [searchParams]);

  const fetchFlats = async () => {
    setLoading(true);
    try {
      const params = {};
      if (keyword) params.keyword = keyword;
      if (city) params.city = city;
      if (university) params.university = university;
      if (minRent) params.minRent = minRent;
      if (maxRent) params.maxRent = maxRent;
      if (bedrooms) params.bedrooms = bedrooms;
      if (furnishingStatus) params.furnishingStatus = furnishingStatus;

      const res = await flatService.searchFlats(params);
      if (res.success && res.data) {
        const flatsList = res.data.content || res.data;
        setFlats(flatsList);
      }
    } catch (err) {
      console.error('Error loading flats', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlats();
  }, [keyword, city, university, minRent, maxRent, bedrooms, furnishingStatus]);

  const updateFilters = (newFields) => {
    const updated = {
      keyword,
      city,
      university,
      minRent,
      maxRent,
      bedrooms,
      furnishingStatus,
      ...newFields,
    };

    const newParams = {};
    if (updated.keyword) newParams.keyword = updated.keyword;
    if (updated.city) newParams.city = updated.city;
    if (updated.university) newParams.university = updated.university;
    if (updated.minRent) newParams.minRent = updated.minRent;
    if (updated.maxRent) newParams.maxRent = updated.maxRent;
    if (updated.bedrooms) newParams.bedrooms = updated.bedrooms;
    if (updated.furnishingStatus) newParams.furnishingStatus = updated.furnishingStatus;

    setSearchParams(newParams);
  };

  const handleReset = () => {
    setKeyword('');
    setCity('');
    setUniversity('');
    setMinRent('');
    setMaxRent('');
    setBedrooms('');
    setFurnishingStatus('');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white">Student Accommodation & Flat Search</h1>
        <p className="text-slate-400 text-sm">
          Showing verified zero-broker fee student rentals near major universities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 rounded-3xl space-y-5 border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 font-bold text-white text-base">
                <Filter className="w-5 h-5 text-emerald-400" /> Filter Listings
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            <div className="space-y-4">
              {/* Keyword / Title Search Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Keyword / Flat Title</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Studio, 2BHK, Cozy"
                    value={keyword}
                    onChange={(e) => {
                      setKeyword(e.target.value);
                      updateFilters({ keyword: e.target.value });
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* University Select Filter */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">University Campus</label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <select
                    value={university}
                    onChange={(e) => {
                      setUniversity(e.target.value);
                      updateFilters({ university: e.target.value });
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 cursor-pointer [&>option]:bg-slate-900 [&>option]:text-white"
                  >
                    <option value="">All Universities</option>
                    <option value="Techno Main Salt Lake">Techno Main Salt Lake</option>
                    <option value="Jadavpur University">Jadavpur University</option>
                    <option value="Heritage Institute of Technology">Heritage Institute of Technology</option>
                    <option value="MAKAUT">MAKAUT</option>
                    <option value="University of Calcutta">University of Calcutta</option>
                    <option value="University of Oxford">University of Oxford</option>
                  </select>
                </div>
              </div>

              {/* City Filter */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">City / Location</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Kolkata, Salt Lake"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      updateFilters({ city: e.target.value });
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Rent Range */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Min Rent (₹)</label>
                  <input
                    type="number"
                    placeholder="Min"
                    value={minRent}
                    onChange={(e) => {
                      setMinRent(e.target.value);
                      updateFilters({ minRent: e.target.value });
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Max Rent (₹)</label>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxRent}
                    onChange={(e) => {
                      setMaxRent(e.target.value);
                      updateFilters({ maxRent: e.target.value });
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Bedrooms Filter */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Bedrooms</label>
                <select
                  value={bedrooms}
                  onChange={(e) => {
                    setBedrooms(e.target.value);
                    updateFilters({ bedrooms: e.target.value });
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 cursor-pointer [&>option]:bg-slate-900 [&>option]:text-white"
                >
                  <option value="">Any Bedrooms</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>

              {/* Furnishing Status */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Furnishing</label>
                <select
                  value={furnishingStatus}
                  onChange={(e) => {
                    setFurnishingStatus(e.target.value);
                    updateFilters({ furnishingStatus: e.target.value });
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 cursor-pointer [&>option]:bg-slate-900 [&>option]:text-white"
                >
                  <option value="">Any Furnishing</option>
                  <option value="FURNISHED">Fully Furnished</option>
                  <option value="SEMI_FURNISHED">Semi Furnished</option>
                  <option value="UNFURNISHED">Unfurnished</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Flat Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/40 px-4 py-3 rounded-2xl border border-slate-800">
            <span>Found <strong>{flats.length}</strong> available student flats</span>
            <span className="text-emerald-400 font-semibold">100% Direct Landlord Verified</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="glass-card rounded-2xl p-4 h-80 animate-pulse bg-slate-900/50"></div>
              ))}
            </div>
          ) : flats.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-900 border border-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">No Student Flats Match Your Filter</h3>
              <p className="text-slate-400 text-sm max-w-sm mx-auto">
                Try widening your price range or clearing city/university search terms to view all available listings.
              </p>
              <button
                onClick={handleReset}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flats.map((flat) => (
                <FlatCard key={flat.id} flat={flat} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
