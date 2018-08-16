var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  base64 = require('gulp-base64-inline'),
  cleanCSS = require('gulp-clean-css'),
  minifyCSS = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  notify = require("gulp-notify"),
  livereload = require('gulp-livereload'),
  server = require('gulp-server-livereload'),
  sass = require('gulp-sass');

gulp.task('server', function() {
  gulp.src('docs')
  .pipe(server({
      livereload: true,
      open: true,
      port: 8000
    })
  ).pipe(notify('Server start!'));
});



gulp.task('sass', function() {
  gulp.src(['docs/scss/main.scss', 'docs/scss/*.scss'])
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({browsers: ['last 3 versions']}))
  .pipe(base64('../**/'))
  .pipe(concat('styles.css'))
  .pipe(minifyCSS({ keepBreaks: true }))
  .pipe(cleanCSS({ format: 'beautify'}))
  .pipe(gulp.dest('docs/css/'))
  .pipe(livereload());
});

gulp.task('html', function() {
  gulp.src('docs/*.html')
  .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('docs/scss/*.scss', ['sass']);
  gulp.watch('docs/*.html', ['html']);
});

gulp.task('default', ['server', 'html', 'sass', 'watch']);