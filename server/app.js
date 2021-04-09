const express = require('express');
const dotenv =require('dotenv');
dotenv.config();
require('./config/db.js');
const app = express();
const morgan = require('morgan');
require('./models/User');
require('./models/Club');
require('./models/Comment');
require('./models/Event');
require('./models/Post');


app.use(express.json());

app.use(require('./routes/UserRoutes'));

if( process.env.NODE_ENV ==='development' ){
    app.use(morgan('dev'));
}

app.get('/',(req,res)=>{ res.send('API is running...')})




const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("Server is running on port",PORT);
});
