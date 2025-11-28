const express = require('express')
const router = express.Router()

const session = require('express-session');
const uuid = require('uuid');

const User = require('../models/User');

//Configure session
router.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, 
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, 
    },
}));

//POST (sign up) 
router.post('/', async (req,res) =>{
  console.log(req.body);

  const userData = new User({
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      username:req.body.username,
      password:req.body.password,
      tel:req.body.tel,
      trait: "user",  
      uuid: uuid.v4() //Generate unique id with UUID
  });

  try {
      const userToSave = await userData.save();
      res.send(userToSave);
    //  req.session.user = userToSave;
    //  console.log('Session user:',userToSave);
  } catch (err) {
      res.send({message:err});
      
  }
});

// POST (sign-in)
router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username: username, password: password });
      if (user) {
        // User found, authentication successful
        
        req.session.user = user; // Save the user object in the session
        req.session.userId = user._id;
        // Store userId in sessionStorage
        
        
        console.log('User signed in:', user);
      
        if (user.trait === 'user') {
          res.status(200).json({ success: true, message: 'Authentication successful', redirect: 'user_homepage.html', userId: user._id });
        } else if (user.trait === 'admin') {
          res.status(200).json({ success: true, message: 'Authentication successful', redirect: 'admin_homepage.html', userId: user._id });
        } else {
          res.status(200).json({ success: true, message: 'Authentication successful', redirect: 'homepage.html', userId: user._id });
        }
      } else {
        // No user found, authentication failed
        res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
});

// PATCH (Add discount code to user)
router.patch('/addDiscountCode/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const discountCode = req.body.discountCode;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { discountCode: discountCode } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Discount code added to user successfully', user: updatedUser });
  } catch (error) {
    console.error('Error adding discount code:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//GET (check discountCode)
router.get('/checkDiscountCode/:userId/:discountCode', async (req, res) => {
  try {
    const userId = req.params.userId;
    const discountCode = req.params.discountCode;

    // Find the user by user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ isValid: false, message: 'User not found' });
    }

    // Compare the provided discount code with the one in the user's file
    if (user.discountCode === discountCode) {
      return res.status(200).json({ isValid: true, message: 'Discount code matches' });
    } else {
      return res.status(200).json({ isValid: false, message: 'Discount code does not match' });
    }
  } catch (error) {
    console.error('Error checking discount code:', error);
    res.status(500).json({ isValid: false, message: 'Internal server error' });
  }
});
// DELETE (delete user's discount code)
router.delete('/deleteDiscountCode/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $unset: { discountCode: '' } }, // Remove the discountCode field
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Discount code deleted successfully', user: updatedUser });
  } catch (error) {
    console.error('Error deleting discount code:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//GET (user trait)
  router.get('/trait/:username', async (req, res) => {
      try {
        const user = await User.findOne({ username: req.params.username });
        if (user) {
          const trait = user.trait;
          res.send({ trait });
        } else {
          res.status(404).send({ message: 'User not found' });
        }
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
  });
  //POST (sign out)
  router.post('/signout', (req, res) => {
      req.session.destroy(err => {
        if (err) {
          res.status(500).json({ success: false, message: 'Error destroying session' });
        } else {
          // Clear the session from the client's browser
          res.clearCookie('session');
          console.log('Session destroyed'); // Log session destroyed in the terminal
          res.status(200).json({ success: true, message: 'Session destroyed', redirect: 'homepage.html' });
    
        }
      });
  });

  //GET (read all)
  router.get('/', async (req,res) =>{
      
      try{
          const users = await User.find()
          res.send(users)
      }catch(err){
          res.send({message:err})
      }
  })

  //GET (read userID)
  router.get('/:userId', async(req,res)=>{
      try{
          const userById = await User.findById(req.params.userId)
          res.send(userById)
      }catch(err){
          res.send({message:err})
      }
  })

//PATCH (Update)
router.patch('/:userID', async(req,res)=>{
    try {
        const updateUserByID = await User.updateOne(
            {_id:req.params.userID},
            {$set:
                {
                  firstname:req.body.firstname,
                  lastname:req.body.lastname,
                  tel:req.body.tel
                }
            }
        )
        res.send(updateUserByID)
    } catch (err) {
        res.send({message:err})
        
    }
})

  // GET (users with the trait "user")
  router.get('/userByLastname/:lastname', async (req, res) => {
    try {
      const userByLastname = await User.find({ lastname:req.params.lastname });
      res.json(userByLastname);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  });

  // GET (users with the trait "user")
  router.get('/traitUser', async (req, res) => {
    try {
      const traitUser = await User.find({ trait: 'user' });
      res.json(traitUser);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  });

// DELETE (delete user)
router.delete('/deleteUser/:userId', async (req, res) => {
  try {
    const deleteUserByID = await User.deleteOne({ _id: req.params.userId });
    res.send(deleteUserByID);
  } catch (err) {
      res.status(500).send({ message: err });
  }
});

//GET (search users based on input and return all users with this input anywhere in their information)
router.get('/searchUsers/:input', async (req, res) => {
  try {
    const input = req.params.input;

    const usersMatchingInput = await User.find({
      $or: [
        { firstname: { $regex: input, $options: 'i' } }, 
        { lastname: { $regex: input, $options: 'i' } },  
        { username: { $regex: input, $options: 'i' } },  
        { tel: { $regex: input, $options: 'i' } },       
        { trait: { $regex: input, $options: 'i' } }      
      ]
    });

    res.json(usersMatchingInput);
  } catch (error) {
    res.status(500).json({ message: 'Error searching users', error: error.message });
  }
});

  //GET (count users in db)
  router.get('/count/userCount', async (req, res) => {
    try {
      const userCount = await User.countDocuments();
      res.json({ count: userCount });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user count', error: error.message });
    }
  });

  module.exports = router