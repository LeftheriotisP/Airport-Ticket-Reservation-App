const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Ticket = require('../models/Ticket');

// POST (create ticket)
router.post('/', async (req, res) => {
    console.log(req.body);
    const ticketData = new Ticket({
        userId: req.body.userId,
        flightId: req.body.flightId,
        uniqueTransaction: req.body.uniqueTransaction,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthDate: req.body.birthDate,
        idNumber: req.body.idNumber,
        seatNumber: req.body.seatNumber,
        seatClass: req.body.seatClass,
        ticketCost: req.body.ticketCost
    });

    try {
        const ticketToSave = await ticketData.save();
        console.log(ticketToSave);
        res.send(ticketToSave);
    } catch (err) {
        res.send({ message: err });
  }
});

//GET (read all)
router.get('/', async (req,res) =>{
    
    try{
        const tickets = await Ticket.find();
        res.send(tickets);
    }catch(err){
        res.send({message:err})
    }
})
// GET ticket IDs with specific userId and transacitonNumber
router.get('/:userId/:uniqueTransaction', async (req, res) => {
    const { userId, uniqueTransaction } = req.params;

    
    try {
        const ticketIds = await Ticket.find(
            {
                uniqueTransaction: uniqueTransaction,
                userId: userId
            },
            '_id' // Select only the _id field
        );

        const ticketIdArray = ticketIds.map(ticket => ticket._id);

        console.log('searching...');
        res.status(200).send(ticketIdArray);
    } catch (err) {
        res.status(500).send({ message: 'An error occurred while fetching ticket IDs.' });
    }
});

// GET ticket IDs with specific userId and dateOfTicket up to minutes
router.get('/:userId/:dateOfTicket', async (req, res) => {
    const { userId, dateOfTicket } = req.params;

    // Calculate the start and end times for the dateOfTicket minute
    const startDate = new Date(dateOfTicket);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1);
    endDate.setMinutes(59);
    endDate.setSeconds(59);

    try {
        const ticketIds = await Ticket.find(
            {
                dateOfTicket: {
                    $gte: startDate,
                    $lt: endDate
                },
                userId: userId
            },
            '_id' // Select only the _id field
        );

        const ticketIdArray = ticketIds.map(ticket => ticket._id);

        console.log('searching...');
        res.status(200).send(ticketIdArray);
    } catch (err) {
        res.status(500).send({ message: 'An error occurred while fetching ticket IDs.' });
    }
});
// GET ticket by ID
router.get('/:ticketId', async (req, res) => {
    const { ticketId } = req.params;
    try {
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).send({ message: 'Ticket not found.' });
        }
        res.status(200).send(ticket);
    } catch (err) {
        res.status(500).send({ message: 'An error occurred while fetching the ticket.' });
    }
});

module.exports = router