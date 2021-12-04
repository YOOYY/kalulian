var gulp = require("gulp"),
    fs = require('fs'),
    gulpif = require('gulp-if'),
    data = require('gulp-data'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    htmlmin = require('gulp-htmlmin'),
    tinypng = require('gulp-tinypng'),
    reload = browserSync.reload,

    pug = require('gulp-pug'),
    
    sass = require('gulp-sass')(require('sass')),
    mock = require('./mock.js'),
    ts = require('gulp-typescript'),

    rootPath = 'app',

    imgPath = "./" + rootPath + "/imgs",
    scssPath = "./" + rootPath + "/scss",
    htmlPath = "./" + rootPath + "/pug",
    jsPath = "./" + rootPath + "/js",

    // condition = (process.argv[2] === 'build' ? true : false),
    // outPath = (condition === true ? "build" : "debug"),
    outPath = "build",
    condition = false,
    htmllint = require("gulp-htmllint"),
    fancyLog = require('fancy-log'),
    colors = require('ansi-colors'),
    outhtmlPath = outPath + "/",
    outcssPath = outPath + "/css",
    outjsPath = outPath + "/js",
    outImgPath = outPath + "/imgs";
    
gulp.task('pug', () =>
    gulp.src([htmlPath + '/**/*.pug', '!' + htmlPath + '/share/**'])
        .pipe(
            gulpif(
                fs.existsSync('./' + htmlPath + '/share/config_' + outPath + '.json'),data(function () {
                    return require('./' + htmlPath + '/share/config_' + outPath + '.json');
                })
            )
        )
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(outhtmlPath))
        // .pipe(htmllint({
        //     "failOnError":true,
        //     "config":".htmllintrc.json"
        // }, htmllintReporter))
        // .pipe(
        //     htmlmin({
        //         collapseWhitespace: true,
        //         removeEmptyAttributes:true,
        //         removeRedundantAttributes:true,
        //         removeScriptTypeAttributes:true,
        //         removeStyleLinkTypeAttributes:true,
        //         sortAttributes:true,
        //         sortClassName:true,
        //         minifyCSS:true,
        //         minifyJS:true
        //     })
        // )
        // .pipe(gulp.dest(outhtmlPath))
        .pipe(reload({ stream: true }))
);

gulp.task('scss',() =>
    gulp.src(scssPath + '/*.scss')
    .pipe(sass().on('error', sass.logError).on('error',function(){
        throw('scss转css错误');
    }))
    .pipe(gulp.dest(outcssPath))
    .pipe(reload({ stream: true }))
);

// gulp.task('js',() => 
//     gulp.src([jsPath + '/*.js','!' + jsPath + '/config_'+ (condition===true?'debug':'build') +'.js'])
//     .pipe(concat('index.js'))
//     .pipe(gulp.dest(outjsPath))
//     .pipe(reload({ stream: true }))
// )
gulp.task('js',() => 
    gulp.src(jsPath + '/*.js')
    .pipe(gulp.dest(outjsPath))
    .pipe(reload({ stream: true }))
)

gulp.task('tinyImg',() => 
    gulp.src(imgPath + '/**/*.{png,jpg}')
    .pipe(tinypng('L8AJPOaiMhx8bO2jozWdWi4T5WZIZiSk'))
    .pipe(gulp.dest(outImgPath))
)

gulp.task('ts',() => 
    gulp.src([jsPath + '/*.ts','!' + jsPath + '/config_'+ (condition===true?'debug':'build') +'.ts'])
    .pipe(ts({
        noImplicitAny: true,
        outFile: 'test.js'
    }))
    .pipe(gulp.dest(outjsPath))
    .pipe(reload({ stream: true }))
)

//服务器
gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: './'+ outPath +'/',
            directory: true,
            index: ["index.html"],
            tunnel: true,
            // middleware: mock.data()
        }
    });
    gulp.watch(htmlPath + '/**/*.pug', gulp.series('pug'));
    gulp.watch(scssPath + '/**/*.scss', gulp.series('scss'));
    gulp.watch(jsPath + '/**/*.js', gulp.series('js'));
});

//服务器
gulp.task('watchTs', function () {
    gulp.watch(jsPath + '/**/*.ts', gulp.series('ts'));
});

gulp.task('default', gulp.series('server'));
gulp.task('build', gulp.series(['pug','scss','js']));

function htmllintReporter(filepath, issues) {
    if (issues.length > 0) {
        issues.forEach(function (issue) {
            fancyLog(colors.cyan('[gulp-htmllint] ') + colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + colors.red('(' + issue.code + ') ' + issue.msg));
        });
 
        process.exitCode = 1;
    }
}