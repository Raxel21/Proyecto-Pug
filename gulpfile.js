// Plugins
const { src, dest, series, watch } = require('gulp');
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

exports.html = html;
