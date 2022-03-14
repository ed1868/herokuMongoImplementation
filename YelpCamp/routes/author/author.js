const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../../utils/catchAsync');
const Author = require('../../models/author/author');
const authors = require('../../controllers/authors');
const users = require('../../controllers/users');


router.route('/')
    .get(authors.findAll)

// router.route('/author_ranks')
//     .get(authors.getRanks)

// router.route('/count')
//     .get(authors.authorCounts)


// router.route('/:id')
//     .get(authors.findOne)

// router.route('/:id/edit')
//     .put(authors.update)
    
router.route('/register')
    .get(authors.renderRegister)
    .post(catchAsync(authors.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

module.exports = router;