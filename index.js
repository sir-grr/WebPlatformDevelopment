const express = require('express');
const path = require('path');
const app = express();
const public = path.join(__dirname, 'public');
app.use(express.static(public));
app.get('/', function(req, res) {
 res.send('Hello! Welcome to my application.');
})
app.get('/guestbook', function(req, res) {
 res.send('<h1>Guestbook Messages</h1>');
})
app.get('/about', function(req, res) {
 res.sendFile(path.join(public, 'about.html'));
})
app.use(function(req, res) {
 res.status(404);
 res.send('Oops! We didn\'t find what you are looking for.');
})
app.listen(3000, () => {
 console.log('Server started on port 3000. Ctrl^c to quit.');
})
/*
app.listen(3000, function() {
 console.log('Server started on port 3000. Ctrl^c to quit.');
})
*/