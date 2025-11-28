const express = require('express');
const router = express.Router();

const Flight = require('../models/Flight');
const Ticket = require('../models/Ticket');

// POST (create flight)
router.post('/', async (req, res) => {
    console.log(req.body);
    const seatsCount = req.body.totalSeats; 

    const seats = [];
    for (let i = 1; i <= seatsCount; i++) {
        const seatNumber = `Seat${i}`;
        const seatType = i <= 12 ? 'business' : 'economy'; 
        seats.push({
            seatNumber,
            seatType,
            isReserved: false,
        });
    }
    
    const flightData = new Flight({
        departureAirport: req.body.departureAirport,
        arrivalAirport: req.body.arrivalAirport,
        departureCountry: req.body.departureCountry,
        destinationCountry: req.body.destinationCountry,
        departureDate: req.body.departureDate,
        totalSeats: req.body.totalSeats,
        seats: seats,
        businessticketPrice: req.body.businessticketPrice,
        economyticketPrice: req.body.economyticketPrice
    });

    try {
    const flightToSave = await flightData.save();
    res.send(flightToSave);
    } catch (err) {
    res.send({ message: err });
  }
});
// GET (get flight by ID)
router.get('/getFlightById/:flightId', async (req, res) => {
  const flightId = req.params.flightId;

  try {
    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.status(200).json(flight);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'An error occurred while fetching flight details' });
  }
});

//GET (available Seats)
router.get('/unreservedSeats/:flightId', async (req, res) => {
  try {
    const flightId = req.params.flightId;
    console.log('this is flightId:', flightId);
    // Find the flight by ID
    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    // Filter unreserved seats
    const unreservedSeats = flight.seats.filter(seat => !seat.isReserved);

    res.json(unreservedSeats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET (get destinationCountry by flightId)
router.get('/destinationCountry/:flightId', async (req, res) => {
  const flightId = req.params.flightId;

  try {
      const flight = await Flight.findById(flightId);

      if (!flight) {
          return res.status(404).json({ message: 'Flight not found' });
      }

      res.status(200).json({ destinationCountry: flight.destinationCountry });
  } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'An error occurred while fetching destination country' });
  }
});

// GET (ticketPrice)
router.get('/ticketPrice/:flightId', async (req, res) => {
  const { flightId } = req.params;

  try {
    // Find the flight document by flightId
    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    // Extract the businessticketPrice and economyticketPrice
    const businessticketPrice = flight.businessticketPrice;
    const economyticketPrice = flight.economyticketPrice;

    res.status(200).json({ businessticketPrice, economyticketPrice });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'An error occurred while fetching flight details' });
  }
});

//GET (flight by departureDate and departureCountry and destinationCountry)
router.get('/:departureDate/:destinationCountry/:departureCountry', async (req, res) => {
    
    const { departureDate, destinationCountry, departureCountry } = req.params;

    const startDate = new Date(departureDate);
    startDate.setUTCHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setUTCDate(endDate.getUTCDate() + 1);

    try {
        const flights = await Flight.find({
            departureDate: {
                $gte: startDate,
                $lt: endDate
            },
            departureCountry: departureCountry,
            destinationCountry: destinationCountry
        });

        res.status(200).send(flights);
    } catch (err) {
        res.status(500).send({ message: 'An error occurred while fetching flights.' });
    }
});

//GET (search flights by departureCountry and departureDate)
router.get('/:departureCountry/:departureDate', async (req, res) => {
  const { departureCountry, departureDate } = req.params;
  
  const selectedDate = new Date(departureDate);
  const startDate = new Date(selectedDate);
  startDate.setUTCHours(0, 0, 0, 0);
  console.log('this is departureCountry and departureDate:', departureCountry, departureDate);
  const endDate = new Date(startDate);
  endDate.setUTCDate(endDate.getUTCDate() + 1);
  console.log('this is startDate and endDate:', startDate, endDate);
  try {
      const flights = await Flight.find({
        departureCountry: departureCountry,
          departureDate: {
              $gte: startDate,
              $lt: endDate
          }
      });

      res.status(200).send(flights);
  } catch (err) {
      res.status(500).send({ message: 'An error occurred while fetching flights.' });
  }
});


//GET (read all)
router.get('/', async (req,res) =>{
    
    try{
        const flights = await Flight.find();
        res.send(flights);
    }catch(err){
        res.send({message:err})
    }
});
//GET (seat price)
router.get('/:flightId/seats/:seatNumber/price', async (req, res) => {
  const flightId = req.params.flightId;
  const seatNumber = req.params.seatNumber;

  try {
    // Find the flight with the given flight ID
    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    // Find the seat with the given seat number
    const seat = flight.seats.find((seat) => seat.seatNumber === seatNumber);

    if (!seat) {
      return res.status(404).json({ message: 'Seat not found' });
    }

    // Get the price based on the seat type
    const price = seat.seatType === 'business' ? flight.businessticketPrice : flight.economyticketPrice;

    res.json({ price });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST (reserve seats based on tickets for a flight)
router.post('/reserveSeats', async (req, res) => {
  const flightId = req.body.flightId;

  try {
      const flight = await Flight.findById(flightId);

      if (!flight) {
          return res.status(404).json({ message: 'Flight not found' });
      }

      const tickets = await Ticket.find({ flightId });

      if (tickets.length === 0) {
          return res.status(404).json({ message: 'No tickets found for this flight.' });
      }

      const reservedSeats = [];

      for (const ticket of tickets) {
          const seat = flight.seats.find(seat => seat.seatNumber === ticket.seatNumber);

          if (!seat) {
              return res.status(404).json({ message: `Seat ${ticket.seatNumber} not found` });
          }
          seat.isReserved = true;
          reservedSeats.push(seat.seatNumber);
      }

      await flight.save();

      res.json({ message: 'Seats reserved based on tickets successfully', reservedSeats });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});
//GET (flights after the current date)
router.get('/upcoming', async (req, res) => {
  try {
      const currentDate = new Date();
      
      const upcomingFlights = await Flight.find({
          departureDate: {
              $gte: currentDate
          }
      });

      res.status(200).send(upcomingFlights);
  } catch (err) {
      res.status(500).send({ message: 'An error occurred while fetching upcoming flights.' });
  }
});

//PATCH (Update)
router.patch('/:flightId', async(req,res)=>{
  try {
      const updateFlightById = await Flight.updateOne(
          {_id:req.params.flightId},
          {$set:
              {
                departureAirport: req.body.departureAirport,
                arrivalAirport: req.body.arrivalAirport,
                departureCountry: req.body.departureCountry,
                destinationCountry: req.body.destinationCountry,
                departureDate: req.body.departureDate,
                totalSeats: req.body.totalSeats,
                businessticketPrice: req.body.businessticketPrice,
                economyticketPrice: req.body.economyticketPrice
              }
          }
      )
      res.send(updateFlightById)
  } catch (err) {
      res.send({message:err})
      
  }
});

// DELETE (delete user)
router.delete('/deleteFlight/:flightId', async (req, res) => {
  try {
    const deleteFlightByID = await Flight.deleteOne({ _id: req.params.flightId });
    res.send(deleteFlightByID);
  } catch (err) {
      res.status(500).send({ message: err });
  }
});
module.exports = router