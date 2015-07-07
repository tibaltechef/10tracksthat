var Users = require('../models/model_users.js');

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
    res.render('user/login');
  });

  /**
   * POST - /user
   * @param {String} username
   * @param {String} password
   * @description Authentification d'un utilisateur
   */
  app.post('/login', function (req, res) {
      
    if (req.body.username === undefined) {
      // return res.status(400).send({ message : 'username non défini'});
    }
    if (req.body.password === undefined) {
      // return res.status(400).send({ message : 'password non défini'});
    }
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
      
    if (req.body.username === undefined) {
      return res.status(400).send({ message : 'username non défini'});
    }
  });
}