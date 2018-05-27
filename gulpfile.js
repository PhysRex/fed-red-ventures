var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('minify', function () {
   gulp.src('js/app.js')
      .pipe(uglify())
      .pipe(gulp.dest('build'))
});


// var gulp = require("gulp");
// var babel = require("gulp-babel");

// gulp.task("default", function () {
//     return gulp.src("src/js/*.js")
//         .pipe(babel())
//         .pipe(gulp.dest("dist/js"));
// });