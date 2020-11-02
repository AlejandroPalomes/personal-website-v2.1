const gulp = require('gulp');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');

function cssfy(){
    return (
        gulp
            .src('./src/css/styles.scss')
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('./src/css/'))
            .pipe(notify({message: 'Sass compiled!', onLast: true}))
    )
}

function watch(){
    gulp.watch('./src/css/**/*.scss', cssfy)
}

exports.cssfy = cssfy;
exports.watch = watch;