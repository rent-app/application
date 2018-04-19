var Posting = require('../models/posting');


// Handle posting creation on POST.
exports.posting_create = [

    (req, res, next) => {

    // Generate random 10-digit number id
          function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
          };
          var new_id = getRandomInt(9999999999);
          console.log(req.sessionID)
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
            id_member: req.sessionID,
            image: req.body.image,
        });
    // Enter new member into database
        Posting.create(posting);
             res.render('base',{
                page: function(){return 'posting'},
                scripts: function(){return 'posting_scripts'},
                links: function(){return 'posting_links'},
                title: 'Than you!',
                nav: 'posting',
                thanks: 1
             }

             );
             console.log("new posting: "+req.body.title+" "+new_id);
        }];
