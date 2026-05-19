import { useState, useEffect, useRef } from 'react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const mobileMenuRef = useRef(null)
  const hamburgerRef = useRef(null)
  const closeMenuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // إغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen) {
        if (mobileMenuRef.current && 
            !mobileMenuRef.current.contains(e.target) &&
            hamburgerRef.current &&
            !hamburgerRef.current.contains(e.target) &&
            closeMenuRef.current &&
            !closeMenuRef.current.contains(e.target)) {
          setMenuOpen(false)
        }
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [menuOpen])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const links = ['home', 'jewelry', 'bullion', 'gallery', 'contact']
  const names = ['الرئيسية', 'المصاغ المشغول', 'الذهب الصافي والجملة', 'المعرض', 'اتصل بنا']

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">
            {/* <img src="/src/assets/images/almass.png" alt="" /> */}
            ركن المعادن النادرة
          </div>
          <ul className="nav-links">
            {links.map((link, i) => (
              <li key={link}>
                <a href={`#${link}`}>{names[i]}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* هامبورجر */}
      <div 
        ref={hamburgerRef}
        className="hamburger" 
        onClick={toggleMenu} 
        style={{ display: menuOpen ? 'none' : 'flex' }}
      >
        <i className="fas fa-bars"></i>
      </div>

      {/* زر الإغلاق - نستخدم style لتجاوز !important */}
      <div 
        ref={closeMenuRef}
        className="close-menu" 
        onClick={toggleMenu} 
        style={{ 
          display: menuOpen ? 'flex' : 'none',
          displayPriority: 'important' // هذا لا يعمل، سنستخدم الطريقة أدناه
        }}
      >
        <i className="fas fa-times"></i>
      </div>

      {/* القائمة المتنقلة */}
      <ul 
        ref={mobileMenuRef}
        className={`mobile-menu ${menuOpen ? 'active' : ''}`}
      >
        {links.map((link, i) => (
          <li key={link}>
            <a href={`#${link}`} onClick={closeMenu}>
              {names[i]}
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Navbar