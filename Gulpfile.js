const gulp = require('gulp');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const clean = require('gulp-clean');
const { exec } = require('child_process');

gulp.task('copy', () => {
  gulp.src('app/src/img/icons/**/*').pipe(gulp.dest('build/src/img/icons'));

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
});

gulp.task('install', cb => {
  gulp
    .src('node_modules', {read: false})
    .pipe(clean());

  return exec('yarn', (error, stdout, stderr) => {
    console.log(stdout);
    console.error(stderr);
    cb(error);
  });
});

gulp.task('build', cb => {
  return exec('electron-builder --mac --win', (error, stdout, stderr) => {
    console.log(stdout);
    console.error(stderr);
    cb(error);
  });
});

gulp.task('compile', gulp.series('install', 'copy', 'minify-js', 'minify-css', 'minify-html', 'build'));
