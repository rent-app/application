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
            image: req.body.image,
            seller_email: req.session.user,
            seller_name: req.session.name,
            seller_image: req.session.image,
        });
    // Enter new member into database
        Posting.create(posting);
             res.render('base',{
                page: function(){return 'posting'},
                scripts: function(){return 'posting_scripts'},
                links: function(){return 'posting_links'},
                title: 'Thank you!',
                nav: 'posting',
                thanks: 1
             }

             );
             console.log("new posting: "+req.body.title+" "+new_id);
        }];

exports.posting_list_all = (req, res, loadPage) => Posting
          .find().then(data => {
              loadPage(req, res, 'base', 'inventory', 'Available Listings', data)
            })
