function isValidIsraeliID(id) {
  if (!id || !Number(id) || id.length !== 9 || isNaN(id)) {
    return false;
  }

  let sum = 0;
  
  for (let i = 0; i < id.length; i++) {
      const incNum = Number(id[i]) * ((i % 2) + 1);
      sum += (incNum > 9) ? incNum - 9 : incNum;
  }
  return (sum % 10 === 0);
}
  

function isValidIsraeliPhone(phone) {
  return /^(05\d)[-\s]?(\d{7})$/.test(phone);
}

module.exports = {
  isValidIsraeliID,
  isValidIsraeliPhone
};