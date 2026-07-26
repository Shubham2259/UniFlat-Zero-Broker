import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Bearer Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('uniflat_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Unauthorized/Expired Token
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      if (!error.config.url.includes('/auth/login') && !error.config.url.includes('/auth/register')) {
        localStorage.removeItem('uniflat_token');
        localStorage.removeItem('uniflat_user');
      }
    }
    return Promise.reject(error.response?.data || error);
  }
);

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
};

export const flatService = {
  searchFlats: (params) => api.get('/flats', { params }),
  getFlatById: (id) => api.get(`/flats/${id}`),
  createFlat: (flatData) => api.post('/flats', flatData),
  updateFlat: (id, flatData) => api.put(`/flats/${id}`, flatData),
  deleteFlat: (id) => api.delete(`/flats/${id}`),
  getMyListings: () => api.get('/flats/landlord/my-listings'),
};

export const inquiryService = {
  createInquiry: (inquiryData) => api.post('/inquiries', inquiryData),
  getStudentInquiries: () => api.get('/inquiries/student'),
  getLandlordInquiries: () => api.get('/inquiries/landlord'),
  updateStatus: (id, status) => api.put(`/inquiries/${id}/status`, null, { params: { status } }),
};

export const favoriteService = {
  toggleFavorite: (flatId) => api.post(`/favorites/${flatId}`),
  getStudentFavorites: () => api.get('/favorites'),
  checkFavorite: (flatId) => api.get(`/favorites/${flatId}/check`),
};

export const reviewService = {
  addReview: (flatId, reviewData) => api.post(`/flats/${flatId}/reviews`, reviewData),
  getReviews: (flatId) => api.get(`/flats/${flatId}/reviews`),
};

export const amenityService = {
  getAllAmenities: () => api.get('/amenities'),
};

export default api;
