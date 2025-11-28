const mongoose = require('mongoose');

const FlightSchema = mongoose.Schema(
  {
    
    departureAirport: {
      type: String,
      required: true,
    },
    arrivalAirport: {
      type: String,
      required: true,
    },
    departureCountry: {
      type: String,
      required: true,
    },
    destinationCountry: {
      type: String,
      required: true,
    },
    departureDate: {
      type: Date,
      required: true,
    },
    totalSeats: {
        type: String,
        required: true
    },
    seats: [
      {
        seatNumber: {
          type: String,
          required: true,
        },
        seatType: {
          type: String,
          enum: ['business', 'economy'],
          required: true,
        },
        isReserved: {
          type: Boolean,
          default: false,
        },
      },
    ],
    businessticketPrice: {
      type: Number,
      required: true,
    },
    economyticketPrice: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false, // disable __v field
  }
);

module.exports = mongoose.model('flights', FlightSchema);
