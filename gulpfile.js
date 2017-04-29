var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

gulp.task('debug', function() {
   console.log('Bugs totally removed.');
});

gulp.task('pug', function() {
    gulp.src(['src/*.pug'])
        .pipe(pug())
        .pipe(gulp.dest('build'))
});

gulp.task('styles', function() {
    gulp.src(['src/style/*.scss'])
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gulp.dest('build/style'))
});

gulp.task('default', ['pug', 'styles']);