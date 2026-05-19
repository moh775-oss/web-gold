import React, { useState, useEffect } from 'react';
import { usePrices } from '../context/PriceContext';
import iconImg from '../assets/images/logonavBar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons';
import { SaudiRiyal ,DollarSign } from "lucide-react";

const PriceTicker = () => {
  const { prices, loading, lastUpdate, refreshPrices } = usePrices();
  const [updating, setUpdating] = useState(false);
  const [showUSD, setShowUSD] = useState(true); // يبدأ بالدولار

  // تبديل العملة كل 30 ثانية (نص دقيقة)
  useEffect(() => {
    const currencyInterval = setInterval(() => {
      setShowUSD(prev => !prev); // يبدل بين دولار وريال
    }, 10000); // كل 30 ثانية
    
    return () => clearInterval(currencyInterval);
  }, []);

  // تحديث الأسعار كل 30 ثانية
  useEffect(() => {
    if (!refreshPrices) return;
    
    const priceInterval = setInterval(async () => {
      setUpdating(true);
      await new Promise(r => setTimeout(r, 350));
      await refreshPrices();
      setTimeout(() => setUpdating(false), 150);
    }, 10000);
    
    return () => clearInterval(priceInterval);
  }, [refreshPrices]);

  if (loading || !prices) {
    return <div className="price-ticker-wrapper" style={{ textAlign: 'center',  color: 'white', padding: '1rem' }}> جاري التحميل...</div>;
  }

  // عنصر الأونصة - سعر واحد يتغير بين دولار وريال
  const tickerItems = [
      { label: 'عيار 18', priceKey: 'carat18', currency: <SaudiRiyal size={16} /> },
  { label: 'عيار 21', priceKey: 'carat21', currency: <SaudiRiyal size={16} /> },
  { label: 'عيار 22', priceKey: 'carat22', currency: <SaudiRiyal size={16} /> },
  { label: 'عيار 24', priceKey: 'carat24', currency: <SaudiRiyal size={16} /> },
    { 
      label: 'أونصة ذهب', 
      isToggleCurrency: true,  // علامة للتبديل بين العملات
      sarKey: 'ounceGold',
      usdKey: 'ounceGoldUSD',
      showChange: true, 
      changeKey: 'goldChangePercent' 
    },
    { 
      label: 'أونصة فضة', 
      isToggleCurrency: true,
      sarKey: 'ounceSilver',
      usdKey: 'ounceSilverUSD',
      showChange: true, 
      changeKey: 'silverChangePercent' 
    },
  ];

  // عرض نسبة التغيير - مثل منصات التداول
  const renderChange = (percent) => {
    if (!percent) return null;
    const num = parseFloat(percent);
    if (isNaN(num)) return null;
    const isPositive = num >= 0;
    
    // شكل السهم مثل منصات التداول (طالع أو نازل)
   const ArrowIcon = () => (
  <FontAwesomeIcon
    icon={isPositive ? faArrowTrendUp : faArrowTrendDown}
    style={{
      marginLeft: '4px',
      fontSize: '12px'
    }}
  />
);
    
    return (
      <span className={`ticker-change ${isPositive ? 'positive' : 'negative'}`}>
        {Math.abs(num).toFixed(2)}%
        <ArrowIcon />
      </span>
    );
  };

  // الحصول على السعر الحالي حسب العملة المعروضة
  const getCurrentPrice = (item) => {
    if (!item.isToggleCurrency) return null;
    return showUSD ? prices[item.usdKey] : prices[item.sarKey];
  };

  // الحصول على العملة الحالية
 const getCurrentCurrency = (item) => {
  if (!item.isToggleCurrency) return null;
 
  return showUSD ? (
    <DollarSign size={16} strokeWidth={2} />
  ) : (
    <SaudiRiyal size={16} strokeWidth={2} />
  );
};

  return (
    <div className="price-ticker-wrapper">
      <div className="price-ticker-container">
        <div className="ticker-main">
          {/* التسعير الفوري باليسار */}
          <div className="ticker-spot">
            <a href="https://ar.tradingview.com/chart/" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-chart-simple" style={{ fontSize: '22px', display: 'block', marginBottom: '5px' }}></i>
              <span>التسعير الفوري</span>
            </a>
          </div>

          {/* العيارات تتوزع بعرض الشاشة */}
          <div className="ticker-items">
            {tickerItems.map((item, idx) => (
              <React.Fragment key={item.priceKey || item.sarKey}>
                <div className="ticker-item">
                  <div className="ticker-label">{item.label}</div>
                  
                  {/* العناصر العادية (العيارات) */}
                  {!item.isToggleCurrency && (
                    <div className="ticker-price-wrapper">
                      <span className="ticker-price-dot">•</span>
                      <span className={`ticker-price ${updating ? 'updating' : ''}`}>
                        {prices[item.priceKey]}
                      </span>
                      <span className="ticker-currency">{item.currency}</span>
                    </div>
                  )}

                  {/* الأونصة - سعر واحد يتبدل بين دولار وريال */}
                  {item.isToggleCurrency && (
                    <div className="ticker-price-wrapper ounce-wrapper">
  
  <div className="ticker-price-line">
    <span className="ticker-price-dot">•</span>

    <span className={`ticker-price ${updating ? 'updating' : ''}`}>
      {getCurrentPrice(item)}
    </span>

    <span className="ticker-currency">
      {getCurrentCurrency(item)}
    </span>
  </div>

  {item.showChange && (
    <div className="ticker-change-line">
      {renderChange(prices[item.changeKey])}
    </div>
  )}
  
</div>
                  )}
                </div>
                
                {/* أيقونة دائرية بين العيارات */}
                {idx < tickerItems.length - 1 && (
                  <div className="ticker-icon-sep">
                    <img src={iconImg} alt="" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceTicker;