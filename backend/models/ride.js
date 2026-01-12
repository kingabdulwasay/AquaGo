const { v4: uuidv4 } = require('uuid');

const rides = [];  // In-memory array to store rides

class Ride {
  constructor(userId, pickup, dropoff, rideType, fare) {
    this.id = uuidv4();
    this.userId = userId;
    this.pickup = pickup;
    this.dropoff = dropoff;
    this.rideType = rideType || 'Standard';
    this.fare = fare;
    this.status = 'Requested';
    this.createdAt = new Date();
  }

  // Save ride
  save() {
    rides.push(this);
  }

  // Find rides by userId
  static find(query) {
    return rides.filter(ride => ride.userId === query.userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
}

module.exports = Ride;
