var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'image-search-microservice'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/image-search-microservice-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'image-search-microservice'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/image-search-microservice-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'image-search-microservice'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/image-search-microservice-production'
  }
};

module.exports = config[env];
