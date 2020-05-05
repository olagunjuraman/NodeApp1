const express = require('express');
const Joi = require('joi');
const Rental = require('../../Rentals');
const Customer = require('../../User');
const Movie = require('../../Movie');
const auth = require('../middleware/auth');


const router = express.Router();

router.get('/', async(req, res) => {
    try{
        const rental =  await  Rental.find().sort('movie');
        res.send(rental);
    }
    catch(err){
        res.status(400).send('Movie not found ', err);
    }
 
});


router.post('/', auth, async(req, res) => {
    const {error} = validateRental(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById({_id: req.body.customerId});
    if(!customer) return res.status(404).send('customer with the given id not found');

    const movie = await Movie.findById({_id: req.body.movieId});
    if(!movie) return res.status(404).send('movie not found');

    
    const rental = new Rental({
        movie: req.body.movieId,
        customer : req.body.customerId
    });
    try{
        const rental =  await rental.save();
        res.send(rental);
    }
    catch(error){
        res.status(404).send(err);
    }

})


function validateRental(rental){
    const schema = {
    movieId : Joi.string().required(),
    customerId: Joi.string().required() 
    }

    Joi.validate(rental, schema )
}