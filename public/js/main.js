$(function() {

	var messages = $("#msg-holder span").remove().map(function() {
		return $(this).text();
	});

	if (messages.length === 0) {
		var name = ' ';
		if (window.location.hash) {
			name = window.location.hash.substring(1);
		}
		messages = ['Hey', 'Thanks for visiting', 'But you were given this url for a reason',
			 'That reason is pretty simple' + name + '....', 'You are fkicng', 'You are effing Awesome!'];
	}

	var createLink = "<a href='/add' class='create-link'>Make your own</a>";
	var messageContainer = $("#message-span");
	if(messageContainer.length > 0) {
		messageContainer.typed({
			strings: messages,
			typeSpeed: 100,
			backDelay: 250,
			callback: function() {
				var $cl = $(createLink);
				$("<div />").appendTo($("#message-container")).append($cl);
				setTimeout(function() {
					$cl.addClass('show');
				}, 250);
			}
		});
	}
});
