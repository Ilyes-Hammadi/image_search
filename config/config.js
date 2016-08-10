var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var dbPath = 'mongodb://ilyes:ilyes123456@ds153745.mlab.com:53745/image-search-microservice';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'image-search-microservice'
    },
    port: process.env.PORT || 3000,
    db: dbPath
  },

  test: {
    root: rootPath,
    app: {
      name: 'image-search-microservice'
    },
    port: process.env.PORT || 3000,
    db: dbPath
  },

  production: {
    root: rootPath,
    app: {
      name: 'image-search-microservice'
    },
    port: process.env.PORT || 3000,
    db: dbPath
  }
};

module.exports = config[env];
