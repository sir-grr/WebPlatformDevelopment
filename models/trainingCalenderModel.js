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
            dueDate: '2021-05-05'
        });
    
        //for debugging
        console.log('db entry: Peter inserted');
    
        this.db.insert({
            author: 'Ann',
            goal: 'leg Workout',
            details: '5km run',
            dueDate: '2022-04-19'
        })
    
            //for debugging
        console.log('db entry: Ann inserted');
    }


    getAllEntries(){

        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, entries) {
                if(err){
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('function getAllEntries() returns: ', entries);
                }
            })
        })
    }
    

    getEntriesByUser(authorName){
        return new Promise((resolve, reject) => {
            this.db.find({ author: authorName }, function(err, entries) {
                if (err){
                    reject (err);
                } else {
                    resolve(entries);
                    console.log('getEntriesByUser() returns: ', entries);
                }
            })
        })
    }

    addEntry(author, goal, details, date) {
        var entry = {
            author: author,
            goal: goal,
            details: details,
            dueDate: date//new Date().toISOString().split('T')[0]
        }
        console.log('entry created', entry);

        this.db.insert(entry, function(err, doc) {
            if (err) {
                console.log('Error inserting goal', goal);
            } else {
                console.log('document inserted into the database', doc);
            }
        })
    }

    deleteEntry(id){
        console.log('update through to model')
        this.db.remove({ _id : id}, {}, function(err, removedDocs) {
            console.log('deleting entry');
            if (err) {
                console.log('error');
            } else {
                console.log('documents removed:', removedDocs)
            }
        })
    }

    updateFirstEntry(author, goal, details, date){
        console.log('update through to model')
        this.db.update({author: 'Peter'}, { $set: { 'author': author, 'goal': goal, 'details': details,'dueDate': date } }, {}, function(err, updatedDocs) {
            console.log('updating peters goals');
            if (err) {
                console.log('error');
            } else {
                console.log('documents updated:', updatedDocs)
            }
        })
    }

}

module.exports = TrainingCalender;