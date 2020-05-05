const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi')
async function connectMongod(){
  try{
    const result = await mongoose.connect('mongodb://localhost/Vidly');
    console.log('Succesfully connected to mongo database');
  }
  catch(error){
      console.log(error);
  }
}

connectMongod();



const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'please add a name'],
        minlength: 5,
        maxlength: 255
    },

    email: {
        required: [ true, 'please add an email'],
        unique: true,
        type: String,
        minlength: 5,
        maxlength: 255
    },

    password: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required : true
        
    },

    isAdmin: Boolean



});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id,}, 'jwtPrivateKey');
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = {
        name: Joi.string().min(5).max(255),
        email:Joi.string().min(5).max(255).email(),
        password: Joi.string().min(5).max(50)
    }

    return Joi.validate(user, schema);
}


module.exports.User  = User;
module.exports.validate = validateUser;
