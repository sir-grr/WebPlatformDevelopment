const express = require('express');
const controller = require('../controllers/guestbookControllers.js'); 
const router = express.Router();

router.get("/", controller.landing_page);

router.get('/guestbook', controller.entries_list);

router.get('/new', controller.new_entry);

router.get('/peter', controller.peters_list);

router.get('/about', function(req, res) {
    res.redirect('/about.html');
});
   
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