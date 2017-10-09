var gulp = require('gulp'),
modernizr = require('gulp-modernizr'); // gulp-modernizr enables us to build custom versions of modernizr to keep the file as small and efficient as possible

gulp.task('modernizr', function() {
  return gulp.src(['./app/assets/styles/**/*.css', './app/assets/scripts/**/*.js']) // Here we point it to our CSS and JS files as a reference
    .pipe(modernizr({
      "options": [
        "setClasses"
      ]
    }))
    .pipe(gulp.dest('./app/temp/scripts/'));
});