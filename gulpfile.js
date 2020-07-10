let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let rename = require('gulp-rename');

gulp.task('scss', () => {
  return gulp.src('./app/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', () => {
  return gulp.src('./app/*.html')
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('script', () => {
  return gulp.src('./app/js/*.js')
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('js', () => {
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/js'))
    .pipe(browserSync.reload({ stream: true }))
});


gulp.task('browser-sync', () => {
  return browserSync.init({
    server: {
      baseDir: './app/',
    },
  });
});


gulp.task('watch', () => {
  gulp.watch('./app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch("./app/*.html", gulp.parallel('html'));
  gulp.watch('./app/js/*.js', gulp.parallel('script'));
});



gulp.task('default', gulp.parallel('browser-sync', 'watch'));