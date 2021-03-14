const guestbookDAO = require('../models/guestbookModel');
const db = new guestbookDAO();

exports.entries_list = function(req, res) {
    res.send('<h1>see terminal for entries</h1>');
    db.getAllEntries();
}

exports.landing_page = function(req, res) {
    db.init();
    res.send('<h1>Welcome to my Application.</h1>');
}

exports.peters_list = function(req, res) {
    res.send('<h1>see terminal for peters entries</h1>');
    db.getAllEntries();
}

exports.new_entry = function(req, res) {
    res.send('<h1>Not yet implemented: show a new entry page.</h1>');
}