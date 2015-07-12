var gulp = require("gulp");
var typescript = require("gulp-typescript");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");

gulp.task("server", function () {
    browser({
        server: {
            baseDir: "./"                       //サーバー起動時のベースディレクトリ
        }
    });
});

gulp.task("html", function () {
    gulp.src("*.html")                          //対象となるHTMLファイル
        .pipe(browser.reload({stream: true}));  //ブラウザを更新
});

gulp.task("sass", function () {
    gulp.src("./src/sass/**/*scss")             // 対象となるSASSファイルを全部指定
        .pipe(plumber())                        //エラー時にwatchを止めない
        .pipe(sass())                           //SASSのコンパイル
        .pipe(autoprefixer())                   //CSSのベンダープレフィックス付与を自動化
        .pipe(gulp.dest("./release/css"))       //指定ディレクトリにCSS出力
        .pipe(browser.reload({stream: true}));  //ブラウザを更新
});

//差分コンパイルのために事前にプロジェクト作成
var typescriptProject = typescript.createProject({
    target: "ES5",                              //ECMAScriptのターゲットバージョン
    removeComments: true,                       //コメントの削除
    sortOutput: true,                           //複数のファイルを連結する際に参照関係をもとにソート
    out: "main.js"                              //出力対象のファイル
});

gulp.task("typescript", function () {
    gulp.src(["./src/ts/**/*.ts"])              // 対象となるTypeScriptファイルを全部指定
        .pipe(typescript(typescriptProject))    // プロジェクトを渡す事で差分コンパイル
        .pipe(gulp.dest("./release/js/"))       //指定ディレクトリにJS出力
        .pipe(browser.reload({stream: true}));  //ブラウザを更新
});

//タスクの一括実行、各ファイルの監視実行
gulp.task("default", ["html", "sass", "typescript", "server"], function () {
    gulp.watch("./*.html", ["html"]);
    gulp.watch("./src/sass/**/*scss", ["sass"]);
    gulp.watch("./src/ts/**/*.ts", ["typescript"]);
});