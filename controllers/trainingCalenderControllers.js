const trainingCalenderDAO = require('../models/trainingCalenderModel');
const db = new trainingCalenderDAO('trainingCalender.db');

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

exports.login_page = function(req, res) {
    res.render('login');
}

exports.register_page = function(req, res) {
    res.render('register');
}

exports.new_entry = function(req, res) {
    res.render('newEntry', {
        'title': 'NewEntry'
    });
}

exports.delete_entry = function(req, res) {
    res.render('deleteEntry', {
        'title': 'DeleteEntry'
    });
}

exports.update_entry = function(req, res) {
    res.render('updateEntry', {
        'title': 'UpdateEntry'
    });
}

exports.about = function(req, res) {
    res.redirect('/about.html');
}

exports.post_new_entry = function(req, res) {

    if (!req.body.author) {
    response.status(400).send("Goals must have an author.");
    return;
    }
    db.addEntry(req.body.author, req.body.goal, req.body.details, req.body.dueDate);
    res.redirect('/');
}

exports.post_delete_entry = function(req, res) {

    db.deleteFirstEntry();
    res.redirect('/');
}

exports.post_update_entry = function(req, res) {
    if (!req.body.author) {
    response.status(400).send("Goals must have an author.");
    return;
    }
    db.updateFirstEntry(req.body.author, req.body.goal, req.body.details, req.body.dueDate);
    res.redirect('/');
}

