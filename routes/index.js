
/*
 * GET home page.
 */
module.exports = function (app) {
	app.get('/',function(req,res){
		res.redirect('/index.htm');
	});
	app.get('/index.htm', function(req, res){
		res.render('index', {
			title: 'xx-首页'
			
		});
		// });
	});
	
	return app.router;
};