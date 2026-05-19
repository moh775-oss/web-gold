// src/services/messageService.js
import { message } from 'antd';

// تهيئة عالمية للرسائل
export const showSuccess = (content, duration = 2) => {
  message.success({
    content: content || 'تمت العملية بنجاح ✓',
    duration: duration,
    style: {
      marginTop: '70px',
      fontSize: '14px',
      fontWeight: 'bold',
      direction: 'rtl'
    }
  });
};

export const showError = (content, duration = 3) => {
  message.error({
    content: content || 'حدث خطأ! ✗',
    duration: duration,
    style: {
      marginTop: '70px',
      fontSize: '14px',
      fontWeight: 'bold',
      direction: 'rtl'
    }
  });
};

export const showWarning = (content, duration = 2) => {
  message.warning({
    content: content || 'تنبيه! ',
    duration: duration,
    style: {
      marginTop: '70px',
      direction: 'rtl'
    }
  });
};

export const showInfo = (content, duration = 2) => {
  message.info({
    content: content || 'معلومة ℹ',
    duration: duration,
    style: {
      marginTop: '70px',
      direction: 'rtl'
    }
  });
};

export const showLoading = (content, duration = 0) => {
  return message.loading({
    content: content || 'جاري المعالجة... ',
    duration: duration,
    style: {
      marginTop: '70px',
      direction: 'rtl'
    }
  });
};