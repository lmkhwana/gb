const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');
const app = express();

mongoose.connect('mongodb+srv://lutsanmkhwa:56658378@cluster0.opwohpx.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/register', (req, res) => {
    res.render('register', { prompt: req.body.prompt });
});

app.post('/submit-registration', async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    if (password === confirmPassword) {
        const user = new User({ email, password });
        await user.save();
        res.redirect('/maintenance');
    } else {
        res.render('register', { prompt: req.body.prompt, error: 'Passwords do not match!' });
    }
});

app.get('/maintenance', (req, res) => {
    res.render('maintenance');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
