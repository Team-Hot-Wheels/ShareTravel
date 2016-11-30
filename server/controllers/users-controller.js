let encryption = require('../utilities/encryption');
let User = require('mongoose').model('User');


module.exports = function (data) {
    return {
        register(req, res){
            res.render('users/register')
        },
        createUser(req, res){
            let user = req.body;
            if (user.password !== user.confirmPassword) {
                user.globalError = 'Passwords do not match!';
                res.render('users/register', user)
            } else {
                user.salt = encryption.generateSalt();
                user.hashedPass = encryption.generateHashedPassword(user.salt, user.password);

                data.createUser(user)
                    .then(user => {
                        req.logIn(user, (err, user) => {
                            if (err) {
                                res.render('users/register', {globalError: 'Ooops 500'});
                                return
                            }

                            res.redirect('/')
                        })
                    })
            }
        },
        login(req, res){
            res.render('users/login')
        },
        authenticate(req, res){
            let inputUser = req.body;

            data.findUserByUsername(inputUser.username)
                .then((user) => {

                    if (!user.authenticate(inputUser.password)) {
                        res.render('users/login', {globalError: 'Invalid username or password'})
                    } else {
                        req.logIn(user, (err, user) => {
                            if (err) {
                                res.render('users/login', {globalError: 'Ooops 500'});
                                return
                            }
                            console.log(user);
                            res.redirect('/')
                        })
                    }
                })
        },
        logout(req, res){
            req.logout();
            res.redirect('/')
        }
    }
};
