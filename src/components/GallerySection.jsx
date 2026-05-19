import React, { useState } from 'react'

// الصور
import ring7 from '../assets/images/ring7.jpg'
import oneK from '../assets/images/1k.jpg'
import set4 from '../assets/images/set4.jpg'
import shopInside from '../assets/images/1777282595997.png'
import hundredG from '../assets/images/100g.jpg'
import bracelet from '../assets/images/bracelet.jpg'
import necklace3 from '../assets/images/necklace3.jpg'
import shopFront from '../assets/images/1777281920894.png'
import pounds from '../assets/images/pounds.jpg'
import walls3 from '../assets/images/walls3.jpg'
import alloys from '../assets/images/alloys.jpg'
import earrings from '../assets/images/earrings.jpg'

const galleryImages = [
  {
    id: 1,
    category: 'jewelry',
    title: 'خاتم ذهب عيار 21',
    desc: 'تصميم سعودي أصيل',
    image: ring7
  },
  {
    id: 2,
    category: 'bullion',
    title: 'سبيكة ذهب 1 كيلو',
    desc: 'نقاء 99.99% - معتمدة',
    image: oneK
  },
  {
    id: 3,
    category: 'jewelry',
    title: 'طقم أفراح ملكي',
    desc: 'ذهب عيار 21 - 68 جرام',
    image: set4
  },
  {
    id: 4,
    category: 'shop',
    title: 'داخل المحل',
    desc: 'أجواء فاخرة لعملائنا',
    image: shopInside
  },
  {
    id: 5,
    category: 'bullion',
    title: 'سبيكة 100 جرام',
    desc: 'الاستثمار الأمثل',
    image: hundredG
  },
  {
    id: 6,
    category: 'jewelry',
    title: 'سوار ألماسي',
    desc: 'مرصع بألماس طبيعي',
    image: bracelet
  },
  {
    id: 7,
    category: 'jewelry',
    title: 'قلادة ذهبية',
    desc: 'تصميم فرنسي فاخر',
    image: necklace3
  },
  {
    id: 8,
    category: 'shop',
    title: 'واجهة المحل',
    desc: 'ركن المعادن النادرة',
    image: shopFront
  },
  {
    id: 9,
    category: 'bullion',
    title: 'جنيهات ذهب سعودي',
    desc: 'متوفرة بالجملة',
    image: pounds
  },
  {
    id: 10,
    category: 'jewelry',
    title: 'أساور ذهبية فاخرة',
    desc: 'عيار 21 - تصميم أنيق',
    image: walls3
  },
  {
    id: 11,
    category: 'bullion',
    title: 'سبائك متنوعة',
    desc: '1 جرام - 5 جرام - 10 جرام',
    image: alloys
  },
  {
    id: 12,
    category: 'jewelry',
    title: 'أقراط ذهبية',
    desc: 'تصاميم راقية - عيار 21',
    image: earrings
  }
]

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [popupOpen, setPopupOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)
  const [visibleCount, setVisibleCount] = useState(12)

  const filters = [
    { value: 'all', label: 'الكل' },
    { value: 'jewelry', label: 'مصاغ مشغول' },
    { value: 'bullion', label: 'سبائك وذهب خالص' },
    { value: 'shop', label: 'صور المحل' }
  ]

  const filteredImages = activeFilter === 'all' ? galleryImages : galleryImages.filter(img => img.category === activeFilter)
  const visibleImages = filteredImages.slice(0, visibleCount)

  const openPopup = (img) => {
    setCurrentImage(img)
    setPopupOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closePopup = () => {
    setPopupOpen(false)
    setCurrentImage(null)
    document.body.style.overflow = 'auto'
  }

  const loadMore = () => setVisibleCount(prev => prev + 6)

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-container">
        <div className="gallery-header">
          <span className="gallery-tag">معرضنا</span>
          <h2 className="gallery-title">صور <span className="gold-text">الذهب والمصاغ</span></h2>
          <div className="gallery-divider"></div>
          <p className="gallery-subtitle">أكثر من <strong className="gold-text">50 صورة حصرية</strong> من داخل المحل ومنتجاتنا الفاخرة</p>
        </div>

        <div className="gallery-filters">
          {filters.map(f => (
            <button key={f.value} className={`gallery-filter-btn ${activeFilter === f.value ? 'active' : ''}`} onClick={() => setActiveFilter(f.value)}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {visibleImages.map(img => (
            <div key={img.id} className="gallery-item" data-category={img.category} onClick={() => openPopup(img)}>
              <img src={img.image} alt={img.title} />
              <div className="gallery-overlay">
                <div className="overlay-content">
                  <i className="fas fa-search-plus"></i>
                  <h4>{img.title}</h4>
                  <p>{img.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < filteredImages.length && (
          <div className="gallery-loadmore">
            <button className="loadmore-btn" onClick={loadMore}><i className="fas fa-images"></i> تحميل المزيد من الصور</button>
          </div>
        )}

        {popupOpen && currentImage && (
          <div className="gallery-popup active" onClick={closePopup}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <span className="popup-close" onClick={closePopup}><i className="fas fa-times"></i></span>
              <img src={currentImage.image} alt={currentImage.title} />
              <div className="popup-caption">{currentImage.title} - {currentImage.desc}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default GallerySection