const express = require('express');
const auth = require('../auth/auth')
const {ensureLoggedIn} = require('connect-ensure-login'); 
const controller = require('../controllers/trainingCalenderControllers.js'); 
const router = express.Router();

//gets
router.get("/", controller.landing_page);

router.get("/home", controller.landing_page);

router.get('/login', controller.login_page);

router.get('/register', controller.register_page);

router.get('/logout', ensureLoggedIn('/login'), controller.logout);

router.get('/new', ensureLoggedIn('/login'), controller.new_plan);

router.get('/update/:id', ensureLoggedIn('/login'), controller.update_plan);

router.get('/delete/:id', ensureLoggedIn('/login'), controller.delete_plan);

router.get('/complete/:id', ensureLoggedIn('/login'), controller.complete_plan);

//router.get('/seed', ensureLoggedIn('/login'), controller.seed_new_plans);

router.get('/about',  controller.about);

router.get('/plans', ensureLoggedIn('/login'), controller.show_user_plans); 

router.get('/plans/:week', ensureLoggedIn('/login'), controller.show_user_plans_by_week); 

router.get('/shared/plans/:passphrase', controller.show_passphrase_plans);
//posts
router.post('/new', ensureLoggedIn('/login'), controller.post_new_plan); 

router.post('/update/:id', ensureLoggedIn('/login'), controller.post_update_plan);

router.post('/register', controller.post_new_user);

router.post('/login', auth.authorize('/login'), controller.post_login)

//handling unkowns/Server errors
router.use(function(req, res) {
    res.status(404);
    res.type('html');
    res.redirect('/404Response.html');
});

router.use(function(err, req, res, next) {
    res.status(500);
    res.type('html');
    console.log(err);
    res.redirect('/500Response.html');
})

module.exports = router;