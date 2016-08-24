'use strict';

const gulp     = require('gulp');
const sass     = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const del      = require('del');

const fractal  = require('./fractal.js'); // import the Fractal instance configured in the fractal.js file
const logger = fractal.cli.console;      // make use of Fractal's console object for logging

const config = {
    styleguideDir: './styleguide'
};

/*
 * An example of a Gulp task that starts a Fractal development server.
 */

gulp.task('fractal:start', function(){
    // process.chdir(config.styleguideDir);
    const server = fractal.web.server({
        sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.urls.sync.local}`);
    });
});

/*
 * An example of a Gulp task that to run a static export of the web UI.
 */

gulp.task('fractal:build', function(){
    const builder = fractal.web.builder();
    builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
    builder.on('error', err => logger.error(err.message));
    return builder.build().then(() => {
        logger.success('Fractal build completed!');
    });
});

/* CSS */

gulp.task('css:process', function() {
  return gulp.src('assets/sass/build.scss')
    .pipe(sassGlob())
    .pipe(sass())
    .on('error', err => console.log(err.message))
    .pipe(gulp.dest('build/assets/css'));
});

gulp.task('css:clean', function() {
    return del(['build/assets/css']);
});

gulp.task('css:watch', function () {
    gulp.watch([
        'assets/sass/**/*.scss',
        'src/components/**/*.scss'
    ], gulp.series('css'));
});

gulp.task('css', gulp.series('css:clean', 'css:process'));


/* Fonts */

gulp.task('fonts:copy', function() {
  return gulp.src('assets/fonts/**/*')
    .pipe(gulp.dest('build/assets/fonts'));
});

gulp.task('fonts:clean', function(done) {
    return del(['build/assets/fonts'], done);
});

gulp.task('fonts', gulp.series('fonts:clean', 'fonts:copy'));

gulp.task('fonts:watch', function() {
    gulp.watch('assets/fonts/**/*', gulp.parallel('fonts'));
});

/* Images */

gulp.task('images:copy', function() {
  return gulp.src('assets/img/**/*')
    .pipe(gulp.dest('build/assets/img'));
});

gulp.task('images:clean', function(done) {
    return del(['build/assets/img'], done);
});

gulp.task('images', gulp.series('images:clean', 'images:copy'));

gulp.task('images:watch', function() {
    gulp.watch('assets/img/**/*', gulp.parallel('images'));
});



gulp.task('default', gulp.parallel('css', 'fonts', 'images'));
gulp.task('watch', gulp.parallel('css:watch', 'fonts:watch', 'images:watch'));

gulp.task('dev', gulp.series('default', 'fractal:start', 'watch'));
gulp.task('build', gulp.series('default', 'fractal:build'));


// Deploy (Push build to gh-pages)

gulp.task('deploy', gulp.series('build', function () {
  return gulp.src("./build/**/*")
    .pipe(file('.nojekyll', ''))
    .pipe(deploy())
}));
