const isEmail = val => {
  let reg = /"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"/;
  let pattern = new RegExp(reg);
   
  return pattern.test(val);
};

module.exports = isEmail; 