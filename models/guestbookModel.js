const nedb = require('nedb');


class GuestBook{

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
            subject: 'I liked the exhibition',
            contents: 'nice',
            published: '2020-02-16',
            author: 'Peter'
        });

        
        //for debugging
        console.log('db entry: Peter inserted');

        this.db.insert({
            subject: "Didn't like it",
            contents: 'A really terrible style',
            published: '2020-02-18',
            author: 'Ann'
        })

        //for debugging
        console.log('db entry: Ann inserted');
    }//close init

    getAllEntries(){

        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, entries) {
                if(err){
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('function all() returns: ', entries);
                }
            })
        })
    }

    getPetersEntries(){
        return new Promise((resolve, reject) => {
            this.db.find({ author: 'Peter' }, function(err, entries) {
                if (err){
                    reject (err);
                } else {
                    resolve(entries);
                    console.log('getPetersEntries() returns: ', entries);
                }
            })
        })
    }

    addEntry(author, subject, contents) {
        var entry = {
            author: author,
            subject: subject,
            contents: contents,
            published: new Date().toISOString().split('T')[0]
        }
        console.log('entry created', entry);

        this.db.insert(entry, function(err, doc) {
            if (err) {
                console.log('Error inserting document', subject);
            } else {
                console.log('document inserted into the database', doc);
            }
        })
    }


}

module.exports = GuestBook;