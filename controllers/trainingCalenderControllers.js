const { response } = require('express');
const trainingCalenderDAO = require('../models/trainingCalenderModel');
const userDao = require('../models/userModel.js');
const db = new trainingCalenderDAO('trainingCalender.db');

exports.landing_page = function(req, res) {
    try {
        user = req.user.user;
        console.log('getting goals by',req.user.user)
        db.getGoalsByUser(user).then((list) => {
            //sorts by youngest to oldest away date and removes completed goals
            list = list.filter(goal => !(goal.complete)).sort(function(a,b){return new Date(a.dueDate) - new Date(b.dueDate);})
            if(list.length > 5){
                list = list.slice(0,5)
            }
            res.render('goals', {
            'title': 'Home',
            'user': req.user, 
            'goals': list
            });
            console.log('promise resolved');
            }).catch((err) => {
            console.log('promise rejected', err);
            })
    } catch (err) {
        res.render('goals',{
            'title': 'Home'
        })
    }
}

exports.calendar_page = function(req,res){
    res.send('not yet implemented');
}

exports.seed_new_goals = function(req, res) {
    db.init(); 
    db.getAllGoals().then((list) => {
        res.render('goals', {
        'title': 'Training Calender',
        'goals': list
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

exports.show_user_goals = function(req, res) {
    console.log('finding goals by', req.params.author);

    let user = req.params.author;
    db.getGoalsByUser(user).then((goals) =>{
        res.render('goals', {
            'title': 'Training Calendar',
            'user': req.user,
            'goals': goals
        });
    }).catch((err) => {
        console.log('error handling author posts', err);
    });
}


exports.new_goal = function(req, res) {
    console.log('running new goal in controller')
    res.render('addGoal', {
        'title': 'New Goal',
        'user' : req.user
    });
}

exports.delete_goal = function(req, res) {
    console.log('id being deleted',req.params.id);
    db.deleteGoal(req.params.id);
    res.redirect('/');
}

exports.complete_goal = function(req, res) {
    console.log('id being completed',req.params.id);
    db.completeGoal(req.params.id);
    res.redirect('/');
}

exports.update_goal = function(req, res) {
    res.render('updateGoal', {
        'title': 'UpdateGoal'
    });
}

exports.about = function(req, res) {
    res.redirect('/about.html');
}

//posts
exports.post_new_goal = function(req, res) {

    /*if (!req.body.author) {
    response.status(400).send("Goals must have an author.");
    return;
    }*/
    db.addGoal(req.user.user, req.body.goal, req.body.details, false, req.body.dueDate);
    res.redirect('/');
}

exports.post_delete_goal = function(req, res) {

    db.deleteFirstGoal();
    res.redirect('/');
}

exports.post_update_goal = function(req, res) {
    if (!req.body.author) {
    response.status(400).send("Goals must have an author.");
    return;
    }
    db.updateFirstGoal(req.body.author, req.body.goal, req.body.details, req.body.dueDate);
    res.redirect('/');
}

exports.post_new_user = function(req, res) {
    console.log('running post_new_user')
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

exports.post_login = function(req, res) {
    console.log('running post_login')
    res.redirect('/');
}

exports.logout = function(req, res){
    req.logout();
    res.redirect('/');
}

