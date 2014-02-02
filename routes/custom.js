module.exports = function (app) {

	app.get('/Jen', function (req, res) {
		res.render('view', {
			messages: ['Hi Jen', "How's it going?"]
		});
	});


};