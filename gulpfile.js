// ===============================================
// VARIABLEs
// ===============================================
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var es = require('event-stream');
var mainBowerFiles = require('main-bower-files');
var browserSync = require('browser-sync');
var del = require('del');
var Q = require('q');
var wiredep = require('wiredep').stream;
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
const gulpFilter = require('gulp-filter');


// ===============================================
// SETTINGs
// ===============================================

// if "jade" == true -> we gonna compile *.jade files, otherwise - *.html files
var jade = true;

// ===============================================
// PATHs
// ===============================================
var stylesCss = '/style/**/*.css',
	paths = {
		distApp: './app',
		distDev: './dist.dev',
		distProd: './dist.prod',
		devDest: {
			scripts: '/js',
			scripts_group_1: '/js/partials/about-me',
			scripts_group_2: '/js/partials/portfolio',
			scripts_group_3: '/js/partials/contact-me',
			lib: '/lib',
			styles: '/style',
			styles_group_1: '/style/partials/about-me',
			styles_group_2: '/style/partials/portfolio',
			styles_group_3: '/style/partials/contact-me',
			index: '/',
			partialsHTML: '/partials',
			fonts: '/fonts',
			images: '/img'
		},
		prodDest: {
			scriptsMainConcatName: 'app.min.js',
			scriptsGroup_1ConcatName: 'about-me.min.js',
			scriptsGroup_2ConcatName: 'portfolio.min.js',
			scriptsGroup_3ConcatName: 'contact-me.min.js',
			scripts: '/js',
			scripts_group_1: '/js/partials/about-me',
			scripts_group_2: '/js/partials/portfolio',
			scripts_group_3: '/js/partials/contact-me',
			stylesMainConcatName: 'app.css',
			stylesGroup_1ConcatName: 'about-me.css',
			stylesGroup_2ConcatName: 'portfolio.css',
			stylesGroup_3ConcatName: 'contact-me.css',
			styles: '/style',
			styles_group_1: '/style/partials/about-me',
			styles_group_2: '/style/partials/portfolio',
			styles_group_3: '/style/partials/contact-me',
			index: '/',
			partialsHTML: '/partials',
			fonts: '/fonts',
			images: '/img'
		},
		src: {
			libjs: '/lib/**/*.js',
			libcss: '/lib/**/*.css',
			scripts: '/js/**/*.js',
			scripts_main: '/js/*.js',
			scripts_group_1: '/js/partials/about-me/*.js',
			scripts_group_2: '/js/partials/portfolio/*.js',
			scripts_group_3: '/js/partials/contact-me/*.js',
			stylesCss: '/style/**/*.css',
			stylesCss_main: '/style/*.css',
			stylesCss_group_1: '/style/partials/about-me/*.css',
			stylesCss_group_2: '/style/partials/portfolio/*.css',
			stylesCss_group_3: '/style/partials/contact-me/*.css',
			stylesAll: [stylesCss,'/style/**/*.scss'],
			index: '/index.html',
			partialsHTML: '/partials/**/*.html',
			indexJade: '/jade/index.jade',
			commonJade: '/jade/_common/**/*.jade',
			partialsJade: '/jade/partials/**/*.jade',
			fonts: '/fonts/**/*',
			images: '/img/**/*'
		},
		modernizer: './bower_components/modernizer/modernizr.js',
		modernizerDev: '/lib/modernizr.js'
	};

// ===============================================
// PIPEs
// ===============================================
var pipes = {};

// ===============================================
// DEV section of pipes
// ===============================================

// Copy all scripts from "app" to "dev" section
pipes.buildScriptsDev = function () {
	return gulp.src(paths.distApp + paths.src.scripts_main)
			.pipe(gulp.dest(paths.distDev + paths.devDest.scripts));
};

pipes.buildScriptsGroup1Dev = function () {
	return gulp.src(paths.distApp + paths.src.scripts_group_1)
			.pipe(gulp.dest(paths.distDev + paths.devDest.scripts_group_1));
};

pipes.buildScriptsGroup2Dev = function () {
	return gulp.src(paths.distApp + paths.src.scripts_group_2)
			.pipe(gulp.dest(paths.distDev + paths.devDest.scripts_group_2));
};

pipes.buildScriptsGroup3Dev = function () {
	return gulp.src(paths.distApp + paths.src.scripts_group_3)
			.pipe(gulp.dest(paths.distDev + paths.devDest.scripts_group_3));
};

