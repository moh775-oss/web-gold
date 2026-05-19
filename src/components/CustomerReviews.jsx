// src/components/CustomerReviews.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { showSuccess, showError, showLoading } from '../services/messageService';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [burstStars, setBurstStars] = useState({});

  // جلب الآراء
  const loadReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('خطأ في جلب الآراء:', error);
      showError('فشل تحميل الآراء');
    } else {
      setReviews(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  // دالة انفجار النجمة
  const handleStarBurst = (starIndex) => {
    setBurstStars({ ...burstStars, [starIndex]: true });
    setTimeout(() => {
      setBurstStars(prev => ({ ...prev, [starIndex]: false }));
    }, 500);
  };

  // إرسال الرأي
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || !reviewText.trim() || rating === 0) {
      showError(' الرجاء إدخال الاسم والرأي واختيار التقييم');
      return;
    }

    setSubmitting(true);
    const hideLoading = showLoading('جاري إضافة رأيك...');

    const newReview = {
      customer_name: customerName.trim(),
      review_text: reviewText.trim(),
      rating: rating,
    };

    const { data, error } = await supabase
      .from('reviews')
      .insert([newReview])
      .select();

    hideLoading();

    if (error) {
      console.error('خطأ في الإضافة:', error);
      showError(' حدث خطأ: ' + error.message);
    } else if (data && data.length > 0) {
      showSuccess(' تم إضافة رأيك بنجاح! شكراً لك');
      setCustomerName('');
      setReviewText('');
      setRating(0);
      setShowForm(false);
      setReviews(prev => [data[0], ...prev]);
    } else {
      showError(' حدث خطأ غير متوقع');
    }
    setSubmitting(false);
  };

  // حذف رأي
  const handleDeleteReview = async (id) => {
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (!error) {
      setReviews(prev => prev.filter(r => r.id !== id));
      showSuccess(' تم حذف الرأي');
    }
  };

  // عرض النجوم
  const renderStars = (rate, interactive = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isActive = i <= rate;
      stars.push(
        <motion.div
          key={i}
          whileTap={interactive ? { scale: 1.3, rotate: 15 } : {}}
          animate={burstStars[i] ? {
            scale: [1, 1.5, 1],
            rotate: [0, 20, -20, 0],
            transition: { duration: 0.4 }
          } : {}}
          style={{ display: 'inline-block' }}
        >
          <i
            className={`fas fa-star ${isActive ? 'active' : ''}`}
            style={{
              fontSize: interactive ? '28px' : '16px',
              cursor: interactive ? 'pointer' : 'default',
              marginLeft: '6px',
              color: isActive ? '#FFD700' : '#444',
              transition: 'all 0.2s',
              textShadow: isActive ? '0 0 8px gold' : 'none'
            }}
            onClick={() => {
              if (interactive) {
                setRating(i);
                handleStarBurst(i);
              }
            }}
          />
        </motion.div>
      );
    }
    return stars;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'الآن';
    if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    return `منذ ${diffDays} يوم`;
  };

  if (loading) {
    return (
      <div className="reviews-section">
        <div className="loading-state"> جاري تحميل الآراء الذهبية...</div>
      </div>
    );
  }

  return (
    <div className="reviews-section">
      <div className="reviews-header-fancy">
        <div className="header-gold-line"></div>
        <h2>آراء عملائنا <i className="fas fa-heart" style={{ color: '#FFD700', fontSize: '28px' }}></i></h2>
        <button className="add-review-btn-fancy" onClick={() => setShowForm(true)}>
          <i className="fas fa-pen-fancy"></i> أضف رأيك
        </button>
      </div>

      {/* Swiper Carousel - حركة تلقائية 100% */}
      {reviews.length > 0 ? (
  <Swiper
    modules={[Autoplay]}
    spaceBetween={20}
    slidesPerView={1}
    breakpoints={{
      480: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    }}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }}
    loop={true}
    speed={800}
    style={{ 
      padding: '10px 5px 30px 5px',
      overflow: 'visible'
    }}
  >
    {reviews.map((review) => (
      <SwiperSlide key={review.id}>
        <div className="review-card-fancy">
         <div className="card-header-fancy">
                  <div className="avatar-wrapper">
                    <div className="avatar-glow"></div>
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <div className="user-info">
                    <h4>{review.customer_name}</h4>
                    <div className="time-badge">
                      <i className="far fa-clock"></i>
                      <span>{formatDate(review.created_at)}</span>
                    </div>
                  </div>
                </div>

                <div className="card-body-fancy">
                  <i className="fas fa-quote-right quote-icon"></i>
                  <p>{review.review_text}</p>
                </div>

                <div className="card-footer-fancy">
                  <div className="stars-wrapper">
                    {renderStars(review.rating, false)}
                  </div>
                  <button 
                    className="delete-review"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
) : (
  <div className="empty-state">
    <i className="fas fa-comment-slash"></i>
    <p>لا توجد آراء حالياً... كن أول من يضيف رأيه!</p>
  </div>
)}

      {/* نموذج الإضافة */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            className="form-overlay-fancy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="review-form-fancy"
              initial={{ scale: 0.8, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 100 }}
            >
              <button className="close-form-fancy" onClick={() => setShowForm(false)}>
                <i className="fas fa-times"></i>
              </button>
              
              <h3><i className="fas fa-star-of-life"></i> شاركنا رأيك</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="اسمك الكريم"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="input-group">
                  <i className="fas fa-comment"></i>
                  <textarea
                    placeholder="اكتب رأيك هنا..."
                    rows="4"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                  />
                </div>
                
                <div className="rating-group">
                  <label>تقييمك:</label>
                  <div className="stars-interactive">
                    {renderStars(rating, true)}
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="submit-btn-fancy"
                  disabled={submitting}
                >
                  {submitting ? <i className="fas fa-spinner fa-pulse"></i> : <i className="fas fa-paper-plane"></i>}
                  {submitting ? 'جاري الإرسال...' : 'أرسل رأيك'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerReviews;