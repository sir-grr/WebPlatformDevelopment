//import modules
const express = require('express');
const mustache = require('mustache-express');
const path = require('path');
//const nedb = require('nedb');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
const public = path.join(__dirname, 'public');
//creates a db in a file titled students.db to run in memory mode don't add a filename
//const db = new nedb({ filename: 'students.db', autoload: true});
console.log('db created');

app.use(express.static(public));

const router = require('./routes/trainingCalenderRoutes');
app.use('/', router);
/*
db.insert({
    student: 'Ann',
    age: 21,
    programme: 'Networking',
    grant: true,
    modules: [{
            name: 'routing',
            grade: 70
        },
        {
            name: 'security',
            grade: 61
        },
        {
            name: 'server management',
            grade: 62
        }
    ]
}, function(err, newInfo) {
    if (err){
        console.log('error', err);
    } else {
        console.log('information insterted', newInfo);
    }
});

db.find({"modules.name": 'stuffo'}, function(err, docs) {
    console.log('retrieving docs with module security');
    if (err) {
        console.log('error');
    } else {
        console.log('documents retrieved:', docs)
    }
})
db.remove({ student: 'Peter'}, {}, function(err, removedDocs) {
    console.log('deleting the first peter');
    if (err) {
        console.log('error');
    } else {
        console.log('documents removed:', removedDocs)
    }
})
db.update({ student: 'Ann', 'modules.name': 'routing'}, { $set: { "age": 23, "programme": "Computing" } }, {}, function(err, updatedDocs) {
    if (err) {
        console.log('error');
    } else {
        console.log('documents updated:', updatedDocs)
    }
})
*/

/*


*/
app.listen(3000, function() {
    console.log('Server started on port 3000. Ctrl^c to quit.');
   })
/*
app.listen(3000, () => {
 console.log('Server started on port 3000. Ctrl^c to quit.');
})
*/