// Copy main vendor script files to "dev" section
pipes.buildVendorScriptsDev = function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest(paths.distDev + '/lib'));
};

// Copy "modernizer" to "dev" section
pipes.buildModernizerDev = function () {
	return gulp.src(paths.modernizer)
			.pipe(gulp.dest(paths.distDev + '/lib'));
};

// Copy styles (only *.css files) to "dev" section
pipes.buildStylesDev = function () {
	return gulp.src(paths.distApp + paths.src.stylesCss_main)
			.pipe(gulp.dest(paths.distDev + paths.devDest.styles));
};

pipes.buildStylesGroup1Dev = function () {
	return gulp.src(paths.distApp + paths.src.stylesCss_group_1)
			.pipe(gulp.dest(paths.distDev + paths.devDest.styles_group_1));
};

pipes.buildStylesGroup2Dev = function () {
	return gulp.src(paths.distApp + paths.src.stylesCss_group_2)
			.pipe(gulp.dest(paths.distDev + paths.devDest.styles_group_2));
};

pipes.buildStylesGroup3Dev = function () {
	return gulp.src(paths.distApp + paths.src.stylesCss_group_3)
			.pipe(gulp.dest(paths.distDev + paths.devDest.styles_group_3));
};

// Copy all font files to "dev" section
pipes.buildFontsDev = function () {
	return gulp.src(paths.distApp + paths.src.fonts)
    		.pipe(gulp.dest(paths.distDev + paths.devDest.fonts))
};

// Copy all img files to "dev" section
pipes.buildImgDev = function () {
	return gulp.src(paths.distApp + paths.src.images)
    		.pipe(gulp.dest(paths.distDev + paths.devDest.images))
};

// Compile index.jade for "dev" section
pipes.buildIndexJadeDev = function () {

	// var YOUR_LOCALS {};

	return gulp.src(paths.distApp + paths.src.indexJade)
			.pipe(plugins.plumber())
			.pipe(plugins.jade({
				// locals: YOUR_LOCALS,
				pretty: '\t'
			}))
			.pipe(gulp.dest(paths.distDev + paths.devDest.index))
};

// Compile *.jade files in /partials for "dev" section
pipes.buildPartialsJadeDev = function () {

	// var YOUR_LOCALS {};

	return gulp.src(paths.distApp + paths.src.partialsJade)
			.pipe(plugins.plumber())
			.pipe(plugins.jade({
				// locals: YOUR_LOCALS,
				pretty: '\t'
			}))
			.pipe(gulp.dest(paths.distDev + paths.devDest.partialsHTML))
};

/*pipes.clearDev =function () {
	return del(paths.distDev + '/*');
}*/



// Index pipe for "dev"
pipes.buildIndexDev = function () {

	var buildIndexJadeDev = pipes.buildIndexJadeDev();

	var buildDevStyles = pipes.buildStylesDev();

	var buildDevStylesGroup1 = pipes.buildStylesGroup1Dev();

	var buildDevStylesGroup2 = pipes.buildStylesGroup2Dev();

	var buildDevStylesGroup3 = pipes.buildStylesGroup3Dev();

	var buildVendorScriptsDev = pipes.buildVendorScriptsDev();

	var buildModernizerDev = pipes.buildModernizerDev();

	var buildAppScripts = pipes.buildScriptsDev();

	var buildAppScriptsGroup1 = pipes.buildScriptsGroup1Dev();

	var buildAppScriptsGroup2 = pipes.buildScriptsGroup2Dev();

	var buildAppScriptsGroup3 = pipes.buildScriptsGroup3Dev();

	var buildFontsDev = pipes.buildFontsDev();

	var buildImgDev = pipes.buildImgDev();

	if (jade) {
		return buildIndexJadeDev
			.pipe(plugins.inject(buildVendorScriptsDev, {relative: true, name: 'bower'}))
			.pipe(plugins.inject(buildModernizerDev, {relative: true, name: 'modernizer'}))
			.pipe(plugins.inject(buildDevStyles, {relative: true}))
			.pipe(plugins.inject(buildDevStylesGroup1, {relative: true, name: 'about-me'}))
			.pipe(plugins.inject(buildDevStylesGroup2, {relative: true, name: 'portfolio'}))
			.pipe(plugins.inject(buildDevStylesGroup3, {relative: true, name: 'contact-me'}))
			.pipe(plugins.inject(buildAppScripts, {relative: true}))
			.pipe(plugins.inject(buildAppScriptsGroup1, {relative: true, name: 'about-me'}))
			.pipe(plugins.inject(buildAppScriptsGroup2, {relative: true, name: 'portfolio'}))
			.pipe(plugins.inject(buildAppScriptsGroup3, {relative: true, name: 'contact-me'}))
			.pipe(gulp.dest(paths.distDev + paths.devDest.index));
	} else {
		return gulp.src(paths.distApp + paths.src.index)
			.pipe(gulp.dest(paths.distDev + paths.devDest.index))
			.pipe(plugins.inject(buildVendorScriptsDev, {relative: true, name: 'bower'}))
			.pipe(plugins.inject(buildModernizerDev, {relative: true, name: 'modernizer'}))
			.pipe(plugins.inject(buildDevStyles, {relative: true}))
			.pipe(plugins.inject(buildDevStylesGroup1, {relative: true, name: 'about-me'}))
			.pipe(plugins.inject(buildDevStylesGroup2, {relative: true, name: 'portfolio'}))
			.pipe(plugins.inject(buildDevStylesGroup3, {relative: true, name: 'contact-me'}))
			.pipe(plugins.inject(buildAppScripts, {relative: true}))
			.pipe(plugins.inject(buildAppScriptsGroup1, {relative: true, name: 'about-me'}))
			.pipe(plugins.inject(buildAppScriptsGroup2, {relative: true, name: 'portfolio'}))
			.pipe(plugins.inject(buildAppScriptsGroup3, {relative: true, name: 'contact-me'}))
			.pipe(gulp.dest(paths.distDev + paths.devDest.index));
	}
};


pipes.buildPartialsDev = function () {

	var buildPartialsJadeDev = pipes.buildPartialsJadeDev();

	var buildDevStyles = pipes.buildStylesDev();

	var buildDevStylesGroup1 = pipes.buildStylesGroup1Dev();

	var buildDevStylesGroup2 = pipes.buildStylesGroup2Dev();

	var buildDevStylesGroup3 = pipes.buildStylesGroup3Dev();

	var buildVendorScriptsDev = pipes.buildVendorScriptsDev();

	var buildModernizerDev = pipes.buildModernizerDev();

	var buildAppScripts = pipes.buildScriptsDev();

	var buildAppScriptsGroup1 = pipes.buildScriptsGroup1Dev();

	var buildAppScriptsGroup2 = pipes.buildScriptsGroup2Dev();

	var buildAppScriptsGroup3 = pipes.buildScriptsGroup3Dev();

	if (jade) {
		return buildPartialsJadeDev
			.pipe(plugins.inject(buildVendorScriptsDev, {relative: true, name: 'bower'}))
			.pipe(plugins.inject(buildModernizerDev, {relative: true, name: 'modernizer'}))
			.pipe(plugins.inject(buildDevStyles, {relative: true}))
			.pipe(plugins.inject(buildDevStylesGroup1, {relative: true, name: 'about-me'}))
			.pipe(plugins.inject(buildDevStylesGroup2, {relative: true, name: 'portfolio'}))
			.pipe(plugins.inject(buildDevStylesGroup3, {relative: true, name: 'contact-me'}))
			.pipe(plugins.inject(buildAppScripts, {relative: true}))
			.pipe(plugins.inject(buildAppScriptsGroup1, {relative: true, name: 'about-me'}))
			.pipe(plugins.inject(buildAppScriptsGroup2, {relative: true, name: 'portfolio'}))
			.pipe(plugins.inject(buildAppScriptsGroup3, {relative: true, name: 'contact-me'}))
			.pipe(gulp.dest(paths.distDev + paths.devDest.partialsHTML));
	} else {
		return gulp.src(paths.distApp + paths.src.partialsHTML)
			.pipe(gulp.dest(paths.distDev + paths.devDest.partialsHTML))
			.pipe(plugins.inject(buildVendorScriptsDev, {relative: true, name: 'bower'}))
			.pipe(plugins.inject(buildModernizerDev, {relative: true, name: 'modernizer'}))
			.pipe(plugins.inject(buildDevStyles, {relative: true}))
			.pipe(plugins.inject(buildDevStylesGroup1, {relative: true, name: 'about-me'}))
			.pipe(plugins.inject(buildDevStylesGroup2, {relative: true, name: 'portfolio'}))
			.pipe(plugins.inject(buildDevStylesGroup3, {relative: true, name: 'contact-me'}))
			.pipe(plugins.inject(buildAppScripts, {relative: true}))
			.pipe(plugins.inject(buildAppScriptsGroup1, {relative: true, name: 'about-me'}))
			.pipe(plugins.inject(buildAppScriptsGroup2, {relative: true, name: 'portfolio'}))
			.pipe(plugins.inject(buildAppScriptsGroup3, {relative: true, name: 'contact-me'}))
			.pipe(gulp.dest(paths.distDev + paths.devDest.partialsHTML));
	}
};


