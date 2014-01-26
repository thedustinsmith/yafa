var db = require('../models');

module.exports = function(app) {
	
	app.get('/add', function(req, res) {
		res.render('add', {});
	});

	app.post('/add', function(req, res) {
		var id = generateID();
		var messages = req.body.messages;
		for (var i=0; i<messages.length; i++) {
			var m = messages[i];
			var newMessage = new db.Message({
				groupID: id,
				message: m,
				sort: i
			});
			newMessage.save();
		}

		res.writeHead(200, { 'Content-Type': 'application/json' }); 
		res.write(JSON.stringify({
			success: true,
			data: {
				id: id,
				shareUrl: app.globals.APP_URL + '/' + id
			}
		}));
		res.end();
	});

	function generateID(length) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		if(!length)
			length = 7;

		for( var i=0; i < length; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}
};