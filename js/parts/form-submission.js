var form = $("#form");

function submitForm() {
	var url = $(this).attr("action");
	var formData = $(this).serialize();
	$.post(url, formData, function() {
		form.html('<p>Message received! Thanks!</p>');
	});
}

form.submit(function(e) {
	e.preventDefault();

	if ($('html').hasClass('no-formvalidation')) {
		// Validation for outdated browsers
		if ($('#email').val() == '' || $('#message').val() == '') {
			$('form p').remove();
			form.append('<p>Form could not be sent! Please ensure that both the email field and message field are filled out.</p>')
		}
		else {
			$('form p').remove();

			var url = $(this).attr("action");
			var formData = $(this).serialize();
			$.post(url, formData, function() {
				form.html('<p>Message received! Thanks!</p>');
			});
		}
	}
	else {
		var url = $(this).attr("action");
		var formData = $(this).serialize();
		$.post(url, formData, function() {
			form.html('<p>Message received! Thanks!</p>');
		});
	}
});
