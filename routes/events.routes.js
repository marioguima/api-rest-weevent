const express = require('express');
const router = express.Router();

// Retorna todos os eventos
router.get('/', (req, res, next) => {
  res.status(200).send({
    message: 'List of events'
  });
});

// Inserir um evento
router.post('/', (req, res, next) => {

  const event = {
    title: req.body.title,
    long_description: req.body.long_description,
    short_description: req.body.short_description,
    scheduled: req.body.scheduled
  }

  res.status(201).send({
    message: 'Inserted event',
    event: event
  });
});

// Alterar um evento
router.patch('/', (req, res, next) => {
  res.status(201).send({
    message: 'Updated event'
  });
});

// Excluir um evento
router.delete('/', (req, res, next) => {
  res.status(201).send({
    message: 'Deleted event'
  });
});

// Retorna os dados de um evento
router.get('/:id_event', (req, res, next) => {
  const id = req.params.id_event;

  res.status(200).send({
    message: 'Event details',
    id_event: id
  });

});


module.exports = router;