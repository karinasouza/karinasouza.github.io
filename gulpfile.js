const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const connect = require('gulp-connect');

gulp.task('connect', function () {
	connect.server({
		livereload: true,
		port: 4000
	});
});

gulp.task('browserSync', function () {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
});


gulp.task('sass', function () {
	return gulp.src('./sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
	gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('dev', ['browserSync', 'sass', 'sass:watch'], function () {
	gulp.watch('*.html', browserSync.reload);
	gulp.watch('./sass/**/*.scss', browserSync.reload);
});

gulp.task('default', ['connect', 'dev']);