const { isValidIsraeliID, isValidIsraeliPhone } = require('../validators/userValidator');

class User {
  constructor(id, name, phone, address) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.address = address;
  }

  /**
   * Checks if the user is valid
   * @returns {boolean} - Whether the user is valid
   */
  isValid() {
    return isValidIsraeliID(this.id) && isValidIsraeliPhone(this.phone);
  }

  /**
   * Converts user object to JSON format
   * @returns {Object} - JSON object
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      address: this.address
    };
  }

  /**
   * Creates a User object from JSON data
   * @param {Object} data - User data in JSON
   * @returns {User} - New User object
   */
  static fromJSON(data) {
    return new User(data.id, data.name, data.phone, data.address);
  }
}

module.exports = User;