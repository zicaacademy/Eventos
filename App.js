const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL).then(() => {
    console.log("Database is connected!");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
});

app.use(session({ secret: 'jann9283bnauyg127612b' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));
app.set('views', path.join(__dirname, '/views'));

// Import and use routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const showRoutes = require('./routes/shows');

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/shows', showRoutes);

module.exports = app;
