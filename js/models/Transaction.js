const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        ticketsIds: [{  //an array of the ticketIds
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tickets', 
            required: true
        }], 
        totalCost: {
            type: Number,
            required: true
        },
        discountCode: { //-10 euro for every ticket
            type: String
        },
        email: {    //user info for transaction
            type: String,
            required: true
        },
        cardType: {
            type:String,
            required: true,
            enum: ['visa', 'mastercard', 'americanExpress']
        },
        cardNumber: {
            type:String,
            required: true
        }
       
      
    },
    {
        versionKey: false // disable __v field
    }
);

module.exports = mongoose.model('transactions', TransactionSchema);
