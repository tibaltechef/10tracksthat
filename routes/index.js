/**
 * Routes pour les pages du site
 * /index (GET)
 * /contact (GET) 
 * /tos (GET) (Terms Of Service)
 * /faq (GET)
 * /404 (GET)
 */

module.exports = function (app) {
    
  /**
   * GET - /
   * @description Accueil 
   */
  app.get('/', function (req, res) {
    res.render('index');
  });
}