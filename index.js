const express = require('express');

const app = express();
const port = 8000;
app.use(express.json());
const db = require('./config/mongoose');

// setting view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// use express router
app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in listening to server on port ${port}`);
    }
    console.log(`server is running on port: ${port}`);
});
