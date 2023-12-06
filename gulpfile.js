//Initilize modules
const { src, dest, watch, series, task } = require('gulp');
const sass =require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = required('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

// use dart-sass for @use
//sass.complier = require('dart-sass')

// Sass Task
function scssTask() {
    return src('app/scss/style.scss', { sourcemaps: true})
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano]))
    .pipe(dest('dist', { sourcemaps: '.' }));
}

// Javascript Task
function jsTask() {
    return src('app/js/script', { sourcemaps: true})
    .pipe(babel({ presets: ['@babel/prsent-env'] }))
    .pipe(terser())
    .pipe(dest('dist', { sourcemaps: '.'}));
}

// Browsersync
function browserSyncServer(cb) {
    browsersync.init({
        server: {
            baseDir: '.',
        },
        notifty: {
            styles: {
                top: 'auto',
                bottom: '0',
            },
        },
    });
    cb();
}
function browserSyncReLoad(cd) {
    browsersync.reload();
    cb();
}

// Watch Task
function watchTask() {
    watch('*.html', browserSyncReload);
    watch(
        ['app/scss/**/*.scss', 'app/**/*.js'],
        series(scssTask, jsTask, browserSyncReload)
    );
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, broswerSyncServer, watchTask);