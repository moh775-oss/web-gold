import React, { useState } from 'react'

const galleryImages = [
  { id: 1, category: 'jewelry', title: 'خاتم ذهب عيار 21', desc: 'تصميم سعودي أصيل', image: '/src/assets/images/ring7.jpg' },
  { id: 2, category: 'bullion', title: 'سبيكة ذهب 1 كيلو', desc: 'نقاء 99.99% - معتمدة', image: '/src/assets/images/1k.jpg' },
  { id: 3, category: 'jewelry', title: 'طقم أفراح ملكي', desc: 'ذهب عيار 21 - 68 جرام', image: '/src/assets/images/set4.jpg' },
  { id: 4, category: 'shop', title: 'داخل المحل', desc: 'أجواء فاخرة لعملائنا', image: '/src/assets/images/1777282595997.png' },
  { id: 5, category: 'bullion', title: 'سبيكة 100 جرام', desc: 'الاستثمار الأمثل', image: '/src/assets/images/100g.jpg' },
  { id: 6, category: 'jewelry', title: 'سوار ألماسي', desc: 'مرصع بألماس طبيعي', image: '/src/assets/images/bracelet.jpg' },
  { id: 7, category: 'jewelry', title: 'قلادة ذهبية', desc: 'تصميم فرنسي فاخر', image: '/src/assets/images/necklace3.jpg' },
  { id: 8, category: 'shop', title: 'واجهة المحل', desc: 'ركن المعادن النادرة', image: '/src/assets/images/1777281920894.png' },
  { id: 9, category: 'bullion', title: 'جنيهات ذهب سعودي', desc: 'متوفرة بالجملة', image: '/src/assets/images/pounds.jpg' },
  { id: 10, category: 'jewelry', title: 'أساور ذهبية فاخرة', desc: 'عيار 21 - تصميم أنيق', image: '/src/assets/images/walls3.jpg' },
  { id: 11, category: 'bullion', title: 'سبائك متنوعة', desc: '1 جرام - 5 جرام - 10 جرام', image: '/src/assets/images/alloys.jpg' },
  { id: 12, category: 'jewelry', title: 'أقراط ذهبية', desc: 'تصاميم راقية - عيار 21', image: '/src/assets/images/earrings.jpg' }
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