var Posting = require('../models/posting');

  function loadPage(req, res, layout, file_id, title, data ){
    res.render(layout, {
      page: function(){ return file_id},
      scripts: function(){ return file_id+'_scripts'},
      links: function(){ return file_id+'_links'},
      title: title,
      nav: file_id,
      data: data,
      user: req.session.user,
    })};

// Handle posting creation on POST.
exports.posting_create = [

    (req, res, next) => {

    // Generate random 10-digit number id
          function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
          };
          var new_id = getRandomInt(9999999999);
          console.log(req.session)
    // Create new posting
        var posting = new Posting({
            title: req.body.title,
            condition: req.body.condition,
            price: req.body.price,
            description: req.body.description,
            location: req.body.location,
            id_posting: new_id,
            image: req.body.image,
            seller_email: req.session.user.email,
            seller_name: req.session.user.name,
            seller_image: req.session.user.image,
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

exports.posting_list_all = [
    (req, res, next) => {
        return Posting
            .find()
            .then(function (inventory) {
                console.log(inventory)
                loadPage(req, res, 'base', 'inventory', 'Available Listings',inventory)
                }
            )}
];