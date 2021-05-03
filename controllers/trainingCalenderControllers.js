const trainingCalenderDAO = require('../models/trainingCalenderModel');
const userDao = require('../models/userModel.js');
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
    res.render('user/login', {
        'title' : 'Login'
    });
}

exports.register_page = function(req, res) {
    res.render('user/register', {
        'title' : 'Register'
    });
}

exports.show_user_entries = function(req, res) {
    console.log('finding goals by', req.params.author);

    let user = req.params.author;
    db.getEntriesByUser(user).then((entries) =>{
        res.render('entries', {
            'title': 'Training Calendar',
            'entries': entries
        });
    }).catch((err) => {
        console.log('error handling author posts', err);
    });
}


exports.new_entry = function(req, res) {
    res.render('newEntry', {
        'title': 'NewEntry'
    });
}

exports.delete_entry = function(req, res) {
    console.log('id being deleted',req.params.id);
    db.deleteEntry(req.params.id);
    res.redirect('/');
}

exports.update_entry = function(req, res) {
    res.render('updateEntry', {
        'title': 'UpdateEntry'
    });
}

exports.about = function(req, res) {
    res.redirect('/about.html');
}

//posts
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

exports.post_new_user = function(req, res) {
    console.log('running pnu')
    console.log(req.body.psw,req.body.username,req.body.pswrepeat);
    const user = req.body.username;
    const password = req.body.psw;
    const passwordRepeat = req.body.pswrepeat;
    //console.log("register user", user, "password", password);
    if (!user || !password) {
        res.send(401, 'no user or no password');
        return;
    }
    else if(!(password == passwordRepeat)){
        res.send(401, 'passwords do not match');
        return;
    }
    //add else if for not matching

    userDao.lookup(user, function(err, u) {
        if (u) {
            res.send(401, "User exists:", user);
            return;
        }
        userDao.create(user, password);
        res.redirect('/login');
    });
   } 

