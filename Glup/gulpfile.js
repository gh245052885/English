var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),  //CSS压缩
    concat = require('gulp-concat'),         // 文件合并
    uglify = require('gulp-uglify'),         //js压缩插件
    rename = require('gulp-rename'),         // 重命名
    minifyHtml = require("gulp-minify-html"),
    jshint = require("gulp-jshint"),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'), //png图片压缩插件
    del = require('del');                    // 文件删除
//-------import end-------------//

//-------task start-------------//
gulp.task('default', function () {
    console.log('hello world');
});

gulp.task('minify-js', function () {
    gulp.src('src/*.js')          // 要压缩的js文件
        .pipe(uglify())              //使用uglify进行压缩
        .pipe(gulp.dest('dist/js')); //压缩后的路径
});

gulp.task('minify-css', function () {
    return gulp.src('styles/*.css')
        .pipe(cleanCSS({ debug: true }, function (details) {
            console.log('minify-css');
            console.log(details.name + ': ' + details.stats.minifiedSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('dist'));
});


gulp.task('minify-html', function () {
    gulp.src('src/*.html') // 要压缩的html文件
        .pipe(minifyHtml())    //压缩
        .pipe(gulp.dest('dist/html'));
});



gulp.task('jsLint', function () {
    gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter()); // 输出检查结果
});

gulp.task('concat', function () {
    gulp.src('src/*.js')     //要合并的文件
        .pipe(concat('all.js'))  // 合并匹配到的js文件并命名为 "all.js"
        .pipe(gulp.dest('dist/js'));
});
gulp.task('minifyjs', function () {
    return gulp.src('src/*.js')
        .pipe(concat('main.js'))                  //合并所有js到main.js
        .pipe(gulp.dest('minified/js'))           //输出main.js到文件夹
        .pipe(rename({ suffix: '.min' }))           //rename压缩后的文件名
        .pipe(uglify())                           //压缩
        .pipe(gulp.dest('minified/js'));          //输出
});



gulp.task('image', function () {
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()] //使用pngquant来压缩png图片
        }))
        .pipe(gulp.dest('dist'));
});

var less = require('gulp-less'),
    livereload = require('gulp-livereload');
gulp.task('less', function () {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});
gulp.task('watch', function () {
    livereload.listen(); //要在这里调用listen()方法
    gulp.watch('less/*.less', ['less']);
});

gulp.task('clean', function (cb) {
    del(['minified/css', 'minified/js'], cb)
});