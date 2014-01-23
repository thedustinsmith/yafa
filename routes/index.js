var db = require('../models');

module.exports = function(app) {

	app.get('/', function(req, res) {
        res.render('index', { });
    });

    require('./add')(app);





	// This needs to be last
	// it's a fallback
    app.get('/:group', function(req, res) {
    	var groupID = req.param('group');

    	db.Message.getByGroup(groupID, function(err, messages) {
    		if (err) throw err;

    		var sortedMessages =  messages.sort(function(m1, m2) {
				return m1.sort > m2.sort ? 1 : -1;
			}).map(function(m) {
				return m.message;
			});

    		res.render('view', {
    			messages: JSON.stringify(sortedMessages)
    		});
    	});
    });
};
