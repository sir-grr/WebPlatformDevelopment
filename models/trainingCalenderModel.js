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
            goal: 'arm Workout',
            details: '10 bicep curls, 10 push ups, 10 tricep dips',
            complete: false,
            passphrase: 'bigbigbig',
            dueDate: '2021-05-05'
        });
    
        //for debugging
        console.log('db goal: Peter inserted');
    
        this.db.insert({
            author: 'Ann',
            goal: 'leg Workout',
            details: '5km run',
            complete: true,
            passphrase: 'dogdogdog',
            dueDate: '2022-04-19'
        })
    
            //for debugging
        console.log('db goal: Ann inserted');
    }


    getAllGoals(){

        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, goals) {
                if(err){
                    reject(err);
                } else {
                    resolve(goals);
                    console.log('function getAllGoals() returns: ', goals);
                }
            })
        })
    }
    

    getGoalsByUser(authorName){
        return new Promise((resolve, reject) => {
            this.db.find({ author: authorName }, function(err, goals) {
                if (err){
                    reject (err);
                } else {
                    resolve(goals);
                    console.log('getGoalsByUser() returns: ', goals);
                }
            })
        })
    }

    getGoalsByPhrase(phrase){
        return new Promise((resolve, reject) => {
            this.db.find({ passphrase: phrase }, function(err, goals) {
                if (err){
                    reject (err);
                } else {
                    resolve(goals);
                    console.log('getGoalsByPhrase() returns: ', goals);
                }
            })
        })
    }

    getGoalById(id){
        return new Promise((resolve, reject) => {
            this.db.find({ _id: id }, function(err, goal) {
                if (err){
                    reject (err);
                } else {
                    resolve(goal);
                    console.log('getGoalById() returns: ', goal);
                }
            })
        })
    }

    addGoal(author, goal, details, complete, passphrase, date) {
        var goal = {
            author: author,
            goal: goal,
            details: details,
            complete: complete,
            passphrase: passphrase,
            dueDate: date//new Date().toISOString().split('T')[0]
        }
        console.log('goal created', goal);

        this.db.insert(goal, function(err, doc) {
            if (err) {
                console.log('Error inserting goal', goal);
            } else {
                console.log('document inserted into the database', doc);
            }
        })
    }

    deleteGoal(id){
        console.log('update through to model')
        this.db.remove({ _id : id}, {}, function(err, removedDocs) {
            console.log('deleting goal');
            if (err) {
                console.log('error');
            } else {
                console.log('documents removed:', removedDocs)
            }
        })
    }

    completeGoal(id){
        console.log('update through to model')
        this.db.update({_id: id}, { $set: { 'complete' : true } }, {}, function(err, updatedDocs) {
            console.log('completing goal with id', id);
            if (err) {
                console.log('error');
            } else {
                console.log('documents updated:', updatedDocs)
            }
        })
    }

    updateGoal(author, goal, details, date, id){
        console.log('update through to model')
        this.db.update({_id: id}, { $set: { 'author': author, 'goal': goal, 'details': details,'dueDate': date } }, {}, function(err, updatedDocs) {
            console.log('updating goal', id);
            if (err) {
                console.log('error');
            } else {
                console.log('documents updated:', updatedDocs)
            }
        })
    }

}

module.exports = TrainingCalender;