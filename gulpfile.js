var gulp = require('gulp'),
	runSequence = require('run-sequence'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	minify = require('gulp-minify');

gulp.task('concat', function() {
	return gulp.src(['js/parts/smooth-scroll.js', 'js/parts/smooth-scroll-init.js', 'js/parts/form-submission.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('main.js'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('js'));
});

gulp.task('minifyJS', function() {
	return gulp.src('js/main.js')
		.pipe(minify({
			ext: {
				src: '.js',
				min: '.min.js'
			}
		}))
		.pipe(gulp.dest('js'));
});

gulp.task('default', function(callback) {
	runSequence('concat', 'minifyJS');
});
