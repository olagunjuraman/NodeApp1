const mongoose = require('mongoose');

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


  const rentalSchema = new mongoose.Schema({
    movie: {
        required: true,
        type: movieSchema
    }  ,
    customer: {
        required : true,
        type: customerSchema
    }

  });


  const Rental = mongoose.model('Rental', rentalSchema);

  module.exports = Rental