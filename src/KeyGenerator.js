let key = 0;
const keyGenerator = prefix => {
  key += 1;
  return `${prefix}${key}`;
};

export default keyGenerator;
