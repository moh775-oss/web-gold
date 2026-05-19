import React, { useState } from 'react'

const products = [
  { id: 1, category: 'rings', title: 'خاتم ذهب عيار 21', weight: '8.5 جرام', purity: 'عيار 21', type: 'ذهب أصفر', image: '../assets/images/ring6.jpg', badge: 'الأكثر مبيعاً', desc: 'تصميم فاخر، نقشات دقيقة، حجر كريم طبيعي' },
  { id: 2, category: 'necklaces', title: 'قلادة ذهبية مرصعة', weight: '12 جرام', purity: 'عيار 18', type: 'مرصع بألماس', image: '../assets/images/necklace.jpg', badge: 'جديد', desc: 'تصميم أنيق، سلسلة رفيعة مع قلادة مميزة بالألماس' },
  { id: 3, category: 'necklaces', title: 'سلسلة ذهبية دبل', weight: '28 جرام', purity: 'عيار 22', type: 'ذهب عيار 22', image: '../assets/images/chains.jpg', badge: '', desc: 'سلسلة ثقيلة الوزن، تلائم المناسبات الخاصة' },
  { id: 4, category: 'bracelets', title: 'سوار ألماسي فاخر', weight: '15 جرام', purity: 'عيار 21', type: 'ألماس طبيعي', image: '../assets/images/walls.jpg', badge: 'الأكثر طلباً', desc: 'مرصع بألماس طبيعي، تصميم عصري يلفت الأنظار' },
  { id: 5, category: 'sets', title: 'طقم كامل فاخر', weight: '68 جرام', purity: 'عيار 21', type: 'هدية مثالية', image: '../assets/images/set.jpg', badge: 'حصري', desc: 'طقم متكامل: سلسلة + خاتم + سوار + أقراط' },
  { id: 6, category: 'rings', title: 'خاتم ذهب عيار 22', weight: '12 جرام', purity: 'عيار 22', type: 'ذهب أصفر', image: '../assets/images/ring2.jpg', badge: 'تصميم عصري', desc: 'تصميم عصري، لمسة مطفي، نقشات شرقية أصيلة' },
  { id: 7, category: 'bracelets', title: 'اسوارة ذهبية ناعمة', weight: '10 جرام', purity: 'عيار 18', type: 'هدية مثالية', image: '../assets/images/walls2.jpg', badge: '', desc: 'تصميم أنيق يناسب جميع الأوقات، هدية مميزة' },
  { id: 8, category: 'necklaces', title: 'قلادة ذهبية', weight: '14 جرام', purity: 'عيار 21', type: 'حجر كريم', image: '../assets/images/necklace2.jpg', badge: 'مطلوب بكثرة', desc: 'قلادة مميزة بحجر كريم طبيعي، لمسة فخامة لا تقاوم' },
  { id: 9, category: 'sets', title: 'طقم ذهب فاخر', weight: '45 جرام', purity: 'عيار 21', type: 'تصميم حصري', image: '../assets/images/set2.jpg', badge: 'إصدار محدود', desc: 'طقم متكامل بتصميم استثنائي، مناسب لأهم المناسبات' }
]

const JewelrySection = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  
  const filters = [
    { value: 'all', label: 'الكل' },
    { value: 'rings', label: 'خواتم' },
    { value: 'necklaces', label: 'قلادات وسلاسل' },
    { value: 'bracelets', label: 'أساور' },
    { value: 'sets', label: 'أطقم كاملة' }
  ]

  const filteredProducts = activeFilter === 'all' ? products : products.filter(p => p.category === activeFilter)

  const handleInquiry = (product) => {
    const msg = `السلام عليكم، أود الاستفسار عن: ${product.title}`
    window.open(`https://wa.me/966567401364?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <section className="jewelry-section" id="jewelry">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">💎 تشكيلاتنا</span>
          <h2 className="section-title">المصاغ <span className="gold-text">المشغول</span></h2>
          <div className="title-separator">
            <span className="separator-line"></span>
            <i className="fas fa-crown"></i>
            <span className="separator-line"></span>
          </div>
          <p className="section-subtitle">أرقى التصاميم الذهبية المصنوعة يدوياً بأعلى معايير الجودة</p>
        </div>

        <div className="filter-tabs">
          {filters.map(f => (
            <button key={f.value} className={`filter-btn ${activeFilter === f.value ? 'active' : ''}`} onClick={() => setActiveFilter(f.value)}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card" data-category={product.category}>
              {product.badge && <div className="product-badge">{product.badge}</div>}
              <div className="product-img-wrapper">
                <img className="product-img" src={product.image} alt={product.title} />
                <div className="product-actions">
                  <button className="quick-view"><i className="fas fa-eye"></i></button>
                  <button className="wishlist"><i className="fas fa-heart"></i></button>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-desc">{product.desc}</p>
                <div className="product-meta">
                  <div className="meta-item"><i className="fas fa-weight-hanging"></i><span>{product.weight}</span></div>
                  <div className="meta-item"><i className="fas fa-certificate"></i><span>{product.purity}</span></div>
                  <div className="meta-item"><i className="fas fa-gem"></i><span>{product.type}</span></div>
                </div>
                <button className="inquiry-btn" onClick={() => handleInquiry(product)}>
                  <i className="fas fa-headset"></i> اطلب السعر
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default JewelrySection