var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css');


gulp.task('debug', function() {
   console.log('Bugs totally removed.');
});

gulp.task('pug', function() {
    gulp.src(['src/*.pug'])
        .pipe(pug())
        .pipe(gulp.dest('build'));
});

gulp.task('styles', function() {
    gulp.src(['src/style/*.scss'])
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gulp.dest('build/style'));
});

gulp.task('static', function() {
    gulp.src('src/static/*')
        .pipe(gulp.dest('build/static'));
});

gulp.task('default', ['pug', 'styles', 'static'], function () {
    gulp.watch('**/*.pug', ['pug']);
    gulp.watch('**/*.scss', ['styles']);
    gulp.watch('src/static/*', ['static']);
});