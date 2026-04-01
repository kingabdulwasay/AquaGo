const { v4: uuidv4 } = require('uuid');

const drivers = [];  // In-memory array to store drivers

class Driver {
  constructor(fullName, carModel, license) {
    this.id = uuidv4();
    this.fullName = fullName;
    this.carModel = carModel;
    this.license = license;
    this.status = 'Pending';
    this.createdAt = new Date();
  }

  // Save driver
  save() {
    drivers.push(this);
  }
}

module.exports = Driver;
