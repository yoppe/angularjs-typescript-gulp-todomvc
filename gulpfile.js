var gulp = require("gulp");
var typescript = require("gulp-typescript");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");

gulp.task("server", function () {
    browser({
        server: {
            baseDir: "../"
        }
    });
});

gulp.task("html", function () {
    gulp.src("*.html")
        .pipe(browser.reload({stream: true}));
});

gulp.task("sass", function () {
    gulp.src("../src/sass/**/*scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("../release/css"))
        .pipe(browser.reload({stream: true}));
});

var typescriptProject = typescript.createProject({
    target: "ES5",
    removeComments: true,
    sortOutput: true,
    // ファイルをひとまとめに
    out: "main.js"
});

gulp.task("typescript", function () {
    // 対象となるファイルを全部指定
    gulp.src(["../src/ts/**/*.ts"])
        .pipe(typescript(typescriptProject)) // プロジェクトを渡す事で差分コンパイル
        .pipe(gulp.dest("../release/js/"))
        .pipe(browser.reload({stream: true}));
});

gulp.task("default", ["html", "sass", "typescript", "server"], function () {
    gulp.watch("../*.html", ["html"]);
    gulp.watch("../src/sass/**/*scss", ["sass"]);
    gulp.watch("../src/ts/**/*.ts", ["typescript"]);
});