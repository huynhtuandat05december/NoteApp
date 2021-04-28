require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routers/userRouter')
const noteRouter = require('./routers/noteRouter')
const path = require('path')

const app = express();
app.use(express.json());
app.use(cors());


const port = process.env.PORT || 5000;
app.use('/users', userRouter);
app.use('/api/notes', noteRouter);


const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false

}).catch(err => console.log(err.reason));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    });
}


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})