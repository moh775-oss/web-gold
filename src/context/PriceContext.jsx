// src/context/PriceContext.js
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { cacheService } from '../services/cacheService';
import { fetchMetalPrices } from '../services/metalPriceAPI';
import { 
  getLatestStoredPrices, 
  savePricesToDatabase, 
  shouldUpdateNow,
  getRemainingUpdatesToday,
  getLastUpdateTime
} from '../services/priceDatabaseService';
import { showSuccess, showError, showWarning, showInfo } from '../services/messageService';

const PriceContext = createContext();
export const usePrices = () => useContext(PriceContext);

export const PriceProvider = ({ children }) => {
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [remainingUpdates, setRemainingUpdates] = useState(3);

  const hasLoaded = useRef(false);
  const isFetching = useRef(false);
  const checkInterval = useRef(null);

  // جلب الأسعار من قاعدة البيانات
  const loadPricesFromDB = async () => {
    const stored = await getLatestStoredPrices();
    if (stored) {
      
      setPrices({
        carat18: stored.carat18,
        carat21: stored.carat21,
        carat22: stored.carat22,
        carat24: stored.carat24,
        ounceGold: stored.ounceGold,
        ounceGoldUSD: stored.ounceGoldUSD,
        ounceSilver: stored.ounceSilver,
        ounceSilverUSD: stored.ounceSilverUSD,
        silverPerGram: stored.silverPerGram,
        usdToSar: stored.usdToSar,
        goldChangePercent: stored.goldChangePercent,
        silverChangePercent: stored.silverChangePercent,
      });
      setLastUpdate(new Date(stored.created_at));
      
      const remaining = await getRemainingUpdatesToday();
      setRemainingUpdates(remaining);
      return true;
    }
    return false;
  };

  // تحديث الأسعار من API
  const refreshPrices = async () => {
    if (isFetching.current) return null;
    
    const needUpdate = await shouldUpdateNow();
    if (!needUpdate) {
      const remaining = await getRemainingUpdatesToday();
      
      return null;
    }

    isFetching.current = true;


    const result = await fetchMetalPrices();

    if (result.success) {
      const saved = await savePricesToDatabase(result.prices);
      if (saved) {

        cacheService.set('metal_prices', result.prices, 30);
        setPrices(result.prices);
        setLastUpdate(new Date());
        
        const remaining = await getRemainingUpdatesToday();
        setRemainingUpdates(remaining);
       
        
        isFetching.current = false;
        return result.prices;
      }
    }
    

    isFetching.current = false;
    return null;
  };

  // التحقق الدوري (كل دقيقة) إذا حان وقت التحديث
  const startPeriodicCheck = () => {
    if (checkInterval.current) clearInterval(checkInterval.current);
    
    checkInterval.current = setInterval(async () => {
      const needUpdate = await shouldUpdateNow();
      if (needUpdate && !isFetching.current) {
        
        await refreshPrices();
      }
    }, 60000); // كل دقيقة
  };

  // التحميل الأولي
  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;
    
    const init = async () => {
      setLoading(true);
      
      // جلب من قاعدة البيانات
      const hasDB = await loadPricesFromDB();
      
      // إذا ما فيه بيانات، جلب من API فوراً
      if (!hasDB) {
        await refreshPrices();
      }
      
      setLoading(false);
      startPeriodicCheck();
    };
    
    init();
    
    return () => {
      if (checkInterval.current) clearInterval(checkInterval.current);
    };
  }, []);

  return (
    <PriceContext.Provider value={{ 
      prices, 
      loading, 
      lastUpdate, 
      refreshPrices,
      remainingUpdates 
    }}>
      {children}
    </PriceContext.Provider>
  );
};