// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SearchSchema = new Schema({
  term: String,
  when: String
});

mongoose.model('Search', SearchSchema);
