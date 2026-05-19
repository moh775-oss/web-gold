import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// جلب الآراء
export const fetchReviews = async () => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('خطأ في جلب الآراء:', error);
    return [];
  }
  return data;
};

// إضافة رأي جديد
export const addReview = async (customerName, reviewText, rating) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert([
      {
        customer_name: customerName,
        review_text: reviewText,
        rating: rating
      }
    ])
    .select();

  if (error) {
    console.error('خطأ في إضافة الرأي:', error);
    return { success: false, error: error.message };
  }
  return { success: true, data };
};