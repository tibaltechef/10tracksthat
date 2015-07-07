var slug  = require('slug');
var Lists = require('../models/model_lists');

module.exports = function (app) {

  /**
   * GET - /list
   * @description Tableau des listes 
   */
  app.get('/createlist', function (req, res) {
    res.render('list/create');
  });


  /**
   * GET - /list/:name
   * @param  {String} name
   * @description Liste en fonction du nom
   */
  app.get('/list/:name', function (req, res) {
    res.json({ 
      message : 'GET /list OK'
    });
  });

  /**
   * POST - /list
   * @description Ajout d'une liste
   */
  app.post('/list', function (req, res) {

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