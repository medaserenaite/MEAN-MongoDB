const zmogus = require('../controllers/zmones.js');

module.exports = (app) => {
  app.get('/tasks', (req, res) => {
    zmogus.showAll(req, res);
  })
  app.get('/new/:name/', (req, res) => {
    zmogus.add(req, res);
  })
  app.get('/remove/:name/', (req, res) => {
    zmogus.remove(req, res);
  })
  app.get('/:name/', (req, res) => {
    zmogus.show(req, res);
  })
}