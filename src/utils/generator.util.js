import slugify from 'slugify';
export const generateSlug = string => {
  return slugify(string, {
    lower: true,
    strict: true,
    locale: 'vi',
    trim: true
  });
};
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
