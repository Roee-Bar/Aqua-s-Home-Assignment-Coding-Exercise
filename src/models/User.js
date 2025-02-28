const { isValidIsraeliID, isValidIsraeliPhone } = require('../validators/userValidator');

class User {
  constructor(id, name, phone, address) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.address = address;
  }


  isValid() {
    return isValidIsraeliID(this.id) && isValidIsraeliPhone(this.phone);
  }


  toJSON() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      address: this.address
    };
  }


  static fromJSON(data) {
    return new User(data.id, data.name, data.phone, data.address);
  }
}

module.exports = User;