// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const browsersync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
// const postcssSass = require("postcss-sass");
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssImport = require('postcss-import');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const rev = require('gulp-rev');
const revDistClean = require('gulp-rev-dist-clean');
const combineMediaQuery = require('postcss-combine-media-query');
const tailwindcss = require('tailwindcss');


// File paths
const files = {
    url : 'sweetskin.local',
    scssWatchPath: 'web/assets/scss/**/*.scss',
    scssSourcePath: 'web/assets/scss/style.scss',
    cssDestPath: 'web/assets/css/style.css',
    jsWatchPath: 'web/assets/js/main.js',
    jsConcatPath: [
      "node_modules/jquery/dist/jquery.js",
      "node_modules/lazysizes/lazysizes.js",
      "node_modules/lazysizes/plugins/unveilhooks/ls.unveilhooks.js",
    ],
    htmlWatchPath: ["templates/**/*.twig","tailwind.config.js","web/assets/scss/*.scss"]
}

// Init BrowserSync.
function browserSync(done) {
  browsersync.init({
    proxy: files.url, // Change this value to match your local URL.
    host: files.url,
    socket: {
      domain: 'localhost:3002'
    },
    open: true
  });
  done();
}

// Reload browser.
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Sass task: compiles the style.scss file into style.css
function scssTask(){
  return src([files.scssSourcePath])
      .pipe(sass()) // compile SCSS to CSS
      .pipe(dest('web/assets/css/'));
}


function postcssTask(){
  return src([files.cssDestPath])
      .pipe(postcss([ tailwindcss ])) // PostCSS plugins
      .pipe(dest('web/assets/css/'));
}

// JS task: concatenates and uglifies JS files to script.js
function jsPluginsTask(){
  return src(files.jsConcatPath)
  .pipe(concat('plugins.js'))
  .pipe(uglify())
  .pipe(dest('web/assets/js'));
}

// Cachebust
function cacheBustTask(){
  return src(['web/assets/css/style.css', 'web/assets/js/main.js'], {base: 'web/assets'})
    .pipe(dest('web/assets/build'))
    .pipe(rev())
    .pipe(dest('web/assets/build'))
    .pipe(rev.manifest('web/assets/build/rev-manifest.json',{
      base: 'web/assets/build',
      merge: true // Merge with the existing manifest if one exists
    }))
    .pipe(dest('web/assets/build'));
}

function cleanOldDist(){
  return src(['web/assets/build/**/*'], {read: false})
    .pipe(revDistClean('web/assets/build/rev-manifest.json'));
}


function watchTask(){
  //watch(files.scssWatchPath, series(scssTask,cacheBustTask,cleanOldDist));
  watch(files.jsWatchPath, series(jsPluginsTask, cacheBustTask, cleanOldDist, browserSyncReload));
  watch(files.htmlWatchPath, series(scssTask,postcssTask,cacheBustTask,cleanOldDist,browserSyncReload));
  //watch(files.htmlWatchPath, series(browserSyncReload));
}

exports.default = parallel(browserSync, watchTask);
