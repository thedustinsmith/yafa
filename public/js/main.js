$(function() {

	var name = window.location.hash;
	if(name) {
		name = ', ' + name.substring(1) + ', ';
	}
	else {
		name = ' ';
	}

	var messageContainer = $("#message-span");
	messageContainer.typed({
		strings: ['Hey there', "How you doin'?", "You know what?", "You are fcinkg", "You" + name + "are effing Awesome!"],
		typeSpeed: 100,
		backDelay: 250,
		callback: function() {
			$("#footer-container").addClass("done");
		}
	});
});