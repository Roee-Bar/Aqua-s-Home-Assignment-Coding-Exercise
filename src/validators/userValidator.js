/**
 * Validates an Israeli ID number
 * @param {string} id - The ID number to validate
 * @returns {boolean} - Whether the ID is valid
 */
function isValidIsraeliID(id) {
    // Israeli IDs are 9 digits
    if (!/^\d{9}$/.test(id)) return false;
    
    // Check digit calculation
    const digits = id.split('').map(Number);
    let sum = 0;
    
    for (let i = 0; i < 9; i++) {
      let digit = digits[i];
      // For odd positions, multiply by 2 and sum digits
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) digit = digit - 9;
      }
      sum += digit;
    }
    
    return sum % 10 === 0;
  }
  
  /**
   * Validates an Israeli phone number
   * @param {string} phone - The phone number to validate
   * @returns {boolean} - Whether the phone number is valid
   */
  function isValidIsraeliPhone(phone) {
    // Israeli phone formats: 05X-XXXXXXX, 05X XXXXXXX, 05XXXXXXXX
    return /^(05\d)[-\s]?(\d{7})$/.test(phone);
  }
  
  module.exports = {
    isValidIsraeliID,
    isValidIsraeliPhone
  };