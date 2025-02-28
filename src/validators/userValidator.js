function isValidIsraeliID(id) {
    if (!/^\d{9}$/.test(id)) return false;
    
    const digits = id.split('').map(Number);
    let sum = 0;
    
    for (let i = 0; i < 9; i++) {
      let digit = digits[i];
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) digit = digit - 9;
      }
      sum += digit;
    }
    
    return sum % 10 === 0;
  }
  

  function isValidIsraeliPhone(phone) {
    return /^(05\d)[-\s]?(\d{7})$/.test(phone);
  }
  
  module.exports = {
    isValidIsraeliID,
    isValidIsraeliPhone
  };