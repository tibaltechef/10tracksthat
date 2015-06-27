module.exports = function (router) {
    
  /**
   * GET - /
   * @description Accueil 
   */
  router.get('/', function (req, res) {
    res.render('index');
  });
}