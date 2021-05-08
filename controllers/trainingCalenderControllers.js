const { response } = require('express');
const randomWords = require('random-words');
const planDAO = require('../models/planModel');
const userDao = require('../models/userModel.js');
const db = new planDAO('trainingCalender.db');

exports.landing_page = function(req, res) {
    try {
        user = req.user.username;
        console.log('getting plans by',req.user.username)
        db.getPlansByUser(user).then((list) => {
            //sorts by youngest to oldest away date and removes completed plans
            list = list.filter(plan => !(plan.complete)).sort(function(a,b){return new Date(a.date) - new Date(b.date);})
            res.render('plans', {
            'title': 'Incomplete Plans',
            'user': req.user, 
            'plans': list,
            'shareUrl': req.protocol + '://' + req.get('host') + '/shared/plans/'
            });
            console.log('promise resolved');
            }).catch((err) => {
            console.log('promise rejected', err);
            })
    } catch (err) {
        res.render('plans',{
            'title': 'Home'
        })
    }
}

/*exports.seed_new_plans = function(req, res) {
    db.init(); 
    res.redirect('/')
}*/

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

exports.show_user_plans = function(req, res) {
    console.log('finding plans by', req.user.username);

    let user = req.user.username;
    db.getPlansByUser(user).then((plans) =>{
        res.render('plans', {
            'title': 'Plan Calendar ',
            'user': req.user,
            'plans': plans,
            'shareUrl': req.protocol + '://' + req.get('host') + '/shared/plans/'
        });
    }).catch((err) => {
        console.log('error handling author posts', err);
    });
}

exports.show_user_plans_by_week = function(req, res) {
    console.log('finding plans by week', req.params.week);

    let user = req.user.username;
    db.getPlansByWeek(user,req.params.week).then((plans) =>{
        res.render('plans', {
            'title': 'Plan Calendar for week ' + req.params.week,
            'user': req.user,
            'plans': plans,
            'shareUrl': req.protocol + '://' + req.get('host') + '/shared/plans/'
        });
    }).catch((err) => {
        console.log('error handling author posts', err);
    });
}

exports.show_passphrase_plans = function(req, res) {
    console.log('finding plans by', req.params.passphrase);

    let phrase = req.params.passphrase;
    db.getPlansByPhrase(phrase).then((plans) =>{
        res.render('sharePlans', {
            'title': 'Shared plans',
            'user': req.user,
            'plans': plans
        });
    }).catch((err) => {
        console.log('error handling phrase posts', err);
    });
}


exports.new_plan = function(req, res) {
    console.log('running new plan in controller')
    res.render('addPlan', {
        'title': 'New plan',
        'user' : req.user
    });
}

exports.delete_plan = function(req, res) {
    console.log('id being deleted',req.params.id);
    db.deletePlan(req.params.id);
    res.redirect('/');
}

exports.complete_plan = function(req, res) {
    console.log('id being completed',req.params.id);
    db.completePlan(req.params.id);
    res.redirect('/');
}

exports.update_plan = function(req, res) {
    let id = req.params.id
    console.log('id being updated', id);
    res.render('updatePlan', {
        'title': 'Update plan',
        'user': req.user,
    });
}

exports.about = function(req, res) {
    res.redirect('/about.html');
}

//posts
exports.post_new_plan = function(req, res) {
    console.log('running post update plan in controller')
    let dateEntered = Date.parse(req.body.date);
    let comparisonDate = new Date(+dateEntered);
    comparisonDate.setHours(0, 0, 0, 0);
    comparisonDate.setDate(comparisonDate.getDate() + 3 - (comparisonDate.getDay() + 6) % 7);
    var firstWeek = new Date(comparisonDate.getFullYear(), 0, 4);
    let week = (Math.round(((comparisonDate.getTime() - firstWeek.getTime()) / 86400000 - 3 + (firstWeek.getDay() + 6) % 7) / 7) +1).toString();
    console.log(week);
    db.addPlan(req.user.username, req.body.name, req.body.goal1, req.body.goal2, req.body.goal3, false, req.user.passphrase, week, req.body.date);
    res.redirect('/');
}

exports.post_update_plan = function(req, res) {
    console.log('running post_update_plan')
    let dateEntered = Date.parse(req.body.date);
    let comparisonDate = new Date(+dateEntered);
    comparisonDate.setHours(0, 0, 0, 0);
    comparisonDate.setDate(comparisonDate.getDate() + 3 - (comparisonDate.getDay() + 6) % 7);
    var firstWeek = new Date(comparisonDate.getFullYear(), 0, 4);
    let week = (Math.round(((comparisonDate.getTime() - firstWeek.getTime()) / 86400000 - 3 + (firstWeek.getDay() + 6) % 7) / 7) +1).toString();
    db.updatePlan(req.user.username, req.body.name, req.body.goal1, req.body.goal2, req.body.goal3, req.body.date, week, req.params.id);
    res.redirect('/');
}

exports.post_new_user = function(req, res) {
    console.log('running post_new_user')
    console.log(req.body.psw,req.body.username,req.body.pswrepeat);
    const user = req.body.username;
    const password = req.body.psw;
    const passwordRepeat = req.body.pswrepeat;
    let passphrase = randomWords(3).join("");
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
        userDao.create(user, password, passphrase);
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

