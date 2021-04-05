const express = require('express');
const contactController = require('../controllers/contact');
const courseController = require('../controllers/course');
const newsletterController = require('../controllers/newsletter');
const router = express.Router();

router.get('/', (req, res) => {
    // res.send("<h1>Home Page</h1>");
    res.render('index');
});
router.get('/register', (req, res) => {
    let query = "SELECT * FROM `courses` ORDER BY id ASC"; // query database to get all the courses

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }
        res.render('register', {
            courses: result
        });
    });
});
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/profile', (req, res) => {
    res.render('profile');
});

// Contact us -routes 
router.get('/contact', (req, res) => {
    res.render('contact');
});
router.post('/contact/post', contactController.store);

router.get('/contact/list', (req, res) => {
    let query = "SELECT * FROM `contacts` ORDER BY id ASC"; // query database to get all the contacts

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }
        res.render('contact/index', {
            contacts: result
        });
    });
});

router.get('/contact/delete/:id', (req,res) => {
    let contactId = req.params.id;
    let deleteUserQuery = 'DELETE FROM contacts WHERE id = "' + contactId + '"';

    db.query(deleteUserQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/contact/list');
    });
});








// Newsletter -routes 
router.post('/newsletter/post', newsletterController.store);

router.get('/newsletter/list', (req, res) => {
    let query = "SELECT * FROM `newsletter` ORDER BY id ASC"; // query database to get all the contacts

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }
        res.render('newsletter/index', {
            mails: result
        });
    });
});

router.get('/newsletter/delete/:id', (req,res) => {
    let mailId = req.params.id;
    let deleteUserQuery = 'DELETE FROM newsletter WHERE id = "' + mailId + '"';

    db.query(deleteUserQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/newsletter/list');
    });
});






// Courses -routes 
router.get('/courses', (req, res) => {
    let query = "SELECT * FROM `courses` ORDER BY id ASC"; // query database to get all the courses

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }
        res.render('courses/index', {
            courses: result
        });
    });
});
router.get('/courses/create', (req, res) => {
    res.render('courses/create');
});
router.post('/course/post', courseController.store);

router.get('/course/edit/:id', (req, res) => {
    let courseId = req.params.id;
    let query = "SELECT * FROM `courses` WHERE id = '" + courseId + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        console.log(result)
        res.render('courses/edit', {
            title: 'Edit  Course'
            ,course: result[0]
            ,message: ''
        });
    });
});

router.post('/course/update/:id', courseController.update);
router.get('/course/delete/:id', (req,res) => {
    let courseId = req.params.id;
    console.log(courseId);
    let deleteUserQuery = 'DELETE FROM courses WHERE id = "' + courseId + '"';

    db.query(deleteUserQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/courses');
    });
});




module.exports = router;