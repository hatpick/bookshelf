var _ = require('underscore');
var When = require('when');

var drops = [
  'sites', 'sitesmeta', 'admins',
  'admins_sites', 'authors', 'authors_posts',
  'blogs', 'posts', 'tags', 'posts_tags', 'comments'
];

module.exports = function(Bookshelf) {

  var Schema = Bookshelf.Knex.Schema;

  return When.all(_.map(drops, function(val) {
    return Schema.dropTableIfExists(val);
  }))
  .then(function() {

    return When.all([
      Schema.createTable('sites', function(table) {
        table.increments('id');
        table.string('name');
      }),

      Schema.createTable('sitesmeta', function(table) {
        table.increments('id');
        table.integer('site_id');
        table.text('description');
      }),

      Schema.createTable('admins', function(table) {
        table.increments('id');
        table.string('username');
        table.string('password');
        table.timestamps();
      }),

      Schema.createTable('admins_sites', function(table) {
        table.increments('id');
        table.integer('admin_id');
        table.integer('site_id');
        table.string('item').defaultTo('test');
      }),

      Schema.createTable('blogs', function(table) {
        table.increments('id');
        table.integer('site_id');
        table.string('name');
      }),

      Schema.createTable('authors', function(table) {
        table.increments('id');
        table.integer('site_id');
        table.string('first_name');
        table.string('last_name');
      }),

      Schema.createTable('posts', function(table) {
        table.increments('id');
        table.integer('owner_id');
        table.integer('blog_id');
        table.string('name');
        table.text('content');
      }),

      Schema.createTable('authors_posts', function(table) {
        table.increments('id');
        table.integer('author_id');
        table.integer('post_id');
      }),

      Schema.createTable('tags', function(table) {
        table.increments('id');
        table.string('name');
      }),

      Schema.createTable('posts_tags', function(table) {
        table.increments('id');
        table.integer('post_id');
        table.integer('tag_id');
      }),

      Schema.createTable('comments', function(table) {
        table.increments('id');
        table.integer('post_id');
        table.string('name');
        table.string('email');
        table.text('comment');
      })
    
    ]);

  });

};