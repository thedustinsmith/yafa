$(function() {

	var messages = YAFA.messages;
	if(!messages) {
		var name = window.location.hash;
		if(name) {
			name = ' ' + name.substring(1) + ' ';
		}
		else {
			name = ' ';
		}
		messages = ['Hey', 'Thanks for visiting', 'But you were given this url for a reason',
					 'That reason is pretty simple' + name + '....', 'You are fkicng', 'You are effing Awesome!'];
	}

	var messageContainer = $("#message-span");
	if(messageContainer.length > 0) {
		messageContainer.typed({
			strings: messages,
			typeSpeed: 100,
			backDelay: 250,
			callback: function() {
				$("#footer-container").addClass("done");
			}
		});
	}
});
