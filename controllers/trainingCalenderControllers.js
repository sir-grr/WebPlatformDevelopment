const guestbookDAO = require('../models/trainingCalenderModel');
const db = new guestbookDAO();

exports.entries_list = function(req, res) {
    res.send('<h1>see terminal for entries</h1>');
    db.getAllEntries();
}

exports.landing_page = function(req, res) {
    db.getAllEntries().then((list) => {
        res.render('entries', {
        'title': 'Training Calender',
        'entries': list
        });
        console.log('promise resolved');
        }).catch((err) => {
        console.log('promise rejected', err);
        })
}

exports.seed_new_entries = function(req, res) {
    
    db.init(); 
    db.getAllEntries().then((list) => {
        res.render('entries', {
        'title': 'Training Calender',
        'entries': list
        });
        console.log('promise resolved');
        }).catch((err) => {
        console.log('promise rejected', err);
        })
}

exports.peters_list = function(req, res) {
    res.send('<h1>see terminal for peters entries</h1>');
    db.getAllEntries();
}

exports.new_entry = function(req, res) {
    res.render('newEntry', {
        'title': 'NewEntry'
    });
}

exports.show_new_entries = function(req, res) {
    res.render('newEntry', {
    'title': 'Guest Book'
    })
}

exports.post_new_entry = function(req, res) {

    if (!req.body.author) {
    response.status(400).send("Entries must have an author.");
    return;
    }
    db.addEntry(req.body.author, req.body.goal, req.body.details, req.body.dueDate);
    res.redirect('/');
}