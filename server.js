require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routers/userRouter')
const noteRouter = require('./routers/noteRouter')

const app = express();
app.use(express.json());
app.use(cors());


const port = process.env.PORT;
app.use('/users', userRouter);
app.use('/api/notes', noteRouter);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


app.get('/', (req, res) => {
    res.json('hello')
})


const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false

}).catch(err => console.log(err.reason));
