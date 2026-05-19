import React from 'react'

const bullionItems = [
  { id: 1, name: 'سبيكة 1 جرام', desc: 'ذهبية مصغرة للهدايا والاستثمار الصغير', weight: '1 جرام', icon: 'fa-coins' },
  { id: 2, name: 'سبيكة 5 جرام', desc: 'خيار مثالي للمبتدئين في الاستثمار', weight: '5 جرام', icon: 'fa-money-bill-trend-up' },
  { id: 3, name: 'سبيكة 10 جرام', desc: 'مغلفة بختم الثقة والنقاء', weight: '10 جرام', icon: 'fa-gem' },
  { id: 4, name: 'سبيكة 100 جرام', desc: 'الاختيار الأول للمستثمرين الجادين', weight: '100 جرام', icon: 'fa-chart-simple' },
  { id: 5, name: 'سبيكة 250 جرام', desc: 'تخزين آمن للثروات الكبيرة', weight: '250 جرام', icon: 'fa-trophy' },
  { id: 6, name: 'سبيكة 1 كيلو جرام', desc: 'القمة في الاستثمار الذهبي – متوفرة بالجملة', weight: '1000 جرام', icon: 'fa-crown' }
]

const BullionSection = () => {
  return (
    <section className="bullion-section" id="bullion">
      <div className="bullion-container">
        <div className="bullion-header">
          <div className="bullion-header-left">
            <span className="bullion-tag">استثمار آمن</span>
            <h2 className="bullion-title">الذهب <span className="pure-gold">الصافي</span><span className="bullion-sub-badge">نقاء 99.99%</span></h2>
            <div className="bullion-divider"></div>
            <p className="bullion-description">الذهب الخالص ليس مجرد معدن ثمين، بل هو ملاذ آمن للثروة عبر العصور. في <strong>ركن المعادن النادرة</strong> نقدم لك سبائك الذهب بأعلى معايير النقاء، معتمدة دولياً، وبأسعار تنافسية تناسب المستثمرين والتجار.</p>
          </div>
          <div className="bullion-header-right">
            <div className="stats-card">
              <div className="stats-icon"><i className="fas fa-chart-line"></i></div>
              <div className="stats-number">+25%</div>
              <div className="stats-text">نمو قيمة الذهب خلال 2026</div>
            </div>
          </div>
        </div>

        <div className="bullion-showcase">
          <div className="showcase-card main-card">
            <div className="showcase-icon"><h3><i className="fas fa-cubes"></i> سبائك بيع بالجملة</h3></div>
            <p>نوفر سبائك الذهب بوزن 1 جرام حتى 1 كيلو، بكميات تناسب التجار والمستثمرين. شحن آمن وتوصيل لجميع مدن المملكة.</p>
            <div className="showcase-features">
              <span><i className="fas fa-check-circle"></i> معتمدة من هيئة السوق المالية</span>
              <span><i className="fas fa-check-circle"></i> ختم ووزن دقيق</span>
              <span><i className="fas fa-check-circle"></i> تسليم فوري للكميات الكبيرة</span>
            </div>
            <a href="#" className="showcase-btn">اطلب عرض جملة <i className="fas fa-arrow-left"></i></a>
          </div>

          <div className="bullion-grid">
            {bullionItems.map(item => (
              <div key={item.id} className="bullion-item">
                <div className="bullion-img"><i className={`fas ${item.icon}`}></i></div>
                <div className="bullion-details">
                  <h4>{item.name}</h4>
                  <p>{item.desc}</p>
                  <div className="bullion-meta">
                    <span><i className="fas fa-weight-scale"></i> {item.weight}</span>
                    <span><i className="fas fa-certificate"></i> عيار 24</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bullion-cta">
          <div className="cta-content">
            <i className="fas fa-handshake"></i>
            <p>نحن في <strong>ركن المعادن النادرة</strong> نوفر لك الذهب الصافي بأفضل الأسعار، مع خدمة عملاء متخصصة في قطاع الجملة والاستثمار.</p>
            <span className="cta-note">تواصل معنا لمعرفة أسعار الجملة اليومية</span>
            <div className="cta-buttons">
              <a href="#" className="cta-btn gold">واتساب للجملة <i className="fab fa-whatsapp"></i></a>
              <a href="#" className="cta-btn outline">اطلب سبيكة <i className="fas fa-arrow-left"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BullionSection