// src/services/metalPriceAPI.js

import axios from 'axios';

// API KEY (Massive)
const API_KEY = 'GKojmzrGrPa4KwHeS8xRz2UUwK5_jisJ';

// Massive endpoint
const BASE_URL = 'https://api.massive.com/v2/aggs/ticker';

// Ounce → Gram
const OUNCE_TO_GRAM = 31.1035;

// متغير لتخزين آخر الأسعار لحساب نسبة التغيير
let lastGoldPrice = null;
let lastSilverPrice = null;

// ===============================
// جلب سعر الصرف (USD → SAR)
// ===============================
const getUsdToSar = async () => {
  const res = await axios.get(
    'https://open.er-api.com/v6/latest/USD'
  );
  return res.data.rates.SAR;
};

// ===============================
// حساب نسبة التغيير
// ===============================
const calculateChangePercent = (currentPrice, lastPrice) => {
  if (!lastPrice || lastPrice === 0) return null;
  const change = ((currentPrice - lastPrice) / lastPrice) * 100;
  return change.toFixed(2);
};

// ===============================
// جلب أسعار المعادن
// ===============================
export const fetchMetalPrices = async () => {

  try {
    // جلب سعر الصرف الحقيقي
    const usdToSar = await getUsdToSar();

    // جلب الذهب
    const goldResponse = await axios.get(
      `${BASE_URL}/C:XAUUSD/prev`,
      {
        params: { apiKey: API_KEY }
      }
    );

    // جلب الفضة
    const silverResponse = await axios.get(
      `${BASE_URL}/C:XAGUSD/prev`,
      {
        params: { apiKey: API_KEY }
      }
    );

    console.log('Gold:', goldResponse.data);
    console.log('Silver:', silverResponse.data);

    // استخراج السعر
    const goldPerOunceUSD = goldResponse.data?.results?.[0]?.c || 0;
    const silverPerOunceUSD = silverResponse.data?.results?.[0]?.c || 0;

    if (!goldPerOunceUSD || !silverPerOunceUSD) {
      throw new Error('لم يتم العثور على الأسعار');
    }

    // حساب نسبة التغيير للذهب
    const goldChangePercent = calculateChangePercent(goldPerOunceUSD, lastGoldPrice);
    // حساب نسبة التغيير للفضة
    const silverChangePercent = calculateChangePercent(silverPerOunceUSD, lastSilverPrice);

    // تحديث آخر الأسعار للمرة القادمة
    lastGoldPrice = goldPerOunceUSD;
    lastSilverPrice = silverPerOunceUSD;

    // الذهب (تحويل جرام + عيارات)
    const goldPerGramUSD = goldPerOunceUSD / OUNCE_TO_GRAM;

    const carat24 = (goldPerGramUSD * usdToSar).toFixed(2);
    const carat22 = (goldPerGramUSD * (22 / 24) * usdToSar).toFixed(2);
    const carat21 = (goldPerGramUSD * (21 / 24) * usdToSar).toFixed(2);
    const carat18 = (goldPerGramUSD * (18 / 24) * usdToSar).toFixed(2);

    const ounceGoldSAR = (goldPerOunceUSD * usdToSar).toFixed(2);
    const ounceGoldUSD = goldPerOunceUSD.toFixed(2);

    // الفضة
    const silverPerGramUSD = silverPerOunceUSD / OUNCE_TO_GRAM;
    const silverPerGramSAR = (silverPerGramUSD * usdToSar).toFixed(2);
    const ounceSilverSAR = (silverPerOunceUSD * usdToSar).toFixed(2);
    const ounceSilverUSD = silverPerOunceUSD.toFixed(2);

    // النتيجة النهائية
    return {
      success: true,
      prices: {
        carat18,
        carat21,
        carat22,
        carat24,
        ounceGold: ounceGoldSAR,
        ounceGoldUSD,
        ounceSilver: ounceSilverSAR,
        ounceSilverUSD,
        silverPerGram: silverPerGramSAR,
        usdToSar: usdToSar.toFixed(4),
        goldChangePercent,
        silverChangePercent
      }
    };

  } catch (error) {
    console.error(
      'خطأ في جلب الأسعار:',
      error.response?.data || error.message
    );

    return {
      success: false,
      error: error.message
    };
  }
};