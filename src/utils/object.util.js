export const pick = (object, props) => {
  object = Object(object);
  return props.reduce((result, key) => {
    if (key in object) {
      result[key] = object[key];
    }
    return result;
  }, {});
};
