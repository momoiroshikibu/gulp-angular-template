/* globals require __dirname */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    coffee = require('gulp-coffee'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean'),
    bowerFiles = require('main-bower-files'),
    kss = require('gulp-kss')
;


gulp.task('coffee', function() {
  gulp.src('src/coffee/*.coffee')
  .pipe(coffee())
  .pipe(gulp.dest('dist/js/compiled'));
});


gulp.task('js', function() {
  gulp.src(['dist/javascripts/**/*.js'])
  .pipe(uglify())
  .pipe(gulp.dest('dist/js/minified'));
});


gulp.task('sass', function() {
  gulp.src('src/sass/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('dist/css'))
  .pipe(connect.reload());
});


gulp.task('resource', function() {
  gulp.src('src/images/**/*.*')
  .pipe(gulp.dest('dist/images'));
  gulp.src('src/html/**/*.html')
  .pipe(gulp.dest('dist/html'))
  .pipe(connect.reload());
});


gulp.task("bower-files", function() {
  gulp.src(bowerFiles(), {
    base: 'bower_components'
  }).pipe(gulp.dest('dist/vendor/assets'));
});


gulp.task('watch', function() {
  gulp.watch('src/coffee/**', ['coffee']);
  gulp.watch('src/sass/**', ['sass']);
  gulp.watch('src/html/**', ['resource']);
});


gulp.task('live-watch', function() {
  gulp.run('serve');
  gulp.watch('src/coffee/**', ['coffee', 'reload']);
  gulp.watch('src/sass/**', ['sass', 'reload']);
  gulp.watch('src/html/**', ['resource', 'reload']);
  gulp.watch('src/images/**', ['resource', 'reload']);
});


gulp.task('clean', function() {
  gulp.src('dist')
  .pipe(clean());
});


gulp.task('kss', function() {
  gulp.src(['src/stylesheets/**/*.sass'])
  .pipe(kss({
    overview: __dirname + '/src/stylesheets/styleguide.md'
  }))
  .pipe(gulp.dest('dist/styleguide/'));
});


gulp.task('serve', function() {
  connect.server({
    root: 'dist',
    port: 3000,
    livereload: true
  });
});


gulp.task('reload', function() {
  connect.reload();
});


gulp.task('default', ['coffee', 'js', 'sass', 'resource']);
