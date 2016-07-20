// Add data-scroll attribute to the navigation only on the homepage.
// Adding it to the navigation on interior pages will cause it to break.
// https://github.com/cferdinandi/smooth-scroll#animating-links-to-other-pages
if ( window.location.pathname == '/' || window.location.pathname == '/index.php') {
	$('.navigation-list li a').attr('data-scroll', 'data-scroll');
}

smoothScroll.init();
