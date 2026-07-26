import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, GraduationCap, Bed, Bath, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { favoriteService } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const FlatCard = ({ flat, isFavInitial = false, onFavToggle }) => {
  const { user } = useAuth();
  const [isFav, setIsFav] = useState(isFavInitial);
  const [favLoading, setFavLoading] = useState(false);

  const primaryImage = flat.imageUrls && flat.imageUrls.length > 0
    ? flat.imageUrls[0]
    : 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80';

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    if (!user || user.role !== 'ROLE_STUDENT') return;

    setFavLoading(true);
    try {
      const res = await favoriteService.toggleFavorite(flat.id);
      setIsFav(res.data);
      if (onFavToggle) onFavToggle(flat.id, res.data);
    } catch (err) {
      console.error('Favorite toggle failed', err);
    } finally {
      setFavLoading(false);
    }
  };

  return (
    <div className="group glass-card rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
      <div>
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
          <img
            src={primaryImage}
            alt={flat.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80';
            }}
          />

          {/* Zero Broker Badge */}
          <div className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> ZERO BROKER FEE
          </div>

          {/* Favorite Button */}
          {user && user.role === 'ROLE_STUDENT' && (
            <button
              onClick={handleFavoriteClick}
              disabled={favLoading}
              className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-colors ${
                isFav
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                  : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>
          )}

          {/* Rent Price */}
          <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
            <span className="text-xl font-black text-emerald-400">${flat.rentAmount}</span>
            <span className="text-xs text-slate-300 font-medium"> / month</span>
          </div>
        </div>

        {/* Details Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 shrink-0" />
            <span className="truncate">{flat.nearestUniversity}</span>
            {flat.distanceToUniversityKm && (
              <span className="text-slate-400">({flat.distanceToUniversityKm} km)</span>
            )}
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
            {flat.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-500" />
            <span className="truncate">{flat.address}, {flat.city}</span>
          </div>

          {/* Specs Badge Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-900/60 p-2 rounded-lg justify-center">
              <Bed className="w-4 h-4 text-emerald-400" />
              <span>{flat.bedrooms} Bed</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/60 p-2 rounded-lg justify-center">
              <Bath className="w-4 h-4 text-emerald-400" />
              <span>{flat.bathrooms} Bath</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/60 p-2 rounded-lg justify-center text-[11px] font-medium text-emerald-400">
              <span className="truncate">{flat.furnishingStatus}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Action Link */}
      <div className="p-5 pt-0">
        <Link
          to={`/flats/${flat.id}`}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-emerald-600 text-slate-200 hover:text-white font-semibold py-2.5 rounded-xl border border-slate-800 hover:border-emerald-600 transition-all duration-300 text-sm group/btn"
        >
          View Direct Owner Info <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
