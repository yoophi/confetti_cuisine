const User = require('../models/user');

module.exports = {
    index: (req, res, next) => {
        User.find({})
            .then(users => {
                res.locals.users = users;
                next()
            })
            .catch(error => {
                console.error(`Error fetching users: ${error.message}`);
                res.redirect('/')
            })
    },
    indexView: (req, res) => {
        res.render('users/index')
    }
}