const mongoose = require('mongoose');
const Joi = require('joi');


mongoose.connect('mongodb://localhost/Vidly')
.then(()=> console.log('Succesful conected'))
.catch((err)=> console.log('error connecting to database', err))

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 10
    },
})

const Genre = mongoose.model('genre', genreSchema);


function validateGenre(genre){
    const schema = {
        name: Joi.string().required().min(5).max(10)
    }

  return  Joi.validate(genre, schema);
}

module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;
module.exports.validate = validateGenre;