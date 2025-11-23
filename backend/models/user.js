const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const users = [];  // In-memory array to store users

class User {
  constructor(name, email, phone, password) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.createdAt = new Date();
  }

  // Hash password before saving
  async save() {
    this.password = await bcrypt.hash(this.password, 10);
    users.push(this);
  }

  // Find user by email
  static findOne(query) {
    return users.find(user => user.email === query.email);
  }

  // Compare password
  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }
}

module.exports = User;
