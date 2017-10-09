var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del'),
svg2png = require('gulp-svg2png');

var config = {
    shape: {
        spacing: {
            padding: 1
        }
    },
    mode: {
        css: {
            variables: {
                replaceSvgWithPng: function() {
                    return function(sprite, render) {
                        return render(sprite).split('.svg').join('.png');
                  }
              }
            },
            sprite: 'sprite.svg',
            render: {
                css: {
                    template: './gulp/templates/sprite.css'
                }
            }
        }
    }
}

// This task is to clean up our sprite files. This task will delete the old Sprites folder before the rest of the tasks create a new one and populate it. This will use the "del" npm package.
gulp.task('beginClean', function() {
  return del(['./app/temp/sprite', './app/assets/images/sprites']); //This will delete these two folders
});

gulp.task('createSprite', ['beginClean'], function() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('createPngCopy', ['createSprite'], function() {
    return gulp.src('./app/temp/sprite/css/*.svg')
      .pipe(svg2png())
      .pipe(gulp.dest('./app/temp/sprite/css'));
});

gulp.task('copySpriteGraphic', ['createPngCopy'], function() {
    return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
      .pipe(gulp.dest('./app/assets/images/sprites'));
});

// The bit in the square brackets indicates a dependency on the createSprite task
gulp.task('copySpriteCSS', ['createSprite'], function() {
    return gulp.src('./app/temp/sprite/css/*.css')
      .pipe(rename('_sprite.css'))
      .pipe(gulp.dest('./app/assets/styles/modules'));
});

// The purpose of the next task is to clean up by removing the temp/sprite folder which is no longer required
gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function() {
    return del('./app/temp/sprite');
});

gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);

// Triggering these tasks uses 'gulp icons' from the CLI