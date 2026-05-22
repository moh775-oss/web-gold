// src/services/priceDatabaseService.js
import { supabase } from './supabase';

// أوقات التحديث الثابتة (بالساعات)
const UPDATE_SCHEDULE = [8, 16, 24]; // 8 صباحاً، 4 عصراً، 12 منتصف الليل

// جلب آخر الأسعار المخزنة
export const getLatestStoredPrices = async () => {
  const { data, error } = await supabase
    .from('gold_prices')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
  
    return null;
  }
  return data?.[0] || null;
};

// جلب تاريخ آخر تحديث
export const getLastUpdateTime = async () => {
  const latest = await getLatestStoredPrices();
  return latest?.created_at ? new Date(latest.created_at) : null;
};

// التحقق إذا حان وقت تحديث جديد (بناءً على المواعيد الثابتة)
export const shouldUpdateNow = async () => {
  const lastUpdate = await getLastUpdateTime();
  const now = new Date();
  const currentHour = now.getHours();
  
  // إذا ما فيه تحديث سابق => يحتاج تحديث
  if (!lastUpdate) return true;
  
  const lastUpdateHour = lastUpdate.getHours();
  const lastUpdateDate = lastUpdate.getDate();
  const currentDate = now.getDate();
  
  // البحث عن أقرب موعد تحديث لم يتم بعد
  for (const scheduleHour of UPDATE_SCHEDULE) {
    // إذا كان الموعد في نفس اليوم والساعة أكبر من آخر تحديث
    if (currentDate === lastUpdateDate) {
      if (scheduleHour > lastUpdateHour && currentHour >= scheduleHour) {
        return true;
      }
    } 
    // إذا كان يوم جديد
    else if (currentDate > lastUpdateDate) {
      if (currentHour >= scheduleHour) {
        return true;
      }
    }
  }
  
  return false;
};

// كم تبقى من التحديثات اليوم
export const getRemainingUpdatesToday = async () => {
  const lastUpdate = await getLastUpdateTime();
  const now = new Date();
  const currentHour = now.getHours();
  const lastUpdateHour = lastUpdate ? lastUpdate.getHours() : -1;
  const lastUpdateDate = lastUpdate ? lastUpdate.getDate() : -1;
  const currentDate = now.getDate();
  
  let remaining = 0;
  
  for (const scheduleHour of UPDATE_SCHEDULE) {
    // إذا كان اليوم مختلف عن آخر تحديث
    if (currentDate !== lastUpdateDate) {
      if (currentHour >= scheduleHour) {
        remaining++;
      }
    } 
    // نفس اليوم
    else {
      if (scheduleHour > lastUpdateHour && currentHour >= scheduleHour) {
        remaining++;
      }
    }
  }
  
  return remaining;
};

// حفظ الأسعار الجديدة
export const savePricesToDatabase = async (prices) => {
  const { data, error } = await supabase
    .from('gold_prices')
    .insert([{
      carat18: prices.carat18,
      carat21: prices.carat21,
      carat22: prices.carat22,
      carat24: prices.carat24,
      ounceGold: prices.ounceGold,
      ounceGoldUSD: prices.ounceGoldUSD,
      ounceSilver: prices.ounceSilver,
      ounceSilverUSD: prices.ounceSilverUSD,
      silverPerGram: prices.silverPerGram,
      usdToSar: prices.usdToSar,
      goldChangePercent: prices.goldChangePercent,
      silverChangePercent: prices.silverChangePercent,
    }])
    .select();

  if (error) {

    return null;
  }
  return data?.[0] || null;
};