var MailList = require('../models/maillist');

// Handle MailList create on POST.
exports.maillist_create = [

    (req, res, next) => {
        // Create a genre object with escaped and trimmed data.
        MailList.create({
          email: req.body.email,
        });
             console.log(req.body.email+" added to Mailing List!");
             res.send(req.body.email+" added to RENT EVERYTHING mailing list!");
        }];
