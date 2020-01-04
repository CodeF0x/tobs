/**
 * This file currently does nothing and is a left-over that will be rewritten once a pipeline is needed.
 */

const gulp = require('gulp');
const ts = require('gulp-typescript');

gulp.task('compile', () => {
  return gulp
    .src(['app/**/*.ts'])
    .pipe(
      ts({
        noImplicitAny: true,
        moduleResolution: 'node',
        module: 'es6',
        target: 'es6'
      })
    )
    .pipe(gulp.dest('build/'));
});

// Only copy files that are NOT .ts or .js files
gulp.task('copy', () => {
  const filesToMove = [
    'app/src/index.html',
    'app/lib/**/*',
    'app/src/css/**/*'
  ];
  return gulp.src(filesToMove, { base: './app' }).pipe(gulp.dest('build/'));
});

gulp.task('build', gulp.series('compile', 'copy'));
