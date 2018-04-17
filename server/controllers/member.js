var Member = require('../models/member');
const bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

// Handle Member creation on POST.
exports.member_create = [

    (req, res, next) => {
        // Hashes password
        var hash = bcrypt.hashSync(req.body.password, salt)
        // Generate random 10-digit number id
          function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
          };
          var new_id = getRandomInt(9999999999);
        // Enter new member into database
        Member.create({
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            id_member: new_id,
            phone: req.body.phone,
            hashed_password: hash,
            image: req.body.image,
        });
             res.send(req.body.username+" "+new_id+" is now a member");
             console.log(req.body.username+" "+new_id+" is now a member");
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