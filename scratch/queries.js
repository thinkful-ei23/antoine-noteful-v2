'use strict';

const knex = require('../knex');

let searchTerm = 'gaga';

// knex
//   .select('notes.id', 'title', 'content')
//   .from('notes')
//   .modify(queryBuilder => {
//     if (searchTerm) {
//       queryBuilder.where('title', 'like', `%${searchTerm}%`);
//     }
//   })
//   .orderBy('notes.id')
//   .then(results => {
//     console.log(JSON.stringify(results, null, 2));
//   })
//   .catch(err => {
//     console.error(err);
//   });

// knex('notes')
//   .where({'notes.id': 1000})
//   .update({title: 'This is updated'})
//   .returning(['id', 'title'])
//   .then(results => {
//     console.log(JSON.stringify(results, null, 2))
//   })
//   .catch(err => 
//   next(err)
// );

// knex('notes')
//   .insert({title: 'new note', content: 'new content blah blah blah'})
//   .returning(['title', 'content'])
//   .then(console.log);


