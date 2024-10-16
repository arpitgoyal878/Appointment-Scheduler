const mongoose = require('mongoose');

// Import the models
const { Center, Sport, Court, Booking } = require('../models/bookingModel');

// Sample data for Courts
const courtsData = [
  {
    _id: "651234567890abcdef123456",
    name: "Badminton Court 1",
    sport: "651234567890abcdef123457",
    bookings: []
  },
  {
    _id: "651234567890abcdef123459",
    name: "Badminton Court 2",
    sport: "651234567890abcdef123457",
    bookings: []
  },
  {
    _id: "651234567890abcdef123460",
    name: "Squash Court 1",
    sport: "651234567890abcdef123461",
    bookings: []
  },
  {
    _id: "651234567890abcdef123461",
    name: "Squash Court 2",
    sport: "651234567890abcdef123461",
    bookings: []
  },
  {
    _id: "651234567890abcdef123462",
    name: "Tennis Court 1",
    sport: "651234567890abcdef123463",
    bookings: []
  },
  {
    _id: "651234567890abcdef123463",
    name: "Tennis Court 2",
    sport: "651234567890abcdef123463",
    bookings: []
  }
];

// Sample data for Sports
const sportsData = [
  {
    _id: "651234567890abcdef123457",
    name: "Badminton",
    center: "651234567890abcdef123458",
    courts: ["651234567890abcdef123456", "651234567890abcdef123459"]
  },
  {
    _id: "651234567890abcdef123461",
    name: "Squash",
    center: "651234567890abcdef123458",
    courts: ["651234567890abcdef123460", "651234567890abcdef123461"]
  },
  {
    _id: "651234567890abcdef123463",
    name: "Tennis",
    center: "651234567890abcdef123464",
    courts: ["651234567890abcdef123462", "651234567890abcdef123463"]
  }
];

// Sample data for Centers
const centersData = [
  {
    _id: "651234567890abcdef123458",
    name: "Indiranagar Center",
    location: "Indiranagar, Bangalore",
    sports: ["651234567890abcdef123457", "651234567890abcdef123461"]
  },
  {
    _id: "651234567890abcdef123464",
    name: "Koramangala Center",
    location: "Koramangala, Bangalore",
    sports: ["651234567890abcdef123463"]
  },
  {
    _id: "651234567890abcdef123465",
    name: "Whitefield Center",
    location: "Whitefield, Bangalore",
    sports: ["651234567890abcdef123457", "651234567890abcdef123463"]
  }
];

// Function to load data into MongoDB
const initDB = async () => {
  try {
    // Clear existing data
    console.log("Clearing the Appointments Prod Database...")
    await Center.deleteMany({});
    await Sport.deleteMany({});
    await Court.deleteMany({});
    await Booking.deleteMany({});

    // Insert sample data
    await Center.insertMany(centersData);
    console.log('Centers data loaded');

    await Sport.insertMany(sportsData);
    console.log('Sports data loaded');

    await Court.insertMany(courtsData);
    console.log('Courts data loaded');

    console.log('Sample data loaded successfully');
  } catch (error) {
    console.error('Error loading sample data:', error);
  }
};

// Run the function
module.exports = {initDB};
