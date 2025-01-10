import slugify from 'slugify';
const generateSlug = string => {
  return slugify(string, {
    lower: true,
    strict: true,
    locale: 'vi',
    trim: true
  });
};

export default generateSlug;
