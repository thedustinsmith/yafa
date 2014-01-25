$(function() {
	$("body").on('keydown', 'textarea', function() {
		if($(this).val() === '' && $(this).parent().is(":last-child")) {
			var parentClone = $(this).parent().clone();
			parentClone.find("textarea").val("");
			parentClone.appendTo($(this).parent().parent());
		}
	});

	var form = $("#add-form");
	form.find("button").on('click', function (ev) {
		ev.preventDefault();
		//var formJson = form.serialize();

		$.post(form.attr("action"), 
			form.serialize(), 
			function (resp) {
				showResult(resp.data.id);
			});

	});

	//var addContainer = $("#add-container");
	var resultContainer = $("#result-container");
	var resultLink = resultContainer.find(".result-link");
	function showResult(id) {
		$("body").addClass("result-show");
		var href = resultLink.attr('href') + id;
		resultLink.attr('href', href).text(href);
	}
});