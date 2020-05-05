const express = require('express');
const {Genre , validate} = require('../models/genre');
const auth = require('../middleware/auth');


const router = express.Router();
router.post('/',   async(req, res, next) =>{

    const {error} = validate(req.body);
    if(error) return res.status(404).send( error.details[0].message);
    try{
        let genre = new Genre({
            name : req.body.name
        });

        genre = await genre.save();
        res.send(genre);
    }
    catch(ex){
        next(ex);
    }

});



router.get('/:id', async(req, res) => {
    try{
        const genre = await Genre.findById(req.params.id);
        if(!genre) return res.status(400).send('Invalid request');
        res.send(genre);
    }
    catch(error){
        res.status(400).send(error);
    }
 
});


router.get('/', async(req, res) => {
    try{
        const genres = await Genre.find().sort({ name: 1});
        if(!genres) return res.status(400).send('invalid request');
        res.send(genres);     
    }
    catch(err){
        res.status(400).send(err);
    }
  
});


router.put('/:id', async(req, res) =>{
    const {error} =  validateGenre(req.body);
    if(error) return res.status(400).string(error.details[0].message);

    try{
        let  genre = await Genre.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
        });
    
        res.send(genre);
    }
    catch(error){
        res.send(error);
    }
  
});


router.delete('/:id', async(req, res) => {
    try{
        const genre = await Genre.findByIdAndRemove(req.params.id);
        if(!genre) return res.status(400).send(`invalid id ${req.params.id}`);
        res.send(genre);
    }
    catch(error){
        res.status(400).send(err);
    }
   
})


module.exports = router