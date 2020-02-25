const gulp 			= require('gulp');
const imagemin 		= require('gulp-imagemin');
var browserSync		= require('browser-sync').create();
var sass			= require('gulp-sass');
var notify 			= require("gulp-notify");


var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};
//Image optimization
gulp.task('img', function(){
	gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('src/images'))
});

//Compile sass into CSS & auto-inject into browsers

gulp.task('sass', function(){
	return gulp.src(['src/scss/*.scss'])
	.pipe(sass().on('error', sass.logError))
	.pipe(sass())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(gulp.dest("src/css"))
	.pipe(notify("Sass Files Compiled!"))
	.pipe(browserSync.stream());
});

// Move the js files into our /src/js folder

gulp.task('js', function() {
    return gulp.src(['src/js/*.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});


gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src"  
    });

    gulp.watch(['src/scss/foundation-sites/assets/foundation.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("src/*.js").on('change', browserSync.reload);
	gulp.watch("src/include/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js','img', 'serve']);