var form = $("#form");
form.submit(function(e) {
    e.preventDefault();
    var url = $(this).attr("action");
    var formData = $(this).serialize();
    $.post(url, formData, function() {
       form.html('<p>Message received! Thanks!</p>');
    });
});
