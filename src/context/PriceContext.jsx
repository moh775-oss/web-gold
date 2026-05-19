import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { cacheService } from '../services/cacheService';
import { fetchMetalPrices } from '../services/metalPriceAPI';

const PriceContext = createContext();
export const usePrices = () => useContext(PriceContext);

export const PriceProvider = ({ children }) => {

  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  const hasLoaded = useRef(false);
  const isFetching = useRef(false);

  const loadPrices = async () => {

    if (isFetching.current) return;
    isFetching.current = true;

    try {

      const cachedData = cacheService.get('metal_prices');

      if (cachedData) {
        console.log(' من الكاش');
        setPrices(cachedData);
        setLoading(false);
        return;
      }

      console.log('🔄 API request');

      const result = await fetchMetalPrices();

      if (result.success) {
        cacheService.set('metal_prices', result.prices, 10);
        setPrices(result.prices);
        setLastUpdate(new Date());
      }

    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };

  const refreshPrices = async () => {
    const result = await fetchMetalPrices();

    if (result.success) {
      cacheService.set('metal_prices', result.prices, 10);
      setPrices(result.prices);
      setLastUpdate(new Date());
    }
  };

  // في PriceProvider - تعديل interval
useEffect(() => {
  if (hasLoaded.current) return;
  hasLoaded.current = true;

  loadPrices(); // أول تحميل

  // تغيير من 10 دقائق إلى 30 ثانية
  const interval = setInterval(() => {
    refreshPrices(); // استخدم refreshPrices بدل loadPrices عشان يجبر التحديث
  }, 60000); // 30 ثانية

  return () => clearInterval(interval);
}, []);

  return (
    <PriceContext.Provider value={{ prices, loading, lastUpdate, refreshPrices }}>
      {children}
    </PriceContext.Provider>
  );
};