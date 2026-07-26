import React from 'react';
import { Building2, ShieldCheck, Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Uni<span className="text-emerald-400">Flat</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Zero broker fee student housing marketplace connecting university students directly with verified property owners.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full w-fit">
              <ShieldCheck className="w-4 h-4" /> 100% Direct Owner Contact
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Explore</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/flats" className="hover:text-emerald-400 transition-colors">Search Student Flats</Link></li>
              <li><Link to="/flats?furnishingStatus=FURNISHED" className="hover:text-emerald-400 transition-colors">Fully Furnished Flats</Link></li>
              <li><Link to="/register" className="hover:text-emerald-400 transition-colors">List Your Property Free</Link></li>
              <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Student Login</Link></li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Popular Locations</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/flats?city=Oxford" className="hover:text-emerald-400 transition-colors">Oxford Student Accommodation</Link></li>
              <li><Link to="/flats?city=Cambridge" className="hover:text-emerald-400 transition-colors">Cambridge Student Rooms</Link></li>
              <li><Link to="/flats?city=London" className="hover:text-emerald-400 transition-colors">London Flats Near Universities</Link></li>
              <li><Link to="/flats?city=Manchester" className="hover:text-emerald-400 transition-colors">Manchester Student Rentals</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Contact Support</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>support@uniflat.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+1 (800) UNIFLAT</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>University Quarter Hub</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 UniFlat Platform. Built for Zero Broker Fee Housing.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Center</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