// ===============================================
// PROD section of pipes
//===============================================

// Concatenate and minify all scripts from "dev" them to "prod"
pipes.buildScriptsProd = function () {
	return gulp.src(paths.distDev + paths.src.scripts_main)
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.concat(paths.prodDest.scriptsMainConcatName))
			.pipe(plugins.uglify())
			.pipe(plugins.sourcemaps.write())
			.pipe(gulp.dest(paths.distProd + paths.prodDest.scripts))
			.pipe(plugins.filesize())
			.on('error', gutil.log);
};

pipes.buildScriptsGroup1Prod = function () {
	return gulp.src(paths.distDev + paths.src.scripts_group_1)
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.concat(paths.prodDest.scriptsGroup_1ConcatName))
			.pipe(plugins.uglify())
			.pipe(plugins.sourcemaps.write())
			.pipe(gulp.dest(paths.distProd + paths.prodDest.scripts))
			.pipe(plugins.filesize())
			.on('error', gutil.log);
};

pipes.buildScriptsGroup2Prod = function () {
	return gulp.src(paths.distDev + paths.src.scripts_group_2)
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.concat(paths.prodDest.scriptsGroup_2ConcatName))
			.pipe(plugins.uglify())
			.pipe(plugins.sourcemaps.write())
			.pipe(gulp.dest(paths.distProd + paths.prodDest.scripts))
			.pipe(plugins.filesize())
			.on('error', gutil.log);
};

pipes.buildScriptsGroup3Prod = function () {
	return gulp.src(paths.distDev + paths.src.scripts_group_3)
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.concat(paths.prodDest.scriptsGroup_3ConcatName))
			.pipe(plugins.uglify())
			.pipe(plugins.sourcemaps.write())
			.pipe(gulp.dest(paths.distProd + paths.prodDest.scripts))
			.pipe(plugins.filesize())
			.on('error', gutil.log);
};

// Concatenate vendor files to "prod"
pipes.buildVendorScriptsProd = function() {
	var filterJS = gulpFilter('**/*.js', { restore: true });
    return gulp.src(mainBowerFiles())
    		.pipe(filterJS)
	    	.pipe(plugins.concat('vendor.min.js'))
	    	.pipe(plugins.uglify())
	        .pipe(gulp.dest(paths.distProd + paths.prodDest.scripts))
	        .pipe(plugins.filesize())
	        .on('error', gutil.log);
};

pipes.buildVendorStylesProd = function() {
	var filterCSS = gulpFilter('**/*.css', { restore: true });
    return gulp.src(mainBowerFiles())
    		.pipe(filterCSS)
	    	.pipe(plugins.concat('vendor.css'))
			.pipe(plugins.cleanCss({compatibility: 'ie8'}))
	        .pipe(gulp.dest(paths.distProd + paths.prodDest.styles))
	        .pipe(plugins.filesize())
	        .on('error', gutil.log);
};

pipes.buildModernizerScriptsProd = function() {
    return gulp.src(paths.distDev + paths.modernizerDev)
	    	.pipe(plugins.concat('modernizr.min.js'))
	    	.pipe(plugins.uglify())
	        .pipe(gulp.dest(paths.distProd + paths.prodDest.scripts))
	        .pipe(plugins.filesize())
	        .on('error', gutil.log);
};

// Concat, optimize and minify css files
pipes.buildStylesProd = function () {
	return gulp.src(paths.distDev + paths.src.stylesCss_main)
			.pipe(plugins.concat(paths.prodDest.stylesMainConcatName))
			.pipe(plugins.cleanCss({compatibility: 'ie8'}))
			.pipe(gulp.dest(paths.distProd + paths.prodDest.styles))
	        .pipe(plugins.filesize())
	        .on('error', gutil.log);
};

