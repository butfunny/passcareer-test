const gulp = require("gulp");
const nodemon = require('gulp-nodemon');
const spawn = require('child_process').spawn;

const startServer = () => {
    nodemon({
        script: './dev/dev-server.js',
        ext: 'js',
        "ignore": [
            ".idea/",
            ".git/",
            "gulpfile.js",
            "src/",
            "dev/assets",
            "node_modules/"
        ],
        env: {'NODE_ENV': 'development'}
    });
};

function createAppStylusCompiler() {
    return require("./compile-stylus").createCompiler({
        container: {
            dir: `./src/assets/styl`,
            file: "style.styl",
        },
        lookupDirs: [`src/app`],
        distDir: `./dev/assets/css`,
    });
}

const stylusCompiler = {
    watch: () => {
        createAppStylusCompiler().watch();
    },
    compile() {
        return Promise.resolve(createAppStylusCompiler().compile());
    }
};


gulp.task("dev", () => {
    startServer();
    stylusCompiler.watch("./dev/assets/css");
    if (!/^win/.test(process.platform)) { // linux
        spawn("webpack", ["--watch"], {stdio: "inherit"});
    } else {
        spawn('cmd', ['/s', "/c", "webpack", "--watch"], {stdio: "inherit"});
    }
});
