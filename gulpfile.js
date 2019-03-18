const { src, dest } = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
//var cssUseref = require('gulp-css-useref');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var changed = require('gulp-changed');

function defaultTask(cb) {
  cd();
}

function watch() {
  return src('app/')
}

gulp.task('watch', ['browser-sync', 'sass', 'html'], function() {
  //Run browser-sync and sass when tast starts,
  //then when a sass file changes, run sass again.
  gulp.watch('app/scss/**/*.+(scss|sass)', ['sass']);
  gulp.watch('app/html/*.html', ['html']).on('change', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  //**/* means check subdirectories.
});

function html() {
  return src('app/html/*.html')
    .pipe(dest('dist/'))
}

gulp.task('html', function() {
  //Will be the task to compile pug. For now it just copies the html.
  return gulp.src('app/html/*.html')
    .pipe(changed('dist'))
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
  return gulp.src('app/scss/*.+(scss|sass)')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
    .pipe(changed('dist/images'))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function() {
  //broken!
  /*
  return gulp.src('app/*.css')
    .pipe(cssUseref({
      match: '*.+(otf|eot|ttf|woff|woff2)'
    }))
    .pipe(gulp.dest('dist/fonts'));
    */

  //Temporary copy all files.
  return gulp.src('app/fonts/**/*.+(otf|eot|ttf|woff|woff2)')
    .pipe(changed('dist/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
      browser: 'firefox-dev',
      server: {
          baseDir: 'dist'
      }
    });
});

exports.default = defaultTask
