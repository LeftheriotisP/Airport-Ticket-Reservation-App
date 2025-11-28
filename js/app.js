const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRoute = require('./routes/users');
const flightsRoute = require('./routes/flights');
const ticketsRoute = require('./routes/tickets');
const transactionsRoute = require('./routes/transactions');
const nodemailer = require('nodemailer');

app.use(cors());
app.use(bodyParser.json());
app.use('/users', usersRoute);
app.use('/flights', flightsRoute);
app.use('/tickets', ticketsRoute);
app.use('/transactions', transactionsRoute);
app.use(express.static('SkyAirlines/html'));



const MURL ='mongodb+srv://student:1234@cluster0.vnybknh.mongodb.net/myFirstDB?retryWrites=true&w=majority'

const transporter = nodemailer.createTransport({
  service: 'Outlook', 
  auth: {
    user: 'testuser',
    pass: 'testpass',
  },
});
app.use(express.json());


app.post('/send-email', (req, res) => {
  const { recipient, subject, text, htmlContent } = req.body;

  const mailOptions = {
    from: 'testuser',
    to: recipient,
    subject: subject,
    text: text,
    html: htmlContent,
  };
  console.log('sending email...');
  console.log('this is mailOptions:',mailOptions);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email: ', error);
    } else {
      console.log('Email sent: ', info.response);
    }
  });
});

async function connectToMongoDB() {
  try {
    await mongoose.connect(MURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
          console.log('Your MongoDB connector is on...');  
        } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}
  connectToMongoDB().then(() => {
    app.listen(3000, () => {
      console.log('Your server is up and running...');
    });
  });



