const nedb = require('nedb');
const auth = require('../auth/auth')
const {ensureLoggedIn} = require('connect-ensure-login'); 


class TrainingCalender{

    constructor(dbFilePath){
        if (dbFilePath){
            this.db = new nedb({ filename: dbFilePath, autoload: true});
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }

    init(){
        
        this.db.insert({
            author: 'Peter',
            name: 'leg Workout',
            complete: false,
            passphrase: 'bigbigbig',
            week: '5',
            goals: [{
                info: '10km run'
            },{
                info: '10 squats'
            },{
                info: '10 lunges'
            }],
            date: '2021-05-05'
        });
    
        //for debugging
        console.log('db plan: Peter inserted');
    
        this.db.insert({
            author: 'Ann',
            name: 'arm Workout',
            complete: true,
            passphrase: 'dogdogdog',
            week: '9',
            goals: [{
                info: '20 pushups'
            },{
                info: '20 pullups'
            },{
                info: '20 punches'
            }],
            date: '2022-04-19'
        })
    
            //for debugging
        console.log('db plan: Ann inserted');
    }


    getAllPlans(){

        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, plans) {
                if(err){
                    reject(err);
                } else {
                    resolve(plans);
                    console.log('function getAllPlans() returns: ', plans);
                }
            })
        })
    }
    

    getPlansByUser(authorName){
        return new Promise((resolve, reject) => {
            this.db.find({ author: authorName }, function(err, plans) {
                if (err){
                    reject (err);
                } else {
                    resolve(plans);
                    console.log('getPlansByUser() returns: ', plans);
                }
            })
        })
    }

    getPlansByPhrase(phrase){
        return new Promise((resolve, reject) => {
            this.db.find({ passphrase: phrase }, function(err, plans) {
                if (err){
                    reject (err);
                } else {
                    resolve(plans);
                    console.log('getPlansByPhrase() returns: ', plans);
                }
            })
        })
    }

    getPlanById(id){
        return new Promise((resolve, reject) => {
            this.db.find({ _id: id }, function(err, plan) {
                if (err){
                    reject (err);
                } else {
                    resolve(plan);
                    console.log('getPlanById() returns: ', plan);
                }
            })
        })
    }

    getPlansByWeek(author,week){
        return new Promise((resolve, reject) => {
            this.db.find({ author: author, week: week }, function(err, plan) {
                if (err){
                    reject (err);
                } else {
                    resolve(plan);
                    console.log('getPlanByWeek() returns: ', plan);
                }
            })
        })
    }

    addPlan(author, name, goal1, goal2, goal3, complete, passphrase, week, date) {
        var plan = {
            author: author,
            name: name,
            complete: complete,
            passphrase: passphrase,
            week: week,
            goals: [{
                info: goal1
            },{
                info: goal2
            },{
                info: goal3
            }],
            date: date
        }
        console.log('plan created', plan);

        this.db.insert(plan, function(err, doc) {
            if (err) {
                console.log('Error inserting plan', plan);
            } else {
                console.log('document inserted into the database', doc);
            }
        })
    }

    deletePlan(id){
        console.log('update through to model')
        this.db.remove({ _id : id}, {}, function(err, removedDocs) {
            console.log('deleting plan');
            if (err) {
                console.log('error');
            } else {
                console.log('documents removed:', removedDocs)
            }
        })
    }

    completePlan(id){
        console.log('update through to model')
        this.db.update({_id: id}, { $set: { 'complete' : true } }, {}, function(err, updatedDocs) {
            console.log('completing plan with id', id);
            if (err) {
                console.log('error');
            } else {
                console.log('documents updated:', updatedDocs)
            }
        })
    }

    updatePlan(author, name, goal1, goal2, goal3, date, week, id){
        console.log('update through to model')
        this.db.update({_id: id}, { $set: {
            author: author,
            name: name,
            week: week,
            goals: [{
                info: goal1
            },{
                info: goal2
            },{
                info: goal3
            }],
            date: date
        } }, {}, function(err, updatedDocs) {
            console.log('updating plan', id);
            if (err) {
                console.log('error');
            } else {
                console.log('documents updated:', updatedDocs)
            }
        })
    }

}

module.exports = TrainingCalender;