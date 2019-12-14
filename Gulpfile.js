const gulp = require('gulp');
const ts = require('gulp-typescript');

gulp.task('compile', () => {
  return gulp
    .src(['app/**/*.ts'])
    .pipe(
      ts({
        noImplicitAny: true
      })
    )
    .pipe(gulp.dest('build/'));
});

gulp.task('copy', () => {
  const filesToMove = ['app/src/index.html'];
  return gulp.src(filesToMove, { base: './app' }).pipe(gulp.dest('build/'));
});

gulp.task('build', gulp.series('compile', 'copy'));
