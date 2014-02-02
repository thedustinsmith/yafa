$(function() {
	$("body").on('keyup', 'textarea', function() {
		var val = $(this).val();
		var isLast = $(this).parent().is(":last-child");

		if (val !== '' && isLast) {
			var parentClone = $(this).parent().clone();
			parentClone.find("textarea").val("");
			parentClone.appendTo($(this).parent().parent());
		}
		else if (val === '' && !isLast) {
			var nextTextAreas = $(this).parent().nextAll().find("textarea");
			var emptyTextAreas = nextTextAreas.filter(function() {
				return $(this).val() === '';
			});
			if (emptyTextAreas.length === nextTextAreas.length) { // if all of the following text boxes are empty remove the last one
				nextTextAreas.last().parent().remove();
			}
		}
	});

	var form = $("#add-form");
	form.find("button").on('click', function (ev) {
		ev.preventDefault();

		var textareas = form.find("textarea");
		var valid = textareas.filter(function () {
			return $.trim($(this).val()) !== '';
		}).length > 0;

		if(!valid) {
			alert("C'mon...At least type in a message!");
			return false;
		}

		$.post(form.attr("action"), 
			form.serialize(), 
			function (resp) {
				showResult(resp.data.shareUrl);
			});
	});

	var $body = $("body");
	$(".color-picker").spectrum({
		clickoutFiresChange: true,
		change: function(color) {
			var hex = color.toHexString();
			$(this).val(hex);
			$body.css($(this).data("cssprop"), hex);
		}
	}).each(function() {
		$(this).spectrum('set', $body.css($(this).data("cssprop")));
	});

	//var addContainer = $("#add-container");
	var resultContainer = $("#result-container");
	var resultLink = resultContainer.find(".result-link");
	function showResult(url) {
		$("body").addClass("result-show");
		resultLink.attr('href', url).text(url);
	}
});