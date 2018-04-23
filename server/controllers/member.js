var Member = require('../models/member');
const bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var loadError = (req, res, msg) => {
  res.status(401).redirect('/error?msg='+encodeURIComponent(msg))
}

// Handle Member creation on POST.
exports.member_create = [

  (req, res, next) => {
    // Check to ensure inputs are valid.
    //check the email is not already registered
    member = Member.find({ email: req.body.email.toLowerCase}, function(err, member) {
      if (err) throw err;
      if (member.length) loadError(req, res, 'Email is already exsists used')
      return 'pass'
    })
    .then(output => {
      //checks if the length of inputs is too long
      lengthcheck = [req.body.name, req.body.email, req.body.pwd];
      for(var i = 0; i < 3; i++)
        if(lengthcheck[i].length > 50) loadError(req, res, 'Name, email and body must be below 50 characters');

      //check the email format is correct
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))
        loadError(req, res, 'Name, email and body must be below 50 characters');

      //check if image_url is jpeg,jpg...
      // console.log(req.body.image_url.match(/\.(jpeg|jpg|gif|png)$/))
      if(req.body.image_url.match(/\.(jpeg|jpg|gif|png)$/))
        loadError(req, res, 'Image URL must be jpeg, jpg, gif or png. Leave blank for default image.');

      //check that password and password confirm match
      if (req.body.pwd!=req.body.pwd_confirm)
        loadError(req, res, 'Passwords do not match.');

      return 'pass'
    })
    .then(output => {
        // Hashes password
        var hash = bcrypt.hashSync(req.body.pwd, salt)
        // Generate random 10-digit number id
        // Enter new member into database
        Member.create({
            name: req.body.name,
            email: req.body.email,
            image_url: req.body.image_url || 'https://orig00.deviantart.net/10e3/f/2013/114/8/4/facebook_default_profile_picture___clone_trooper_by_captaintom-d62v2dr.jpg',
            hashed_password: hash,
        })
        .then(output => {
          // Load the listings page
          console.log(req.body.name+" is now a member");
          res.redirect('/inventory')
        })
        .catch(error => {
          loadError(req, res, 'Oops.. Something Went wrong.');
        })
    })
  }
];

// Test - Create Variables for member post
exports.member_test_create = [

    (req, res, next) => {
        // fake variables to test
        var username = "Tester6";
        var first_name = "Jamie";
        var last_name = "Smith";
        var email = 'Jest@email.com';
        var phone = '555-666-12345';
        var password = 'password';

        // Hashes password
        var hash = bcrypt.hashSync(password, salt)
        // Generate random 10-digit number id
          function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
          };
          var new_id = getRandomInt(9999999999);
        // Create new member
        var member = new Member({
            username: username,
            first_name: first_name,
            last_name: last_name,
            email: email,
            id_member: new_id,
            phone: phone,
            hashed_password: hash,
        });
        // Enter new member into database
        Member.create(member);
             res.send(username+" "+new_id+" is now a member");
             console.log(username+" "+new_id+" is now a member");
        }];
