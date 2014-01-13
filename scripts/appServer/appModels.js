var bookshelf = require('bookshelf');

bookshelf.pg = bookshelf.initialize({
  client: 'postgres',
  connection: {
    host     : 'localhost',
	port     : '5432',
    user     : 'postgres',
    password : 'geopostgres',
    database : 'Database_Name',
    charset  : 'utf8'
  }
});

