$(function() {
	$("textarea").on('keydown', function() {
		if($(this).val() === '' && $(this).parent().is(":last-child")) {
			var parentClone = $(this).parent().clone();
			parentClone.find("textarea").val("");
			parentClone.appendTo($(this).parent().parent());
		}
	});
});