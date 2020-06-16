const express = require('express');
const app = express();
const config = require("config");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const usersRoute = require("./routes/user.route");
app.use(bodyParser.json());

if (!config.get("myprivatekey")) {
    console.error("FATAL ERROR: myprivatekey is not defined.");
    process.exit(1);
}

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))



app.use(express.json())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
//Import Routes

//Measures router
const measuresRouter = require('./routes/measures');
app.use('/measures', measuresRouter);

//Customer Router
const customersRouter = require('./routes/customers');
app.use('/customers', customersRouter);

//Users Router
app.get('/', (req, res) => res.send('Capgemini'));
app.use("/api/users", usersRoute);

//UserRights Router
const userRightsRouter = require('./routes/userRights');
app.use("/userrights", userRightsRouter);

//Baseline Router
const baselineRouter = require('./routes/baseline');
app.use("/baseline", baselineRouter);

//CostType Router
const costTypeRouter = require('./routes/costType');
app.use("/costtype", costTypeRouter);

//CostTypeGroup Router
const costTypeGroupRouter = require('./routes/costTypeGroup');
app.use("/costtypegroup", costTypeGroupRouter);

//Savings Router
const savingsRouter = require('./routes/savings');
app.use("/savings", savingsRouter);

//MeasureDetails Router
const measureDetailsRouter = require('./routes/measureDetails');
app.use("/measuredetails", measureDetailsRouter);




const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));



/// yarn app
