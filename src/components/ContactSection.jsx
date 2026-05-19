import React, { useState } from 'react'

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', subject: '', message: '' })

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.message) {
      alert(' الرجاء تعبئة جميع الحقول')
      return
    }
    const subjectSelect = document.getElementById('contactSubject')
    const subject = subjectSelect?.options[subjectSelect.selectedIndex]?.text || 'استفسار عام'
    const msg = `السلام عليكم،\n استفسار جديد\n الاسم: ${formData.name}\n الجوال: ${formData.phone}\n نوع الاستفسار: ${subject}\n الرسالة: ${formData.message}`
    window.open(`https://wa.me/966567401364?text=${encodeURIComponent(msg)}`, '_blank')
    alert('سيتم تحويلك إلى واتساب')
    setFormData({ name: '', phone: '', subject: '', message: '' })
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <span className="contact-tag"><i className="fas fa-map-pin"></i> تواصل معنا</span>
          <h2 className="contact-title">نحن <span className="gold-text">في انتظارك</span></h2>
          <div className="contact-divider"></div>
          <p className="contact-subtitle">فريق <strong>ركن المعادن النادرة</strong> يخدمك في جميع أيام الأسبوع</p>
        </div>

        <div className="contact-wrapper">
          <div className="contact-info-side">
            <div className="info-card">
              <div className="info-icon"><i className="fas fa-store"></i></div>
              <h3>ركن المعادن النادرة</h3>
              <p className="info-address"><i className="fas fa-location-dot"></i> الرياض - شارع البطحاء الفرعي، حي المرقب<br />المملكة العربية السعودية</p>
              <div className="info-details">
                <div className="info-item"><i className="fas fa-phone-alt"></i><div><strong>هاتف</strong><span>966567401364+</span></div></div>
                <div className="info-item"><i className="fab fa-whatsapp"></i><div><strong>واتساب</strong><span>966553135287+</span></div></div>
                <div className="info-item"><i className="far fa-clock"></i><div><strong>ساعات العمل</strong><span>السبت - الخميس: 9 ص - 11 م<br />الجمعة: 4 م - 11 م</span></div></div>
              </div>
            </div>
            <div className="map-container">
              <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.758667837628!2d46.675103!3d24.735329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f047abf0e9b7d%3A0x9b2c8e9e3a5f2c1!2sKingdom%20Centre!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sar!2ssa" width="100%" height="280" style={{border:0, borderRadius:'24px'}} allowFullScreen loading="lazy"></iframe>
            </div>
          </div>

          <div className="contact-form-side">
            <div className="form-card">
              <div className="form-icon"><i className="fas fa-envelope-open-text"></i></div>
              <h3>أرسل لنا استفسارك</h3>
              <form onSubmit={handleSubmit}>
                <div className="input-group"><i className="fas fa-user"></i><input type="text" placeholder="الاسم الكامل" id="name" value={formData.name} onChange={handleChange} required /></div>
                <div className="input-group"><i className="fas fa-phone"></i><input type="tel" placeholder="رقم الجوال" id="phone" value={formData.phone} onChange={handleChange} required /></div>
                <div className="input-group"><i className="fas fa-tag"></i><select id="subject" value={formData.subject} onChange={handleChange}><option value="">نوع الاستفسار</option><option value="jewelry">مصاغ مشغول (تجزئة)</option><option value="bullion">ذهب صافي - سبائك</option><option value="wholesale">جملة (كميات كبيرة)</option><option value="other">استفسار عام</option></select></div>
                <div className="input-group"><i className="fas fa-message"></i><textarea rows="4" placeholder="اكتب رسالتك هنا..." id="message" value={formData.message} onChange={handleChange} required></textarea></div>
                <button type="submit" className="submit-btn"><i className="fab fa-whatsapp"></i> إرسال عبر واتساب</button>
              </form>
              <p className="form-note"><i className="fas fa-shield-alt"></i> بياناتك آمنة، سنتواصل معك خلال 30 دقيقة</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection