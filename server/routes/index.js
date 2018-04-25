const memberController = require('../controllers/member');
const maillistController = require('../controllers/maillist');
const postingController = require('../controllers/posting');
const fetch = require('node-fetch');
const fs = require('fs');



module.exports = (app, sessionChecker, loadError) => {
  // Wrapper function to fetch
  function _api(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  }
  // Helper function to wrapp page load redering
  function loadPage(req, res, layout, file_id, title, data ){
    res.render(layout, {
      page: function(){ return file_id},
      scripts: function(){ return file_id+'_scripts'},
      links: function(){ return file_id+'_links'},
      title: title,
      nav: file_id,
      data: data,
      user: req.session.user,
    });

  }

  function sessionChecker(req,res,next){
    console.log(req.session.user)
    if (!req.session.user) return loadError(req,res, 'You must be logged in for this function')
    next()
  }

  // route for new Mailing List email
  app.post('/maillist/create', maillistController.maillist_create);

  // route for new Member
  app.post('/member/create', memberController.member_create);
  // route for Logging In
  app.post('/member/login', memberController.member_login);
  // test route for fake new Member
  app.post('/member/test', memberController.member_test_create);

    // route for Posting-Page
  app.get('/posting', sessionChecker, (req, res) => loadPage(req, res, 'base', 'posting', 'Post Your Item'));
  // route for Error Page
  app.get('/error', (req, res) => res.render('base', {
        page: function(){ return 'error'},
        title: 'Error',
        nav: 'error',
        scripts: function(){ return 'error_scripts'},
        links: function(){ return 'error_links'},
        message: req.query.msg
      }));

  // route for new Posting
  app.post('/posting/create', postingController.posting_create);

  //route

  // route for Home-Page
app.get('/',  (req, res) => loadPage(req, res, 'full', 'home', 'Welcome'));
  // route for Inventory-Page
app.get('/inventory', sessionChecker, (req, res) => postingController.posting_list_all(req, res, loadPage));




//app.post('/login', membersController.login)
      // route for user's dashboard
app.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.render('dashboard', {
          user: req.session.user
        });
    } else {
        res.redirect('/login');
    }
});
// route for user logout
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Rent Everything API!',
  }));

//  app.post('/api/members', membersController.create);

  // route for handling 404 requests(unavailable routes)
  app.use(function (req, res, next) {
    // res.status(404).send("Sorry can't find that!")
    loadError(req, res, 'Oops.. Something Went wrong.');
  });


};
