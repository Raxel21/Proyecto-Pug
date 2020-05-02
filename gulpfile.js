// Plugins
const { src, dest, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');

// Rutas de los archivos
const paths = {
  styles: {
    src: './app/scss/**/*.scss',
    dest: './dist/css/',
  },
  html: {
    src: './app/views/',
    dest: './dist/',
  },
};

function html() {
  return src(paths.html.src + '*.pug')
    .pipe(pug())
    .pipe(dest('./dist/'));
}

function styles() {
  return src(paths.styles.src)
    .pipe(
      sass({
        includePaths: ['./app/scss/'],
        errLogToConsole: true,
        outputStyle: 'compressed',
        onError: browserSync.notify,
      })
    )
    .pipe(dest('./dist/css/'))
    .pipe(browserSync.stream());
}

exports.html = html;
exports.styles = styles;
