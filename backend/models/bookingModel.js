const mongoose = require('mongoose');

// Center Schema
const centerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  sports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport'
  }]
});

const Center = mongoose.model('Center', centerSchema);

// Sport Schema
const sportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  center: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
    required: true
  },
  courts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Court'
  }]
});

const Sport = mongoose.model('Sport', sportSchema);

// Court/Resource Schema
const courtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
    required: true
  },
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }]
});

const Court = mongoose.model('Court', courtSchema);

// Booking Schema
const bookingSchema = new mongoose.Schema({
  court: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Court',
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = {
  Center,
  Sport,
  Court,
  Booking
};
