var Posting = require('../models/posting');


// Handle posting creation on POST.
exports.posting_create = [

    (req, res, next) => {

    // Generate random 10-digit number id
          function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
          };
          var new_id = getRandomInt(9999999999);
    // Create new posting
        var posting = new Posting({
            title: req.body.title,
            condition: req.body.condition,
            price: req.body.price,
            description: req.body.description,
            location: req.body.location,
            id_posting: new_id,
            // the member should be logged in, so they shouldn't need to enter their id #
            // this needs to be fixed in the future
            id_member: req.body.id_member,
            image: req.body.image,
        });
    // Enter new member into database
        Posting.create(posting);
             res.send(req.body.title+" "+new_id+" is now listed");
             console.log("new posting: "+req.body.title+" "+new_id);
        }];
