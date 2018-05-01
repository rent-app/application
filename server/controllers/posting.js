var Posting = require('../models/posting');
var Member = require('../models/member')


// Handle posting creation on POST.
exports.posting_create = [

    (req, res, next) => {

    // Generate random 10-digit number id
    // Create new posting
        var posting = new Posting({
            title: req.body.title,
            condition: req.body.condition,
            price: req.body.price,
            description: req.body.description,
            location: req.body.location,
            image: req.body.image,
            seller: req.session.user._id,
        });
    // Enter new member into database
        Posting.create(posting);
             res.redirect('/inventory')
        }];

exports.posting_list_all = (req, res, loadPage) => Posting.
          find({})
          .populate('seller')
          .exec(function(err, Posting){
              if (err) return (err);
            loadPage(req, res, 'base', 'inventory', 'Available Listings', Posting)
          })
