import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, PlusCircle, MapPin, GraduationCap, DollarSign, Bed, Bath, Image, ShieldCheck, Check } from 'lucide-react';
import { flatService, amenityService } from '../services/api';

export const AddFlat = () => {
  const navigate = useNavigate();
  const [allAmenities, setAllAmenities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    nearestUniversity: '',
    distanceToUniversityKm: '',
    rentAmount: '',
    depositAmount: '',
    bedrooms: 1,
    bathrooms: 1,
    furnishingStatus: 'FURNISHED',
    availableFrom: '',
    imageUrls: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'],
    amenityIds: [],
  });

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const res = await amenityService.getAllAmenities();
        if (res.success) setAllAmenities(res.data);
      } catch (err) {
        console.error('Failed to load amenities', err);
      }
    };
    fetchAmenities();
  }, []);

  const handleAmenityToggle = (id) => {
    setFormData((prev) => {
      const exists = prev.amenityIds.includes(id);
      return {
        ...prev,
        amenityIds: exists ? prev.amenityIds.filter((aId) => aId !== id) : [...prev.amenityIds, id],
      };
    });
  };

  const handleImageUrlChange = (index, value) => {
    const updated = [...formData.imageUrls];
    updated[index] = value;
    setFormData({ ...formData, imageUrls: updated });
  };

  const addImageField = () => {
    setFormData({ ...formData, imageUrls: [...formData.imageUrls, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        distanceToUniversityKm: parseFloat(formData.distanceToUniversityKm) || 0,
        rentAmount: parseFloat(formData.rentAmount),
        depositAmount: parseFloat(formData.depositAmount),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        imageUrls: formData.imageUrls.filter((url) => url.trim() !== ''),
      };

      const res = await flatService.createFlat(payload);
      if (res.success) {
        navigate('/dashboard/landlord');
      }
    } catch (err) {
      setError(err.message || 'Failed to post flat listing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="glass-card p-8 sm:p-10 rounded-3xl space-y-8 border border-slate-800">
        <div className="space-y-2 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" /> Free Student Property Listing
          </div>
          <h1 className="text-3xl font-extrabold text-white">Post Student Rental Flat</h1>
          <p className="text-xs text-slate-400">
            List your flat directly to university students. Zero broker fees apply.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title & Description */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Property Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Spacious 2BHK Apartment Near Oxford University Main Library"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Description</label>
              <textarea
                rows={4}
                required
                placeholder="Describe room layout, wifi speed, university proximity, public transport..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>
          </div>

          {/* Location details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Street Address</label>
              <input
                type="text"
                required
                placeholder="e.g. 12 High Street"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">City</label>
              <input
                type="text"
                required
                placeholder="e.g. Oxford"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Nearest University</label>
              <input
                type="text"
                required
                placeholder="e.g. University of Oxford"
                value={formData.nearestUniversity}
                onChange={(e) => setFormData({ ...formData, nearestUniversity: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Distance to University (km)</label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 0.8"
                value={formData.distanceToUniversityKm}
                onChange={(e) => setFormData({ ...formData, distanceToUniversityKm: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Pricing & Layout Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Rent ($/mo)</label>
              <input
                type="number"
                required
                placeholder="1200"
                value={formData.rentAmount}
                onChange={(e) => setFormData({ ...formData, rentAmount: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Deposit ($)</label>
              <input
                type="number"
                required
                placeholder="2400"
                value={formData.depositAmount}
                onChange={(e) => setFormData({ ...formData, depositAmount: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Bedrooms</label>
              <input
                type="number"
                min="1"
                required
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Furnishing</label>
              <select
                value={formData.furnishingStatus}
                onChange={(e) => setFormData({ ...formData, furnishingStatus: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="FURNISHED">Fully Furnished</option>
                <option value="SEMI_FURNISHED">Semi Furnished</option>
                <option value="UNFURNISHED">Unfurnished</option>
              </select>
            </div>
          </div>

          {/* Image URLs */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Image URLs (High Resolution Property Photos)</span>
              <button
                type="button"
                onClick={addImageField}
                className="text-emerald-400 hover:underline text-xs flex items-center gap-1"
              >
                + Add Image Link
              </button>
            </label>
            {formData.imageUrls.map((url, idx) => (
              <input
                key={idx}
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={url}
                onChange={(e) => handleImageUrlChange(idx, e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 mb-2"
              />
            ))}
          </div>

          {/* Amenities checklist */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-300 block">Select Student Amenities</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {allAmenities.map((amenity) => {
                const checked = formData.amenityIds.includes(amenity.id);
                return (
                  <button
                    key={amenity.id}
                    type="button"
                    onClick={() => handleAmenityToggle(amenity.id)}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors ${
                      checked
                        ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-400'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{amenity.name}</span>
                    {checked && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-emerald-600/30 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <PlusCircle className="w-5 h-5" /> Publish Property Listing Free
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