pipes.buildStylesGroup1Prod = function () {
	return gulp.src(paths.distDev + paths.src.stylesCss_group_1)
			.pipe(plugins.concat(paths.prodDest.stylesGroup_1ConcatName))
			.pipe(plugins.cleanCss({compatibility: 'ie8'}))
			.pipe(gulp.dest(paths.distProd + paths.prodDest.styles_group_1))
	        .pipe(plugins.filesize())
	        .on('error', gutil.log);
};

pipes.buildStylesGroup2Prod = function () {
	return gulp.src(paths.distDev + paths.src.stylesCss_group_2)
			.pipe(plugins.concat(paths.prodDest.stylesGroup_2ConcatName))
			.pipe(plugins.cleanCss({compatibility: 'ie8'}))
			.pipe(gulp.dest(paths.distProd + paths.prodDest.styles_group_2))
	        .pipe(plugins.filesize())
	        .on('error', gutil.log);
};

pipes.buildStylesGroup3Prod = function () {
	return gulp.src(paths.distDev + paths.src.stylesCss_group_3)
			.pipe(plugins.concat(paths.prodDest.stylesGroup_3ConcatName))
			.pipe(plugins.cleanCss({compatibility: 'ie8'}))
			.pipe(gulp.dest(paths.distProd + paths.prodDest.styles_group_3))
	        .pipe(plugins.filesize())
	        .on('error', gutil.log);
};

pipes.buildFontsProd = function () {
	return gulp.src(paths.distDev + paths.src.fonts)
    		.pipe(gulp.dest(paths.distProd + paths.prodDest.fonts))
};

pipes.buildImgProd = function () {
	return gulp.src(paths.distDev + paths.src.images)
    		.pipe(gulp.dest(paths.distProd + paths.prodDest.images))
};

// Compile index.jade for "dev" section
pipes.buildIndexJadeProd = function () {

	// var YOUR_LOCALS {};

	return gulp.src(paths.distApp + paths.src.indexJade)
			.pipe(plugins.plumber())
			.pipe(plugins.jade({
				// locals: YOUR_LOCALS,
				pretty: '\t'
			}))
			.pipe(gulp.dest(paths.distProd + paths.prodDest.index))
};

// Compile *.jade files in /partials for "dev" section
pipes.buildPartialsJadeProd = function () {

	// var YOUR_LOCALS {};

	return gulp.src(paths.distApp + paths.src.partialsJade)
			.pipe(plugins.plumber())
			.pipe(plugins.jade({
				// locals: YOUR_LOCALS,
				pretty: '\t'
			}))
			.pipe(gulp.dest(paths.distProd + paths.prodDest.partialsHTML))
};


