const express = require('express');
const router = express.Router();

const Transaction = require('../models/Transaction');

// POST (create transaction)
router.post('/', async (req, res) => {
    console.log(req.body);
    const transactionData = new Transaction({
        userId: req.body.userId,
        ticketsIds: req.body.ticketsIds,
        uniqueTransactionID: req.body.uniqueTransactionID,
        totalCost: req.body.totalCost,
        discountCode: req.body.discountCode,
        email: req.body.email,
        cardNumber: req.body.cardNumber,
        cardType: req.body.cardType       
    });

    try {
    const transactionToSave = await transactionData.save();
    console.log(transactionToSave);
    res.send(transactionToSave);
    } catch (err) {
    res.send({ message: err });
  }
});

//GET (read all)
router.get('/', async (req,res) =>{
    
    try{
        const transactions = await Transaction.find();
        res.send(transactions);
    }catch(err){
        res.send({message:err})
    }
});

// Route to get all transactions for a specific user
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const transactions = await Transaction.find({ userId }).populate('ticketsIds');
        res.json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ error: "An error occurred while fetching transactions." });
    }
});
module.exports = router