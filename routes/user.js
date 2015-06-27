var Users = require('../models/model_users.js');

module.exports = function (router) {

  /**
   * GET - /users/:username
   * @param {String} username
   * @description Infos d'un utilisateur
   */
  router.get('/users/:username', function (req, res) {
      
  });

  /**
   * POST - /users
   * @param {String} username
   * @param {String} password
   * @description Ajout d'un utilisateur
   */
  router.post('/users', function (req, res) {
      
    if (req.body.username === undefined) {
      return res.status(400).send({ message : 'username non défini'});
    }
    if (req.body.password === undefined) {
      return res.status(400).send({ message : 'password non défini'});
    }

    return res.json(
      { message : 'POST /users OK'}
    );
  });
}