// Main pipe for "prod"
pipes.buildIndexProd = function () {

	var buildIndexJadeProd = pipes.buildIndexJadeProd();

	var buildVendorStylesProd = pipes.buildVendorStylesProd();

	var buildProdStyles = pipes.buildStylesProd();

	var buildProdStylesGroup1 = pipes.buildStylesGroup1Prod();

	var buildProdStylesGroup2 = pipes.buildStylesGroup2Prod();

	var buildProdStylesGroup3 = pipes.buildStylesGroup3Prod();

	var buildVendorScriptsProd = pipes.buildVendorScriptsProd();

	var buildModernizerScriptsProd = pipes.buildModernizerScriptsProd();

	var buildAppScriptsProd = pipes.buildScriptsProd();

	var buildAppScriptsGroup1Prod = pipes.buildScriptsGroup1Prod();

	var buildAppScriptsGroup2Prod = pipes.buildScriptsGroup2Prod();

	var buildAppScriptsGroup3Prod = pipes.buildScriptsGroup3Prod();

	var buildFontsProd = pipes.buildFontsProd();

	var buildImgProd = pipes.buildImgProd();

	if (jade) {
		return buildIndexJadeProd
			.pipe(plugins.inject(buildVendorScriptsProd, {relative: true, name: 'bower'}))
			.pipe(plugins.inject(buildModernizerScriptsProd, {relative: true, name: 'modernizer'}))
			.pipe(plugins.inject(buildVendorStylesProd, {relative: true, name: 'bower'}))
			.pipe(plugins.inject(buildProdStyles, {relative: true}))
			.pipe(plugins.inject(buildProdStylesGroup1, {relative: true, name: 'about-me'}))
			.pipe(plugins.inject(buildProdStylesGroup2, {relative: true, name: 'portfolio'}))
			.pipe(plugins.inject(buildProdStylesGroup3, {relative: true, name: 'contact-me'}))
			.pipe(plugins.inject(buildAppScriptsProd, {relative: true}))
			.pipe(plugins.inject(buildAppScriptsGroup1Prod, {relative: true, name: 'about-me'}))
			.pipe(plugins.inject(buildAppScriptsGroup2Prod, {relative: true, name: 'portfolio'}))
			.pipe(plugins.inject(buildAppScriptsGroup3Prod, {relative: true, name: 'contact-me'}))
			.pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
			.pipe(gulp.dest(paths.distProd + paths.prodDest.index));
	} else {
		return gulp.src(paths.distApp + paths.src.index)
			.pipe(gulp.dest(paths.distProd + paths.prodDest.index))
			.pipe(plugins.inject(buildVendorScriptsProd, {relative: true, name: 'bower'}))
			.pipe(plugins.inject(buildModernizerScriptsProd, {relative: true, name: 'modernizer'}))
			.pipe(plugins.inject(buildVendorStylesProd, {relative: true, name: 'bower'}))
			.pipe(plugins.inject(buildProdStyles, {relative: true}))
			.pipe(plugins.inject(buildProdStylesGroup1, {relative: true, name: 'about-me'}))
			.pipe(plugins.inject(buildProdStylesGroup2, {relative: true, name: 'portfolio'}))
			.pipe(plugins.inject(buildProdStylesGroup3, {relative: true, name: 'contact-me'}))
			.pipe(plugins.inject(buildAppScriptsProd, {relative: true}))
			.pipe(plugins.inject(buildScriptsGroup1Prod, {relative: true, name: 'about-me'}))
			.pipe(plugins.inject(buildScriptsGroup2Prod, {relative: true, name: 'portfolio'}))
			.pipe(plugins.inject(buildScriptsGroup3Prod, {relative: true, name: 'contact-me'}))
			.pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
			.pipe(gulp.dest(paths.distProd + paths.prodDest.index));
	}
};


// Partials pipe for "prod"
pipes.buildPartialsProd = function () {

	var buildPartialsJadeProd = pipes.buildPartialsJadeProd();

	var buildVendorStylesProd = pipes.buildVendorStylesProd();

	var buildProdStyles = pipes.buildStylesProd();

	var buildProdStylesGroup1 = pipes.buildStylesGroup1Prod();

	var buildProdStylesGroup2 = pipes.buildStylesGroup2Prod();

	var buildProdStylesGroup3 = pipes.buildStylesGroup3Prod();

	var buildVendorScriptsProd = pipes.buildVendorScriptsProd();

	var buildModernizerScriptsProd = pipes.buildModernizerScriptsProd();

	var buildAppScriptsProd = pipes.buildScriptsProd();

	var buildAppScriptsGroup1Prod = pipes.buildScriptsGroup1Prod();

	var buildAppScriptsGroup2Prod = pipes.buildScriptsGroup2Prod();

	var buildAppScriptsGroup3Prod = pipes.buildScriptsGroup3Prod();

	if (jade) {
		return buildPartialsJadeProd
			.pipe(plugins.inject(buildVendorScriptsProd, {relative: true, name: 'bower'}))
			.pipe(plugins.inject(buildModernizerScriptsProd, {relative: true, name: 'modernizer'}))
			.pipe(plugins.inject(buildVendorStylesProd, {relative: true, name: 'bower'}))
			.pipe(plugins.inject(buildProdStyles, {relative: true}))
			.pipe(plugins.inject(buildProdStylesGroup1, {relative: true, name: 'about-me'}))
			.pipe(plugins.inject(buildProdStylesGroup2, {relative: true, name: 'portfolio'}))
			.pipe(plugins.inject(buildProdStylesGroup3, {relative: true, name: 'contact-me'}))
			.pipe(plugins.inject(buildAppScriptsProd, {relative: true}))
			.pipe(plugins.inject(buildAppScriptsGroup1Prod, {relative: true, name: 'about-me'}))
			.pipe(plugins.inject(buildAppScriptsGroup2Prod, {relative: true, name: 'portfolio'}))
			.pipe(plugins.inject(buildAppScriptsGroup3Prod, {relative: true, name: 'contact-me'}))
			.pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
			.pipe(gulp.dest(paths.distProd + paths.prodDest.partialsHTML));
	} else {
		return gulp.src(paths.distApp + paths.src.partialsHTML)
			.pipe(gulp.dest(paths.distProd + paths.prodDest.partialsHTML))
			.pipe(plugins.inject(buildVendorScriptsProd, {relative: true, name: 'bower'}))
			.pipe(plugins.inject(buildModernizerScriptsProd, {relative: true, name: 'modernizer'}))
			.pipe(plugins.inject(buildVendorStylesProd, {relative: true, name: 'bower'}))
			.pipe(plugins.inject(buildProdStyles, {relative: true}))
			.pipe(plugins.inject(buildProdStylesGroup1, {relative: true, name: 'about-me'}))
			.pipe(plugins.inject(buildProdStylesGroup2, {relative: true, name: 'portfolio'}))
			.pipe(plugins.inject(buildProdStylesGroup3, {relative: true, name: 'contact-me'}))
			.pipe(plugins.inject(buildAppScriptsProd, {relative: true}))
			.pipe(plugins.inject(buildAppScriptsGroup1Prod, {relative: true, name: 'about-me'}))
			.pipe(plugins.inject(buildAppScriptsGroup2Prod, {relative: true, name: 'portfolio'}))
			.pipe(plugins.inject(buildAppScriptsGroup3Prod, {relative: true, name: 'contact-me'}))
			.pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
			.pipe(gulp.dest(paths.distProd + paths.prodDest.partialsHTML));
	}

};



