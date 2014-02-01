var db = require('../models');

module.exports = function(app) {

    /* Teaser page - can be removed after go live */
    if (!!app.globals.SHOW_TEASER) {
        app.get('*', function (req, res) {
            res.render('teaser', {});
        });
        console.log('teasing');
        return;
    }


	app.get('/', function(req, res) {
        res.render('index', { });
    });

    require('./add')(app);
    require('./custom')(app);


	/* This has to be the last route registered.  As a fallback */
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
    			messages: sortedMessages,
                bgColor: messages[0].bgColor,
                textColor: messages[0].textColor
    		});
    	});
    });
};
