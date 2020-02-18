require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())


const measuresRouter = require('./routes/measures')
app.use('/measures', measuresRouter)


app.get('/', (req, res) => res.send('Ganesh'));



const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));



/// yarn app
 