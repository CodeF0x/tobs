const gulp = require('gulp');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');

gulp.task('copy', () => {
  gulp.src('app/src/img/icons/icon.png').pipe(gulp.dest('build/src/img/icons'));

  return gulp.src('app/lib/**/*').pipe(gulp.dest('build/lib'));
});

gulp.task('minify-js', () => {
  gulp
    .src('app/src/**/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/src'));

  return gulp
    .src('app/main.js')
    .pipe(terser())
    .pipe(gulp.dest('build'));
});

gulp.task('minify-css', () => {
  return gulp
    .src('app/src/**/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('build/src'));
});

gulp.task('minify-html', () => {
  return gulp
    .src('app/src/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build/src'));
})

gulp.task('compile', gulp.series('copy', 'minify-js', 'minify-css', 'minify-html'));
