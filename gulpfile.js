var gulp = require('gulp');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');
var stylus = require('gulp-stylus');
var jeet = require('jeet');
var rupture = require('rupture');
var nib = require('nib');
var prefixer = require('autoprefixer-stylus');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var sequence = require('run-sequence');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('clean', function(cb) {
    return del(['assets/', 'bower_components/']);
});

gulp.task('stylus', function() {
    return gulp.src('_assets/css/main.styl')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(stylus({
            use: [nib(), prefixer(), jeet(), rupture()],
            compress: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/css'))
        .pipe(connect.reload())
    ;
});

gulp.task('copyJSON', function(){
    return gulp.src('_assets/js/**/*.json')
        .pipe(plumber())
        .pipe(gulp.dest('assets/js/'))
});

gulp.task('js', ['copyJSON'], function() {
    return gulp.src('_assets/js/**/*.js')
        .pipe(plumber())
        .pipe(concat('main.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('assets/js/'))
        .pipe(connect.reload())
    ;
});

gulp.task('sequence', function(callback) {
    sequence(
        ['stylus', 'js'],
        'watch',
        callback
    );
});

gulp.task('watch', function() {
    gulp.watch('_assets/js/**/*.js', ['js']);
    gulp.watch('_assets/css/**/*.styl', ['stylus']);
});

gulp.task('default', ['sequence'], function() {
    connect.server({
        livereload: true
    });
});