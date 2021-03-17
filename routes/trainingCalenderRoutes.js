const express = require('express');
const controller = require('../controllers/trainingCalenderControllers.js'); 
const router = express.Router();

//gets
router.get("/", controller.landing_page);

router.get("/home", controller.landing_page);

router.get('/login', controller.login_page);

router.get('/register', controller.register_page);

router.get('/new', controller.new_entry);

router.get('/delete', controller.delete_entry);

router.get('/update', controller.update_entry);

router.get('/seed', controller.seed_new_entries);

router.get('/about', controller.about);

//posts
router.post('/new', controller.post_new_entry); 

router.post('/delete', controller.post_delete_entry);

router.post('/update', controller.post_update_entry);

//handling unkowns/Server errors
router.use(function(req, res) {
    res.status(404);
    res.type('text/plain')
    res.send('404 no Page Here!');
});

router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
})

module.exports = router;