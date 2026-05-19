import React from 'react'

const Footer = () => {
  const links = ['home', 'jewelry', 'bullion', 'gallery', 'contact']
  const names = ['الرئيسية', 'المصاغ المشغول', 'الذهب الصافي والجملة', 'المعرض', 'اتصل بنا']

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col">
            <div className="footer-logo">ركن <span>المعادن النادرة</span></div>
            <p className="footer-desc">أرقى المشغولات الذهبية والسبائك النقية في المملكة<br />خبرة تزيد عن 20 عاماً في عالم الذهب والمعادن الثمينة</p>
            <div className="footer-social">
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-snapchat"></i></a>
              <a href="https://wa.me/966567401364"><i className="fab fa-whatsapp"></i></a>
              <a href="#"><i className="fab fa-tiktok"></i></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>روابط سريعة</h4>
            <ul className="footer-links">
              {links.map((link, i) => <li key={link}><a href={`#${link}`}>{names[i]}</a></li>)}
            </ul>
          </div>

          <div className="footer-col">
            <h4>تواصل مباشر</h4>
            <ul className="footer-contact">
             <a href="tel:+966567401364"> <li ><i className="fas fa-phone"></i>966567401364+</li> </a>  
              <a href="https://wa.me/966567401364"><li ><i className="fab fa-whatsapp"></i>966567401364+</li></a>
              <li><i className="fas fa-envelope"></i> info@rarezmetals.sa</li>
              <li><i className="fas fa-map-marker-alt"></i> الرياض - البطحاء الفرعي - حي المرقب</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>ساعات العمل</h4>
            <ul className="footer-hours">
              <li><span>السبت - الخميس:</span> 9 ص - 11 م</li>
              <li><span>الجمعة:</span> 4 م - 11 م</li>
              <li><span>الاستفسار الجملة:</span> 24/7</li>
            </ul>
            <div className="footer-badge"><i className="fas fa-certificate"></i> معتمد من هيئة الذهب السعودية</div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 ركن المعادن النادرة - Rare Metals Focus. جميع الحقوق محفوظة</p>
          <div className="footer-bottom-links">
            <a href="#">سياسة الخصوصية</a>
            <a href="#">الشروط والأحكام</a>
            <a href="#">شحن وإرجاع</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer