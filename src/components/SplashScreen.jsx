import { useEffect } from 'react'


const SplashScreen = () => {
  useEffect(() => {
    document.body.classList.add('splash-active')
    return () => document.body.classList.remove('splash-active')
  }, [])

  return (
    <div className="splash-screen" id="splashScreen">
      <div className="splash-container">
        <div className="splash-logo">
          <img src="/src/assets/images/logonavBar.png" alt="ركن المعادن النادرة" />
        </div>
        <div className="splash-icon">
          <i className="fas fa-gem"></i>
        </div>
        <h1 className="splash-title">ركن <span>المعادن النادرة</span></h1>
        <div className="splash-divider"></div>
        <p className="splash-text">حيث تتجسد الفخامة في كل قطعة ذهبية</p>
        <div className="splash-loader">
          <div className="loader-ring"></div>
        </div>
      </div>
    </div>
  )
}

export default SplashScreen