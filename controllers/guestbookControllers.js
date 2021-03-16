const guestbookDAO = require('../models/guestbookModel');
const db = new guestbookDAO();

exports.entries_list = function(req, res) {
    res.send('<h1>see terminal for entries</h1>');
    db.getAllEntries();
}

exports.landing_page = function(req, res) {
    var date = new Date();
    db.init();
    /*res.render('entries', {
        'title': 'Guest Book',
        'entries':[{
            'subject': 'Good day out',
            'contents' : 'We had a really good time visiting the museum',
            'author' : 'David Sycht',
            'published': date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
        },
        {
            'subject': 'Good place to be in a rainy day',
            'contents' : 'Nice paintings too',
            'author' : 'Barry Dernt',
            'published': (date.getDate()+2) + '/' + (date.getMonth()+3) + '/' + date.getFullYear()
        },
        {
            'subject': 'Yummy',
            'contents' : 'goot food :)',
            'author' : 'alise nomb',
            'published': (date.getDate()+7) + '/' + (date.getMonth()+6) + '/' + date.getFullYear()
        }
    ]
    });*/
    db.getAllEntries().then((list) => {
        res.render('entries', {
        'title': 'Guest Book',
        'entries': list
        });
        console.log('promise resolved');
        }).catch((err) => {
        console.log('promise rejected', err);
        })
}

exports.peters_list = function(req, res) {
    res.send('<h1>see terminal for peters entries</h1>');
    db.getAllEntries();
}

exports.new_entry = function(req, res) {
    res.render('newEntry', {
        'title': 'NewEntry'
    });
}

exports.show_new_entries = function(req, res) {
    res.render('newEntry', {
    'title': 'Guest Book'
    })
}

exports.post_new_entry = function(req, res) {

    if (!req.body.author) {
    response.status(400).send("Entries must have an author.");
    return;
    }
    db.addEntry(req.body.author, req.body.subject, req.body.contents);
    res.redirect('/');
}