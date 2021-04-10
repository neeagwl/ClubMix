const express = require('express');
const dotenv =require('dotenv');
dotenv.config();
require('./config/db.js');
const app = express();
const morgan = require('morgan');



// const { MONGOURI } = require('./keys');


// mongoose.connect(MONGOURI,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
// mongoose.connection.on('connected',()=>{
//     console.log('connected to mongo db');
// });
// mongoose.connection.on('error',(err)=>{
//     console.log('error connecting',err);
// });

require('./models/User');
require('./models/Club');
require('./models/Comment');
require('./models/Event');
require('./models/Post');

app.locals.moment= require("moment");


app.use(express.json());

if( process.env.NODE_ENV ==='development' ){
    app.use(morgan('dev'));
}

app.get('/',(req,res)=>{ res.send('API is running...')})

app.use(require('./routes/UserRoutes'));
app.use(require('./routes/ClubRoutes'));
app.use(require('./routes/PostRoutes'));
app.use(require('./routes/EventRoutes'));
app.use(require('./routes/SubscribeRoutes'));
app.use(require('./routes/Notifications'));


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("Server is running on port",PORT);
});
