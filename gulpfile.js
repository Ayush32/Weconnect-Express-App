/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
const gulp = require('gulp');
const sass = require('gulp-sass')
const cssnano = require('gulp-cssnano')
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin')
const del = require('del')

// minify  css using gulp
gulp.task('css', function(done){
    console.log('minifying css.....');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));


    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'))
    done();
})

// minify js using gulp
gulp.task('js', function(done){
    console.log('minifying js......')
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
  })

//   minify images using gulp
gulp.task('images', function(done){
      console.log('minifying images......');
      gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
      .pipe(imagemin())
      .pipe(rev())
      .pipe(gulp.dest('./public/assets'))
      .pipe(rev.manifest({
          cwd: 'public',
          merge: true
      }))
      .pipe(gulp.dest('./public/assets'));
      done();
});
// empty the public / assets directory
gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
})

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('Building assets..');
    done();
})




