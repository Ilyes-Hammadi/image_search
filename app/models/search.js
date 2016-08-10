// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SearchSchema = new Schema({
  term: String,
  when: String
});

SearchSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Search', SearchSchema);
