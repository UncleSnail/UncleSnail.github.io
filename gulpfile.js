const { src, dest, watch, parallel, series } = require('gulp');
const gulp_sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const changed = require('gulp-changed');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const coffee = require('gulp-coffee');
const babel = require('gulp-babel');
const clean_css = require('gulp-clean-css');

function watchAll() {
  //Run browser-sync and sass when task starts,
  //then when a sass file changes, run sass again.
  watch('app/scss/**/*.+(scss|sass)', { ignoreInitial: false }, sass);
  watch('app/html/*.html', { ignoreInitial: false }, html).on('change', browserSync.reload);
  watch('app/js/**/*.js', { ignoreInitial: false }, js).on('change', browserSync.reload);
  //**/* means check subdirectories.
}

function html() {
  return src('app/html/*.html')
    .pipe(changed('dist'))
    .pipe(dest('dist/'));
}

function sass() {
  // Don't use "changed" because if any file is changed, all need to be re-compiled
  return src('app/scss/*.+(scss|sass)')
    .pipe(plumber())
    .pipe(gulp_sass())
    .pipe(autoprefixer({
      browsers: ['last 5 versions']
    }))
    .pipe(dest('app/pretty_transpiled/css'))
    .pipe(clean_css())
    .pipe(dest('dist/'))
    .pipe(browserSync.stream());
}

function js() {
  return src('app/js/*.coffee')
    .pipe(changed('dist/js'))
    .pipe(coffee())
    .pipe(src('app/js/*.js'))
    .pipe(changed('dist/js'))
    .pipe(babel())
    .pipe(dest('app/pretty_transpiled/js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('dist/js'));
}

function images() {
  return src('app/images/**/*.+(png|jpg|gif|svg)')
    .pipe(changed('dist/images'))
    .pipe(imagemin())
    .pipe(dest('dist/images'));
}

function fonts() {
  //broken!
  /*
  return gulp.src('app/*.css')
    .pipe(cssUseref({
      match: '*.+(otf|eot|ttf|woff|woff2)'
    }))
    .pipe(gulp.dest('dist/fonts'));
    */

  //Temporary copy all files.
  return src('app/fonts/**/*.+(otf|eot|ttf|woff|woff2)')
    .pipe(changed('dist/fonts'))
    .pipe(dest('dist/fonts'));
}

function browser_sync() {
  browserSync.init({
    browser: 'C:/Program Files/Firefox Developer Edition/firefox.exe',
    server: {
        baseDir: 'dist'
    }
  });
  return;
}

exports.default = parallel(fonts, images, js, sass, html);
exports.watch = parallel(fonts, images, browser_sync, watchAll);
