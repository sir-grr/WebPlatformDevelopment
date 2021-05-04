const express = require('express');
const auth = require('../auth/auth')
const {ensureLoggedIn} = require('connect-ensure-login'); 
const controller = require('../controllers/trainingCalenderControllers.js'); 
const router = express.Router();

//gets
router.get("/", controller.landing_page);

router.get('/goals', controller.landing_page);

router.get("/home", controller.landing_page);

router.get('/login', controller.login_page);

router.get('/register', controller.register_page);

router.get('/logout', controller.logout);

router.get('/new', ensureLoggedIn('/login'), controller.new_goal);

router.get('/update/:id', ensureLoggedIn('/login'), controller.update_goal);

router.get('/delete/:id', controller.delete_goal);

router.get('/complete/:id', controller.complete_goal);

router.get('/seed', controller.seed_new_goals);

router.get('/about', controller.about);

router.get('/goals/:author', ensureLoggedIn('/login'), controller.show_user_goals); 

router.get('/shared/goals/:passphrase', controller.show_passphrase_goals);
//posts
router.post('/new', ensureLoggedIn('/login'), controller.post_new_goal); 

router.post('/update/:id', ensureLoggedIn('/login'), controller.post_update_goal);

router.post('/register', controller.post_new_user);

router.post('/login', auth.authorize('/login'), controller.post_login)

//handling unkowns/Server errors
router.use(function(req, res) {
    res.status(404);
    res.type('text/plain')
    res.send('404 no Page Here!');
});

router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.', err);
})

module.exports = router;