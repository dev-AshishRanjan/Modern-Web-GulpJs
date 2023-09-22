import gulp from "gulp";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import imagemin from "gulp-imagemin";
import browserSync from "browser-sync";
import gulpSass from "gulp-sass";
import sass from "sass";
import uglifycss from "gulp-uglifycss";

const sassCompiler = gulpSass(sass);

// Compile Sass to CSS
gulp.task("sass", function () {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sassCompiler())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream()); // Reload the browser when CSS changes
});

// css to uglified css
gulp.task("uglifycss", () => {
  return gulp
    .src("src/css/**/*.css")
    .pipe(uglifycss())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream()); // Reload the browser when CSS changes
});

// combining the work for scss->css->minified
gulp.task("sass-css", gulp.series("sass", "uglifycss"));

// Concatenate and minify JavaScript
gulp.task("js", function () {
  return gulp
    .src("src/js/**/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream()); // Reload the browser when JS changes
});

// Optimize images
gulp.task("images", function () {
  return gulp
    .src("src/images/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
});

// Serve the application and watch for changes
gulp.task("serve", function () {
  browserSync.init({
    server: "./", // Serve files from the current directory
  });

  // Watch for changes in Sass, JavaScript, and HTML files
  gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
  gulp.watch("src/css/**/*.css", gulp.series("uglifycss"));
  gulp.watch("src/js/**/*.js", gulp.series("js"));
  gulp.watch("src/images/**/*", gulp.series("images"));
  gulp.watch("*.html").on("change", browserSync.reload);
});

// Default task to start the development server
gulp.task("default", gulp.series("sass-css", "js", "images", "serve"));
