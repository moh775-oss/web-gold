// src/services/metalPriceAPI.js
import axios from 'axios';

// GoldAPI Token
const GOLD_API_TOKEN = 'goldapi-65a978573b2351888a86ceef54d030cf-io';
const GOLD_API_URL = 'https://www.goldapi.io/api';

// Ounce → Gram
const OUNCE_TO_GRAM = 31.1035;

let lastGoldPrice = null;
let lastSilverPrice = null;

const getUsdToSar = async () => {
  const res = await axios.get('https://open.er-api.com/v6/latest/USD');
  return res.data.rates.SAR;
};

const calculateChangePercent = (currentPrice, lastPrice) => {
  if (!lastPrice || lastPrice === 0) return null;
  const change = ((currentPrice - lastPrice) / lastPrice) * 100;
  return change.toFixed(2);
};

const getGoldPrice = async () => {
  const response = await axios.get(`${GOLD_API_URL}/XAU/USD`, {
    headers: {
      'x-access-token': GOLD_API_TOKEN,
      'Content-Type': 'application/json'
    }
  });
  return response.data.price;
};

const getSilverPrice = async () => {
  const response = await axios.get(`${GOLD_API_URL}/XAG/USD`, {
    headers: {
      'x-access-token': GOLD_API_TOKEN,
      'Content-Type': 'application/json'
    }
  });
  return response.data.price;
};

export const fetchMetalPrices = async () => {
  try {
    const usdToSar = 3.72881;
    const [goldPerOunceUSD, silverPerOunceUSD] = await Promise.all([
      getGoldPrice(),
      getSilverPrice()
    ]);



    if (!goldPerOunceUSD || !silverPerOunceUSD) {
      throw new Error('لم يتم العثور على الأسعار');
    }

    // حساب نسبة التغيير
    const goldChangePercent = calculateChangePercent(goldPerOunceUSD, lastGoldPrice);
    const silverChangePercent = calculateChangePercent(silverPerOunceUSD, lastSilverPrice);

    lastGoldPrice = goldPerOunceUSD;
    lastSilverPrice = silverPerOunceUSD;

    // المعادلة الصحيحة:
    // سعر الجرام = سعر الأونصة بالدولار ÷ 31.1035 × سعر الصرف
    
    const goldPerGramSAR = (goldPerOunceUSD / OUNCE_TO_GRAM) * usdToSar;
    
    // عيار 24 = سعر الجرام
    const carat24 = goldPerGramSAR.toFixed(2);
    
    // العيارات الأخرى = عيار 24 × (العيار / 24)
    const carat22 = (goldPerGramSAR * (22 / 24)).toFixed(2);
    const carat21 = (goldPerGramSAR * (21 / 24)).toFixed(2);
    const carat18 = (goldPerGramSAR * (18 / 24)).toFixed(2);
    
    // سعر الأونصة بالريال
    const ounceGoldSAR = (goldPerOunceUSD * usdToSar).toFixed(2);
    const ounceGoldUSD = goldPerOunceUSD.toFixed(2);

    // الفضة
    const silverPerGramSAR = (silverPerOunceUSD / OUNCE_TO_GRAM) * usdToSar;
    const ounceSilverSAR = (silverPerOunceUSD * usdToSar).toFixed(2);
    const ounceSilverUSD = silverPerOunceUSD.toFixed(2);



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
        silverPerGram: silverPerGramSAR.toFixed(2),
        usdToSar: usdToSar.toFixed(4),
        goldChangePercent,
        silverChangePercent
      }
    };

  } catch (error) {

    return {
      success: false,
      error: error.message
    };
  }
};