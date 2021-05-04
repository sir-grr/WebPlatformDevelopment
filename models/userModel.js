const Datastore = require("nedb");
const bcrypt = require('bcrypt');
const auth = require('../auth/auth')
const {ensureLoggedIn} = require('connect-ensure-login'); 
const saltRounds = 10;
class UserDAO {

    constructor(dbFilePath) {
        if (dbFilePath) {
            //embedded
            this.db = new Datastore({ filename: dbFilePath,
            autoload: true });
        } else {
            //in memory
            this.db = new Datastore();
        }
    }
    // for the demo the password is the bcrypt of the user name
    init() {
        this.db.insert({
            username: 'Peter',
            password: '$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C',
            passphrase: 'bigbigbig'
        });
        console.log('user record inserted in init');

        this.db.insert({
            username: 'Ann',
            password: '$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S',
            passphrase: 'dogdogdog'
        });
        console.log('user record inserted in init');
        return this;
    }
        
    create(username, password, passphrase) {
        const that = this;
        bcrypt.hash(password, saltRounds).then(function(hash) {
        var entry = {
            username: username,
            password: hash,
            passphrase: passphrase
        };
        console.log('user entry is: ', entry);

        that.db.insert(entry, function (err) {
            if (err) {
                console.log("Can't insert user: ", username);
            }
        });
        });
    }


    lookup(username, cb) {
        this.db.find({'username': username}, function (err, entries) {
            if (err) {
                return cb(null, null);
            } else {
                if (entries.length == 0) {
                    return cb(null, null);
                }
                return cb(null, entries[0]);
            }
        });
    }
}

const dao = new UserDAO('user.db');
dao.init();
module.exports = dao;