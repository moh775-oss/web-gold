import { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import JewelrySection from './components/JewelrySection'
import PriceTicker from './components/PriceTicker'
import BullionSection from './components/BullionSection'
import GallerySection from './components/GallerySection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import CustomerReviews from './components/CustomerReviews'
import { App as AntdApp } from 'antd'


function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* شاشة الترحيب تكون أول شي - تغطي كل الصفحة */}
      {showSplash && <SplashScreen />}
      
      {/* باقي المحتوى يظهر تحت شاشة الترحيب، وبعد ما تختفي يبان */}
      <div style={{ 
        opacity: showSplash ? 0 : 1, 
        visibility: showSplash ? 'hidden' : 'visible',
        transition: 'opacity 0.5s ease'
      }}>
         <AntdApp>
 <Navbar />
        <PriceTicker />
        <Hero />
        <JewelrySection />
        <BullionSection />
        <GallerySection />
        <CustomerReviews />
        <ContactSection />
        <Footer />

         </AntdApp>
       
      </div>
    </>
  )
}

export default App