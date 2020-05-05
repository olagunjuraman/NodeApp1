const express = require('express');
const User = require('../../User');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', async(req, res) => {
    const { error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

   let  user =  await User.findOne({email: req.body.email});
   if(!user) return res.status(400).send('Incorrect email or password');

   const validPassword =  await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');

   const token = user.generateAuthToken();
    res.send(token);
});

function validateUser(user){
    const schema = {
        name: Joi.string().min(5).max(255),
        email:Joi.string().min(5).max(255)
    }

    Joi.validate(user, schema);
}


module.exports = router