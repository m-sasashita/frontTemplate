const { src, dest, watch } = require("gulp")
const sass = require("gulp-sass");
const babel = require('gulp-babel');
const browserSync = require("browser-sync");

const compileSass = (done) => {
	src("scss/*.scss")
		.pipe(
			sass({
				outputStyle: "nested"
			})
		)
		.pipe(dest("dist/css"))
	browserSync.reload();
	done();
}

const compileJS = (done) => {
	src("js/*.js")
		.pipe(babel())
		.pipe(dest("dist/js"))
	browserSync.reload();
	done();
}

const reloadHTML = (done) => {
	browserSync.reload();
	done();
}

const watchFiles = () => {
	browserSync.init({
		server: {
			baseDir: "dist"
		}
	})
	watch("scss/*.scss", compileSass);
	watch("js/*.js", compileJS);
	watch(["dist/*html", "dist/**/*.html"], reloadHTML);
}

exports.default = watchFiles
