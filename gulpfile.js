var gulp = require("gulp");
var del = require("del");
var rename = require("gulp-rename");
var typescript = require("gulp-typescript");
var shell = require('gulp-shell');
var tslint = require("gulp-tslint");
var browserSync = require('browser-sync').create();
var bsreload      = browserSync.reload;
var run = require('gulp-run');

var paths = 
{
	bs: {basedir: './app'},
	ts: {src: ['app/src/**/*.ts'],dest: ['app/build']},
	html: { src: ['app/**/*.html']}
};

/* Prepare Browser-sync for localhost */
gulp.task('browser-sync', function() {
    browserSync.init(
    {
        server: {baseDir: './app'}
	});
});
gulp.task( "compile:tsc", function()
{
    var tsProject = typescript.createProject("tsconfig.json");
    var result = gulp.src(paths.ts.src).pipe( tsProject() );
    return result.js.pipe( gulp.dest( paths.ts.dest ) );
} );

gulp.task("build:clean", function () 
{
    return del(["./out/*"]);
});
gulp.task("serve", ['browser-sync'], function () 
{
    gulp.watch(paths.html.src).on('change', browserSync.reload);
    gulp.watch(paths.ts.src, ["compile:tsc"]).on('change', browserSync.reload);
});

gulp.task('git:pull', shell.task(['git pull']));
gulp.task('git:push', shell.task([ 'git push']));
