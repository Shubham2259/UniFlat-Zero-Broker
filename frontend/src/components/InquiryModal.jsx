import React, { useState } from 'react';
import { X, Send, Calendar, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { inquiryService } from '../services/api';

export const InquiryModal = ({ flat, isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [preferredMoveInDate, setPreferredMoveInDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !flat) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await inquiryService.createInquiry({
        flatId: flat.id,
        message,
        preferredMoveInDate: preferredMoveInDate || null,
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg glass-card rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white">Inquiry Sent Successfully!</h3>
            <p className="text-sm text-slate-400 max-w-xs mx-auto">
              Your inquiry has been sent directly to the landlord <strong>{flat.landlord.fullName}</strong>. Zero broker fees apply.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> Direct Owner Booking
              </div>
              <h3 className="text-xl font-bold text-white line-clamp-1">Contact Owner: {flat.landlord.fullName}</h3>
              <p className="text-xs text-slate-400">Property: {flat.title}</p>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                <Calendar className="w-3.5 h-3.5 inline mr-1 text-emerald-400" /> Preferred Move-In Date
              </label>
              <input
                type="date"
                value={preferredMoveInDate}
                onChange={(e) => setPreferredMoveInDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                <MessageSquare className="w-3.5 h-3.5 inline mr-1 text-emerald-400" /> Message to Landlord
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi! I am a student interested in renting this flat. Is it available for a visit?"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-3 rounded-xl border border-slate-800 hover:bg-slate-900 text-slate-300 font-semibold text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-2/3 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-600/20 transition-all text-sm disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Direct Inquiry
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
