const mongoose = require('mongoose');
const Joi = require('joi');

mongoose.connect('mongodb://localhost/Vidly')
.then(() => console.log('Succesfully Connected to db'))
.catch((err) => console.log(err));

const customerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },

    phone:{
        type: String,
        required: function() { return this.isGold },
        min: 5,
        max: 10
    },


    isGold:{
        type:Boolean,
        required: true
    }
});


const Customer = mongoose.model('customer', customerSchema);



function validateCustomer(customer){
    const schema = {
        name: Joi.string().min(5).max(20).required(),
        phone:Joi.number(),
        isGold: Joi.boolean()
    }

   return  Joi.validate(customer, schema);
}


module.exports.Customer = Customer
module.exports.validate = validateCustomer