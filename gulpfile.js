'use strict';

//  Common plugins
var babelify = require('babelify'),
    browserify = require('browserify'),
    browserSync = require("browser-sync"),
    concat = require('gulp-concat'),
    gulp = require('gulp'),
    reload = browserSync.reload,
    rigger = require('gulp-rigger'),
    rimraf = require('rimraf'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch');

//  CSS plugins
var sass = require('gulp-sass'),
    //cssmin = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    moduleImporter = require('sass-module-importer');

//  JS plugins
//var uglify = require('gulp-uglify');

//  Image plugins
//imagemin = require('gulp-imagemin'),
//pngquant = require('imagemin-pngquant'),

const DIR = './';
var paths = {
    build: {
        //  output
        base: 'dist/',
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/img/',
        fonts: 'dist/fonts/'
    },
    src: {
        //  sources
        base: 'app/',
        html: 'app/*.html',
        js: 'app/js/app.js',
        //js: 'app/js/**/*.js',
        style: 'app/sass/style.scss',
        img: 'app/img/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    watch: {
        //  files watch to
        base: 'app/',
        html: 'app/**/*.html',
        js: 'app/js/**/*.js',
        style: 'app/sass/**/*.scss',
        img: 'app/img/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    clean: DIR + 'dist/*'
};

var config = {
    server: {
        baseDir: "./dist"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Gulp"
};


//  Development tasks

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('watch', function () {
    gulp.watch(paths.watch.html, gulp.parallel('html:build'));
    gulp.watch(paths.watch.style, gulp.parallel('style:build'));
    gulp.watch(paths.watch.js, gulp.parallel('js:build'));
});

gulp.task('html:build', function () {
    return gulp.src(paths.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(paths.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    return browserify(
        {
            entries: paths.src.js,
            extensions: ['.js'],
            debug: true
        })
        .transform('babelify', {
            presets: ['es2015'],
        })
        .bundle()
        .pipe(source('js/app.js'))
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    return gulp.src(paths.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({ importer: moduleImporter() }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        //.pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function () {
    return gulp.src(paths.src.fonts)
        .pipe(gulp.dest(paths.build.fonts))
});

gulp.task('img:build', function () {
    return gulp.src(paths.src.img)
        .pipe(gulp.dest(paths.build.img))
});

gulp.task('clean', function (cb) {
    rimraf(paths.clean, cb);
});

gulp.task('build', gulp.series('clean', gulp.parallel(
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'img:build'
)));

gulp.task('default', gulp.series('build', gulp.parallel('watch', 'webserver')));


//  Init tasks

gulp.task('init', gulp.series('build'));