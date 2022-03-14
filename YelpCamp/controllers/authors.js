const Author = require('../models/author/author');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.findAll = async (req, res, next) => {
    try {
        const allAuthors = await Author.find({});
        console.log("ALL AUTHORS: :: ", allAuthors);

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}
module.exports.register = async (req, res, next) => {
    try {
        console.log('THE REQ BODY IS  : ', req.body);
        //TEST AUTHOR
        const email = "ruizeduardo21@Gmail.com";
        const username = "mayhem";
        const password = "foo";
        const social = "eth";
        const wallet = "564564ds54f56ds4f56ds4fsdfdsfds";

        // const { email, username, password ,socials, wallet} = req.body;

        const author = new Author({ email, username, social, wallet });
        console.log('jdhkjhdsjfhdskj', author);
        Author.create(author).then(payload => {
            console.log('the payload: ', payload);
        })
        .catch(err => {
            if(err){
                console.log('ERROR:::', err);
            }
        });


        const registeredAuthor = await Author.register(author);
        console.log('the registered author :::', registeredAuthor);
        req.login(registeredAuthor, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome To Nomad Market Place!');
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    // req.session.destroy();
    req.flash('success', "Goodbye!");
    res.redirect('/campgrounds');
}