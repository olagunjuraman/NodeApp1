const express = require('express');
const path = require('path');
const customer =  require('./routes/customer');
const genre = require('./routes/genre');
const user =  require('./routes/user');
const movie = require('./routes/movie');
const error = require('./middleware/error');


const app =  express();
app.use(express.json());

app.use('/api/customers', customer );
app.use('/api/genres', genre );
app.use('/api/users', user);
app.use('/api/movies', movie);


app.use(error);





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Successfully connnected on port ${PORT}`);
    
});