// ===============================================
// TASKs
// ===============================================

// Test info ourput to console
gulp.task('test-print', function () {
	console.log('paths.src: ', paths.src);
});


// ===============================================
// DEV section of tasks
// ===============================================

// Clear content of distDev
gulp.task('clear-dev', function () {
	console.log('========= Task \"clear-dev\" =========');
	return del(paths.distDev + '/*');
});


// Server Dev
gulp.task('serverDev', function () {  
  browserSync({
    port: 9000,
    server: {
      baseDir: paths.distDev 
    }
  });
});

// Server Prod
gulp.task('serverProd', function () {  
  browserSync({
    port: 8000,
    server: {
      baseDir: paths.distProd 
    }
  });
});

gulp.task('browserSyncReload', ['build-dev'], browserSync.reload);

// Watch for distApp

// First variant of building watch
/*gulp.task('watchApp', function () {
  gulp.watch([
    paths.distApp + paths.src.index,
    paths.distApp + paths.src.partialsHTML,
    paths.distApp + paths.src.scripts,
    paths.distApp + paths.src.stylesCss,
    paths.distApp + paths.src.fonts,
    paths.distApp + paths.src.images
  ], ['browserSyncReload']);
});*/

// Second variant of building watch
gulp.task('watchApp', function () {
  gulp.watch([
    paths.distApp + paths.src.index,
    paths.distApp + paths.src.indexJade,
    paths.distApp + paths.src.commonJade,
    paths.distApp + paths.src.partialsHTML,
    paths.distApp + paths.src.partialsJade,
    paths.distApp + paths.src.scripts,
    paths.distApp + paths.src.stylesCss,
    paths.distApp + paths.src.fonts,
    paths.distApp + paths.src.images
  ]).on('change', function () {
  		return gulp.run('browserSyncReload');
  });
});

// Main task for "dev"
gulp.task('build-index-dev', ['clear-dev'], pipes.buildIndexDev);

gulp.task('build-dev', ['build-index-dev'], pipes.buildPartialsDev);

// Start distDev task
gulp.task('start-dev', ['serverDev', 'watchApp']);


// ===============================================
// PROD section of tasks
// ===============================================

// Clear content of distDev
gulp.task('clear-prod', function () {
	console.log('========= Task \"clear-prod\" =========');
	return del(paths.distProd + '/*');
});

gulp.task('build-scripts-prod', pipes.buildScriptsProd);

gulp.task('build-vendor-prod', pipes.buildVendorScriptsProd);

gulp.task('build-modernizer-prod', pipes.buildModernizerScriptsProd);

gulp.task('build-styles-prod', pipes.buildStylesProd);

// Main task for "dev"
gulp.task('build-index-prod', ['clear-prod'], pipes.buildIndexProd);

gulp.task('build-prod', ['build-index-prod'], pipes.buildPartialsProd);

// Start distDev task
gulp.task('start-prod', ['serverProd']);



