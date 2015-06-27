module.exports = function (app) {
    
  /**
   * GET - /
   * @description Accueil 
   */
  app.get('/', function (req, res) {
    console.log('ici papa je suis là')
    res.render('index');
  });
}