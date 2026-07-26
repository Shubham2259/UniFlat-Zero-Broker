import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin, GraduationCap, Bed, Bath, ShieldCheck, Heart, Calendar, DollarSign,
  Phone, Mail, User, Star, MessageSquare, Send, CheckCircle2, Wifi, Snowflake, Shirt, Cpu
} from 'lucide-react';
import { flatService, favoriteService, reviewService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { InquiryModal } from '../components/InquiryModal';

export const FlatDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [flat, setFlat] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [activeImage, setActiveImage] = useState('');

  // Review Form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    const fetchFlatDetails = async () => {
      try {
        const res = await flatService.getFlatById(id);
        if (res.success && res.data) {
          setFlat(res.data);
          if (res.data.imageUrls && res.data.imageUrls.length > 0) {
            setActiveImage(res.data.imageUrls[0]);
          } else {
            setActiveImage('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80');
          }
        }

        // Fetch reviews
        const revRes = await reviewService.getReviews(id);
        if (revRes.success) {
          setReviews(revRes.data);
        }

        // Check favorite if student
        if (user && user.role === 'ROLE_STUDENT') {
          const favRes = await favoriteService.checkFavorite(id);
          if (favRes.success) setIsFav(favRes.data);
        }
      } catch (err) {
        console.error('Error fetching flat details', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlatDetails();
  }, [id, user]);

  const handleFavoriteToggle = async () => {
    if (!user || user.role !== 'ROLE_STUDENT') return;
    try {
      const res = await favoriteService.toggleFavorite(id);
      setIsFav(res.data);
    } catch (err) {
      console.error('Favorite toggle failed', err);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setReviewLoading(true);
    try {
      const res = await reviewService.addReview(id, { rating, comment });
      if (res.success && res.data) {
        setReviews([res.data, ...reviews]);
        setComment('');
      }
    } catch (err) {
      console.error('Failed to submit review', err);
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!flat) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Flat Listing Not Found</h2>
        <p className="text-slate-400">The requested property listing does not exist or has been removed.</p>
        <Link to="/flats" className="inline-block bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-xl">
          Back to Flat Search
        </Link>
      </div>
    );
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 'New';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Info & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-600/90 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> ZERO BROKER FEE
            </span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              {flat.furnishingStatus}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{flat.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-emerald-400" /> {flat.address}, {flat.city}</span>
            <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4 text-teal-400" /> {flat.nearestUniversity} ({flat.distanceToUniversityKm} km)</span>
          </div>
        </div>

        {/* Favorite & Action buttons */}
        <div className="flex items-center gap-3">
          {user && user.role === 'ROLE_STUDENT' && (
            <button
              onClick={handleFavoriteToggle}
              className={`p-3 rounded-2xl border transition-colors flex items-center gap-2 ${
                isFav
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-current text-rose-500' : ''}`} />
              <span className="text-xs font-semibold">{isFav ? 'Saved' : 'Save Flat'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Images & Overview */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Image Banner */}
          <div className="space-y-4">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
              <img
                src={activeImage}
                alt={flat.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80';
                }}
              />
            </div>

            {/* Image Thumbnails */}
            {flat.imageUrls && flat.imageUrls.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {flat.imageUrls.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(url)}
                    className={`w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImage === url ? 'border-emerald-500 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Specs Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-card p-4 rounded-2xl text-center space-y-1">
              <Bed className="w-6 h-6 text-emerald-400 mx-auto" />
              <div className="text-base font-bold text-white">{flat.bedrooms} Bedrooms</div>
              <div className="text-[11px] text-slate-400">Private Student Rooms</div>
            </div>

            <div className="glass-card p-4 rounded-2xl text-center space-y-1">
              <Bath className="w-6 h-6 text-emerald-400 mx-auto" />
              <div className="text-base font-bold text-white">{flat.bathrooms} Bathrooms</div>
              <div className="text-[11px] text-slate-400">Attached / Shared</div>
            </div>

            <div className="glass-card p-4 rounded-2xl text-center space-y-1">
              <Calendar className="w-6 h-6 text-teal-400 mx-auto" />
              <div className="text-base font-bold text-white">{flat.availableFrom || 'Immediate'}</div>
              <div className="text-[11px] text-slate-400">Available Date</div>
            </div>

            <div className="glass-card p-4 rounded-2xl text-center space-y-1">
              <Star className="w-6 h-6 text-amber-400 mx-auto fill-amber-400" />
              <div className="text-base font-bold text-white">{avgRating} Rating</div>
              <div className="text-[11px] text-slate-400">{reviews.length} Student Reviews</div>
            </div>
          </div>

          {/* Property Description */}
          <div className="glass-card p-8 rounded-3xl space-y-4">
            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">Property Description</h3>
            <p className="text-slate-300 leading-relaxed text-sm whitespace-pre-line">{flat.description}</p>
          </div>

          {/* Amenities Section */}
          <div className="glass-card p-8 rounded-3xl space-y-5">
            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">Included Student Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {flat.amenities && flat.amenities.map((amenity) => (
                <div key={amenity.id} className="flex items-center gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews & Ratings Section */}
          <div className="glass-card p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
              Student Reviews ({reviews.length})
            </h3>

            {/* Add Review Form */}
            {user && user.role === 'ROLE_STUDENT' && (
              <form onSubmit={handleAddReview} className="bg-slate-900/60 p-5 rounded-2xl space-y-4 border border-slate-800">
                <h4 className="text-sm font-bold text-white">Write a Student Review</h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-300">Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-amber-400"
                    >
                      <Star className={`w-5 h-5 ${star <= rating ? 'fill-amber-400' : 'text-slate-600'}`} />
                    </button>
                  ))}
                </div>
                <textarea
                  rows={3}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience regarding location, wifi speed, safety, landlord friendliness..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  disabled={reviewLoading}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl"
                >
                  Submit Review
                </button>
              </form>
            )}

            {/* Reviews List */}
            {reviews.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No reviews posted yet for this flat.</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                          {rev.student.fullName[0]}
                        </div>
                        <span className="font-semibold text-white">{rev.student.fullName}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" /> {rev.rating}/5
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Landlord Direct Contact Card */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl space-y-6 sticky top-28 border border-emerald-500/20 shadow-2xl">
            {/* Rent & Deposit Pricing */}
            <div className="border-b border-slate-800 pb-5 space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Monthly Rent</div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">${flat.rentAmount}</span>
                <span className="text-xs text-slate-400 font-medium">/ month</span>
              </div>
              <div className="text-xs text-slate-400 flex items-center justify-between pt-1">
                <span>Security Deposit:</span>
                <span className="font-semibold text-white">${flat.depositAmount}</span>
              </div>
            </div>

            {/* Direct Landlord Information */}
            <div className="space-y-4">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Property Owner Info</div>
              <div className="flex items-center gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shrink-0">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-emerald-400 font-bold">
                    <User className="w-6 h-6" />
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div className="text-sm font-bold text-white truncate">{flat.landlord.fullName}</div>
                  <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Landlord
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                {flat.landlord.phone && (
                  <div className="flex items-center gap-2 bg-slate-900/40 p-3 rounded-xl">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-medium text-white">{flat.landlord.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 bg-slate-900/40 p-3 rounded-xl">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate font-medium text-white">{flat.landlord.email}</span>
                </div>
              </div>
            </div>

            {/* Zero Broker Fee Callout */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl space-y-1 text-center">
              <div className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4" /> 0% Broker Commission
              </div>
              <p className="text-[11px] text-slate-300">
                Direct booking strictly enforced. No broker fees or agency service charges added.
              </p>
            </div>

            {/* Action Inquiry Button */}
            {user ? (
              user.role === 'ROLE_STUDENT' ? (
                <button
                  onClick={() => setIsInquiryOpen(true)}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-2xl shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" /> Send Direct Owner Inquiry
                </button>
              ) : (
                <div className="text-xs text-center text-slate-400 bg-slate-900 p-3 rounded-xl">
                  You are logged in as Landlord/Admin.
                </div>
              )
            ) : (
              <Link
                to="/login"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-2xl shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 text-sm"
              >
                Sign In to Contact Landlord
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        flat={flat}
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  );
};
