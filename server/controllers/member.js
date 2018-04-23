var Member = require('../models/member');
const bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

// Handle Member creation on POST.
exports.member_create = [

    (req, res, next) => {
        // Check to ensure inputs are valid. 
        // Start with creating errors array which is added to for each error
        errors = [];

        //check the email is not already registered
          member = Member.find({ email: req.body.email.toLowerCase}, function(err, member) {
          console.log(member)
            if (err) throw err;
            if (member){
              errors.push('Email is already exsists used')
            };
          });
        
        //checks if the length of inputs is too long
        lengthcheck = [req.body.name, req.body.email, req.body.pwd];
                for(var i = 0; i < lengthcheck.length; i++){
        if(lengthcheck.length[i] > 50) {
            errors.push('Name, email and body must be below 50 characters');
          };
        };

        //check the email format is correct
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
          errors.push('Email format is incorrect');
          };        
        
        //check if image_url is jpeg,jpg...
        console.log(req.body.image_url.match(/\.(jpeg|jpg|gif|png)$/))
        if(req.body.image_url.match(/\.(jpeg|jpg|gif|png)$/)){
          errors.push('Image URL must be jpeg, jpg, gif or png. Leave blank for default image.')
        };

        //check that password and password confirm match
        if (req.body.pwd!=req.body.pwd_confirm){
          errors.push('Passwords do not match');
        };
      
      console.log('final check' + errors)
      setTimeout(function(){
      if (!errors){
        // Hashes password
        var hash = bcrypt.hashSync(req.body.pwd, salt)
        // Generate random 10-digit number id

        // Enter new member into database
        Member.create({
            name: req.body.name,
            email: req.body.email,
            image_url: req.body.image_url,
            hashed_password: hash,
        });
        console.log(req.body.name+" is now a member");
        res.render('full',{
          page: function(){return 'home'},
          scripts: function(){return 'home_scripts'},
          links: function(){return 'home_links'},
          title: 'Welcome',
          nav: 'home',
          name: req.body.name
       });
      }
      else {
        console.log(errors);
        res.render('full',{
          page: function(){return 'home'},
          scripts: function(){return 'home_scripts'},
          links: function(){return 'home_links'},
          title: 'Welcome',
          nav: 'home',
          errors: errors
       });
      }
    }, 1000);
            }];
        
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