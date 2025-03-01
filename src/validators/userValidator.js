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
  if (!phone) return false;
  
  const digitsOnly = phone.replace(/\D/g, '');
  
  if (digitsOnly.length === 10 && digitsOnly.startsWith('05')) {
    return true;
  }

  if (digitsOnly.startsWith('972')) {
    if (digitsOnly.length === 12 && digitsOnly.charAt(3) === '0' && digitsOnly.charAt(4) === '5') {
      return true;
    } 
    if (digitsOnly.length === 11 && digitsOnly.charAt(3) === '5') {
      return true;
    }
  }
  
  return false;
}

module.exports = {
  isValidIsraeliID,
  isValidIsraeliPhone
};