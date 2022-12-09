const { src, dest, watch, parallel, series } = require('gulp');
const gulp_sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
// const imagemin = require('gulp-imagemin');
// import imagemin from 'gulp-imagemin';
const plumber = require('gulp-plumber'); // Plumber is used to keep the build running even if there is an error.
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const changed = require('gulp-changed');
const uglifyes = require('uglify-es'); // Needed for ES6 support instead of the default module.
const composer = require('gulp-uglify/composer'); // Compose uglify with uglify-es
const uglify = composer(uglifyes, console); // Create final uglify
const rename = require('gulp-rename');
const coffee = require('gulp-coffee');
const babel = require('gulp-babel');
const clean_css = require('gulp-clean-css');
const filter = require('gulp-filter');

function watchAll() {
  //Run browser-sync and sass when task starts,
  //then when a sass file changes, run sass again.
  watch('app/scss/**/*.+(scss|sass)', { ignoreInitial: false }, sass);
  watch('app/html/*.html', { ignoreInitial: false }, html).on('change', browserSync.reload);
  watch('app/js/**/*.+(js|coffee)', { ignoreInitial: false }, js).on('change', browserSync.reload);
  watch('app/images/**/*.+(png|jpg|gif|svg)', { ignoreInitial: false }, images).on('change', browserSync.reload);
  //**/* means check subdirectories.
}

function html() {
  return src('app/html/*.html')
    .pipe(changed('dist'))
    .pipe(filter(['**/*.html', '!**/index_dev.html']))//Filter so that dev html files are not used. Remove this later if other html files are added.
    .pipe(dest('dist/'));
}

function sass() {
  // Don't use "changed" because if any file is changed, all need to be re-compiled
  return src('app/scss/*.+(scss|sass)')
    .pipe(plumber())
    .pipe(gulp_sass())
    .pipe(postcss([autoprefixer()]))
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
    .pipe(plumber())
    .pipe(babel())
    .pipe(dest('app/pretty_transpiled/js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('dist/js'));
}

function images() {
  return src('app/images/**/*.+(png|jpg|gif|PNG)')
    .pipe(changed('dist/images'))
    // .pipe(imagemin())
    .pipe(src('app/images/**/*.svg'))
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
    server: {
        baseDir: 'dist'
    }
  });
  return;
}

exports.default = parallel(fonts, images, js, sass, html);
exports.watch = parallel(fonts, browser_sync, watchAll);
