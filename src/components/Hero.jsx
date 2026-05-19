import React from 'react'

const Hero = () => {
  const scrollToNext = () => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })

  return (
    <section className="hero" id="home">
      <div className="hero-bg" style={{ backgroundImage: "url('/src/assets/images/1777378521701.png')" }}></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">ركن <span>المعادن النادرة</span></h1>
        <div className="divider"></div>
        <p className="hero-description">
          حيث تتجسد الفخامة في كل قطعة ذهبية. نقدم لكم أرقى المشغولات الذهبية المصممة بعناية،
          والسبائك النقية بأعلى معايير الجودة. خبرة تمتد لأكثر من عقدين في عالم الذهب والمعادن النفيسة،
          نضمن لكم الأصالة والثقة في كل تفصيلة.
        </p>
        <div className="hero-btns">
          <a href="#" className="btn-gold">تسوق الآن <i className="fas fa-gem"></i></a>
          <a href="#" className="btn-outline">اكتشف المزيد <i className="fas fa-arrow-left"></i></a>
        </div>
      </div>
      <div className="scroll-indicator" onClick={scrollToNext}>
        <span>اسفل</span>
        <i className="fas fa-chevron-down"></i>
      </div>
    </section>
  )
}

export default Hero