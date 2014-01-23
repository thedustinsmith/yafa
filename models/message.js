var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
	groupID: String,
	message: String,
	sort: Number
});

MessageSchema.statics = {
	getByGroup: function(groupID, cb) {
		return this.model('Message').find({groupID: groupID}, cb);
	}
};

exports.Message = mongoose.model('Message', MessageSchema);