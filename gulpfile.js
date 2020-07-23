/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
const gulp = require('gulp');
const sass = require('gulp-sass')
const cssnano = require('gulp-cssnano')
const rev = require('gulp-rev')


gulp.task('css', function(){
    console.log('minifying css.....');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));


    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'))
})