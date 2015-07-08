/**
 * Routes pour la gestion des utilisateurs
 * /login (GET/POST)
 * /register (GET/POST) 
 * /user/:username (GET)
 * /account (GET/POST)
 */

var Users = require('../models/model_users.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


// Stratégie authentification Passport
passport.use(Users.createStrategy());
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());


module.exports = function (app) {

  /**
   * GET - /user/:username
   * @param {String} username
   * @description Infos d'un utilisateur
   */
  app.get('/user/:username', function (req, res) {
      res.render('user/user')
  });


  /**
   * GET - /login
   * @description Formulaire d'authentification
   */
  app.get('/login', function (req, res) {
    res.render('user/login', { error: req.flash('error') });
  });


  /**
   * POST - /login
   * @param {String} username
   * @param {String} password
   * @description Authentification d'un utilisateur
   */
  app.post('/login', function (req, res) {

    // @todo -> login existant (à voir côté angular)

    if (req.body.username === undefined) {
      res.render('login', { error : i18n.__('error-login-missing-username') });
    }
    if (req.body.password === undefined) {
      res.render('login', { error : i18n.__('error-login-missing-password') });
    }

    // authentification
    passport.authenticate('local', { 
      failureRedirect: '/login',
      failureFlash: i18n.__('error-login-fail')
    })(req, res, function () {
      // success
      res.redirect('/');
    });
  });


  /**
   * GET - /register
   * @description Formulaire de création de compte
   */
  app.get('/register', function (req, res) {
    res.render('user/register');
  });


  /**
   * POST - /register
   * @param {String} trucs
   * @description Ajout d'un utilisateur
   */
  app.post('/register', function (req, res) {

    // Préparation des variables pour le template
    var errors = {
      count: 0,
      missingEmail: '',
      missingUsername: '',
      missingPassword: '',
      passWordCheck: '',
      usernameExists: ''
    }
    var fields = {
      email: req.body.email,
      username: req.body.username
    }

    // Vérification des champs
    if (req.body.email === undefined) {
      errors.missingEmail = i18n.__('error-register-missing-email');
      errors.count++;
    }
    if (req.body.username === undefined) {
      errors.missingUsername = i18n.__('error-register-missing-username');
      errors.count++;
    }
    if (req.body.password === undefined) {
      errors.missingPassword = i18n.__('error-register-missing-password');
      errors.count++;
    }
    if (req.body.password !== req.body.passwordcheck) {
      errors.passWordCheck = i18n.__('error-register-password-check');
      errors.count++;
    }

    if (errors.count > 0) {
      // Erreurs, retour au formulaire
      return res.render('register', { fields: fields, errors: errors });
    } else {
      // Vérif du pseudo déjà existant
      Users.findByUsername(req.body.username, function (err, user) {
        if (user) {
          errors.usernameExists = i18n.__('error-register-username-exists');
          return res.render('register', { fields: fields, errors: errors });
        }
      });

      var newuser = new Users({ 
        email : req.body.email,
        username : req.body.username 
      });

      Users.register(newuser), req.body.password, function (err, user) {
        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
      };
    }
  });
}