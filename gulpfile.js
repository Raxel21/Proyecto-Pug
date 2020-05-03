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
  scripts: {
    src: './app/js/',
  },
  html: {
    src: './app/views/',
    dest: './dist/',
  },
  node: {
    mdb: './node_modules/mdbootstrap/',
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

function watchAndServe() {
  browserSync.init({
    server: {
      baseDir: './dist/',
    },
    notify: false,
  });
  watch(paths.styles.src, styles);
  watch(paths.html.src + '**/*.pug', html);
  watch(paths.scripts.src + '**/*.js', copyUserJS);
  watch(paths.html.dest + '**/*.html').on(
    'change',
    browserSync.reload
  );
  watch(paths.html.dest + 'js/**/*.js').on(
    'change',
    browserSync.reload
  );
}

function copyBootstrapCSS() {
  return src(paths.node.mdb + 'css/*.css').pipe(
    dest(paths.html.dest + 'libs/css/')
  );
}

function copyBootstrapJS() {
  return src(paths.node.mdb + 'js/*.js').pipe(
    dest(paths.html.dest + 'libs/js/')
  );
}

function copyUserJS() {
  return src(paths.scripts.src + '**/*.js').pipe(
    dest(paths.html.dest + 'js/')
  );
}

exports.html = html;
exports.styles = styles;
exports.watch = watchAndServe;
exports.copy = series(
  copyBootstrapCSS,
  copyBootstrapJS,
  copyUserJS
);
exports.default = series(
  html,
  copyUserJS,
  styles,
  watchAndServe
);
