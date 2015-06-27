var slug  = require('slug');
var Lists = require('../models/model_lists');

module.exports = function (router) {

  /**
   * GET - /lists
   * @description Tableau des listes 
   */
  router.get('/lists', function (req, res) {
    res.json({ 
      message : 'GET /lists OK'
    });
  });


  /**
   * GET - /lists/:name
   * @param  {String} name
   * @description Liste en fonction du nom
   */
  router.get('/lists/:name', function (req, res) {
    res.json({ 
      message : 'GET /lists OK'
    });
  });

  /**
   * POST - /lists
   * @description Ajout d'une liste
   */
  router.post('/lists', function (req, res) {

    // @todo vérifier que l'user est connecté

    // Vérification des éléments
    if (req.body.name === undefined) res.json({ message : 'name obligatoire'});
    if (req.body.tags === undefined) res.json({ message : 'tags obligatoire'});
    if (req.body.description === undefined) res.json({ message : 'description obligatoire'});

    // @todo sécu
    var tags = req.body.tags.split('[\,\;]');
    var slug = slug(req.body.title);

    var list = new List({
      slug: slug,
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      tags: tags
    });

    list.save(function (err) {
      if (err) throw err;
      res.send(list);
    });
  });
}