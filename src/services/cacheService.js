// src/services/cacheService.js
class CacheService {
  constructor() {
    this.cache = new Map();
    this.isFetching = false;
    this.pendingRequests = [];
  }

  // تخزين بيانات مع وقت صلاحية
  set(key, value, ttlMinutes = 5) {
    this.cache.set(key, {
      value,
      expiry: Date.now() + (ttlMinutes * 60 * 1000)
    });
  }

  // جلب بيانات من الكاش
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    // التحقق من صلاحية البيانات
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  // تنظيف البيانات المنتهية
  cleanup() {
    for (const [key, item] of this.cache.entries()) {
      if (Date.now() > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

// سنجلتون (Singleton) - نسخة واحدة مشتركة لكل التطبيق
export const cacheService = new CacheService();

// تنظيف تلقائي كل دقيقة
setInterval(() => cacheService.cleanup(), 60000);