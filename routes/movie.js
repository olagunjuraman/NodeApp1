const express = require('express');
const _ = require('lodash');
const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async(req, res) =>{
    try{
        const movies = await Movie.find().sort('name');
        res.send(movies);
    }
    catch(err){
        res.status(400).send(err);
    }
  
});


router.get('/:id', async( req, res) =>{
    try{
        const movie = await Movie.findById(req.params.id);
        if(!movie) return res.status(400).send(`Cant find movie with the given ${req.params.id}`);
        res.send(movie);
    }
    catch(err){
        res.status(400).send('something failed');
    }
  
});



router.post('/',  async(req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid Genre');
    
    const movie = new Movie({
        title: req.body.title,
        genre:{
            _id : genre._id,
            name: genre.name
        },

        numberInStock : req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    try{
        const movie = await movie.save();
        res.send(movie);
    }
    catch(err){
        res.status(500).send('something happended');
    }
  
});


router.put('/:id', async(req, res) => {
   const {error} =  validate(movie);
   if(error) return res.status(400).send('Invalid Movie');
   try{
    const movie = await Movie.findByIdAndUpdate
    (req.params.id, _.pick(req.body, ['title', 'genreId', 'numberInStock', 'dailyRentalRate']));
     res.send(movie);
   }
   catch(err){
       res.status(400).send('something went wrong');
   }

});


router.delete('/:id', async(req, res) =>{
    try{
        const movie = Movie.findByIdAndRemove(req.params.id);
        if(!movie) return res.status(400).send(`Movie with the ${req.params.id} was not found`);
        res.send(movie);
    }
    catch(err){
        res.status(500).send('something happended');
    }

});




module.exports = router; 