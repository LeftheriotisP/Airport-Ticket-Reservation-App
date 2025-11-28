const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        flightId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'flights',
            required: true
        },
        uniqueTransaction: { // unique id for each transaction
            type: String
        },
        firstname: {    //passenger info
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        birthDate: {
            type: Date,
            required: true
        },
        idNumber: {
            type: String,
            required: true
        },
        seatNumber: {   //seat info
            type: String,
            required: true
        },
        seatClass: {
            type: String,
            required: true,
            enum: ['economy', 'business']
        },
        ticketCost: {
            type: Number,
            required: true
        }

       
    },
    {
        versionKey: false // disable __v field
    }
);

module.exports = mongoose.model('tickets', TicketSchema);
