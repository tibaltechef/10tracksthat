module.exports = function (app) {
    
  /**
   * GET - /
   * @description Accueil 
   */
  app.get('/', function (req, res) {
    res.render('index');
  });
}