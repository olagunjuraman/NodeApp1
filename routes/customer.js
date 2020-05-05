const express = require('express');
const {Customer, validate } = require('../models/customer');
const _ = require('lodash');


const router = express.Router();

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    
    try{
        let customer = new Customer(_.pick(req.body, [ 'name', 'phone', 'isGold']));
         customer =  await customer.save();
        res.send(customer);
    }
    catch(err){
        res.status(400).send('Something failed');
    }

});


router.get('/', async(req, res) =>{
    try{
        const customers = await Customer.find().sort('name');
        res.send(customers);
    }
    catch(err){
        res.status(404).send(err);
    }
  
});


router.get('/:id', async(req, res) => {
    try{
        const customer = await Customer.findById(req.params.id);
        res.send(customer);
    }
    catch(err){
        res.status(404).send('Something happended', err);
    }

});


router.put('/:id', async(req, res) =>{
   const { error} =  validate(req.body);

   if(error) return res.status(400).send(error.details[0].message);
   
    const customer = await Customer.findByIdAndUpdate(req.params.id, {           
        name: req.body.name,
        email: req.body.email,
        isGold: req.body.isGold
    }, {new : true});

    res.send(customer);
    if(!customer) return res.status(404).send('Customer with the given id doesnt exist');
    

})


router.delete('/:id', async(req, res) => {
    try{
        const customer =await Customer.findByIdAndRemove(req.params.id);
        if(!customer) return res.status(400).send('Cant find id');
        res.send(customer);
    }
    catch(error){
        res.status(400).send(error);
    }
   
});



module.exports = router