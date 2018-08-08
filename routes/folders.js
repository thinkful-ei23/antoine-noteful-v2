const express = require('express');
const knex = require('../knex');
const router = express.Router();


router.get('/', (req, res, next) => {

  knex.select('id', 'name')
    .from('folders')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));

});

// Get a single item
router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  knex
    .first('id', 'name')
    .from('folders')
    .where({'id': id})
    .then(result => {
      if(result) {
        res.json(result);
      } else {
        next();
      }
    }).catch(err => {
      next(err);
    });
});

// Put update an item
router.put('/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['name'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!updateObj.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex('folders')
    .where('id', id)
    .update(updateObj)
    .returning(['id', 'name'])
    .then(([result]) => {
      if(result) {
        res.status(200);
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => 
      next(err)
    );
});

// Post (insert) an item
router.post('/', (req, res, next) => {
  const { name } = req.body;

  const newItem = { name };
  /***** Never trust users - validate input *****/
  if (!newItem.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex('folders')
    .insert(newItem)
    .returning(['id','name'])
    .then(result => {
      if(result) {
        res.location(`http://${req.headers.host}/folders/${result.id}`).status(201).json(result);
      }
    });
});



// Delete an item
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  knex('folders')
    .where({'folders.id': id})
    .del()
    .then(() => {
      res.sendStatus(204);
    }).catch(err => {
      next(err);
    });
});


module.exports = router;