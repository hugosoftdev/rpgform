var gulp = require('gulp');
var jsonlint = require('gulp-jsonlint');
var jsonminify = require('gulp-jsonminify');

gulp.task('build', function() {
	return gulp.src('src/**/*.json')
		.pipe(jsonlint())
		.pipe(jsonminify())
		.pipe(gulp.dest('data'));
});

gulp.task('default', ['build']);

