var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  request = require('request');
  Search = mongoose.model('Search');

module.exports = function (app) {
  app.use('/', router);
};


var cx = '012824588551273422190:_vqtcpfysom'
var key = 'AIzaSyD7snD0Pp0v1sadfYoh18WPddamXuMnKwU'
var originalSearchUrl = 'https://www.googleapis.com/customsearch/v1?searchType=image&cx=' + cx + '&key=' + key + '&q=';

router.get('/', function (req, res, next) {
    res.render('index');
});


router.get('/api/imagesearch/', (req, res) => {

  var query = req.param('q');
  var res_data = [];

  // If the query is not empty
  if(/\S/.test(query)) {
    // Create the search url
    searchUrl = originalSearchUrl + query;

    // Create Date object
    var date = new Date();

    // save the user query with the acctual
    var search = new Search({term : query, when : date.toJSON()})

    // Create the new url entry in the database
    search.save((err) => {
      if (err) console.log(err);
    });

    // Make the request and create the json response
    request(searchUrl, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var items = JSON.parse(body).items;
            for(i in items){
              res_data.push({
                url : items[i].link,
                snippet : items[i].snippet,
                thumbnail : items[i].image.thumbnailLink,
                context : items[i].image.contextLink
              })
            }
            return res.json(res_data);
        }
    })

  } else {
    return res.json({
      'message' : 'no query param'
    })
  }
})


router.get('/api/latest/imagesearch/', (req, res) => {

  // Set the query to order by when field reverse
  var query = Search.find({}, null, {sort : {'when' : -1}});

  // select the term and when field from the document
  query.select({
    '_id' : 0,
    'term' : 1,
    'when' : 1,
  });

  // Execute the query and return the data as json
  query.exec((err, data) => {
    if (err) return next(err)
    res.json(data)
  })
})
