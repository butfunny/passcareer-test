const chokidar = require("chokidar");
const gulp = require("gulp");
const path = require("path");
const fs = require("fs");

let cwd = process.cwd();

module.exports = {
    createCompiler({container,lookupDirs,distDir}) {
        const compileStyl = function() {
            return new Promise((resolve, reject)=> {

                const stylus = require("gulp-stylus");
                let styleFilePath = path.join(cwd, container.dir, container.file);
                if (!fs.existsSync(styleFilePath)) {
                    return reject(`Who removed the ${path.join(container.dir, container.file)} file??`);
                }

                gulp.src(styleFilePath)
                .pipe(stylus({
                    compress: true
                }))
                .pipe(gulp.dest(path.join(cwd, distDir)))
                .on("end", function() {
                    resolve();
                    console.log(`Compiled stylus to ${distDir}`);
                })
                ;
            });
        };

        const inject_ = function() {
            return new Promise((resolve, reject)=> {


                const target = gulp.src(path.join(cwd, container.dir, container.file) );
                const sort = require('gulp-sort');
                const sources = gulp.src(lookupDirs.map((lookupDir) => path.join(cwd, lookupDir, "**/*.styl")), {read: false}).pipe(sort());

                const inject = require("gulp-inject");
                target
                .pipe(inject(sources, {
                    starttag: '// inject:all',
                    endtag: '// endinject',
                    transform: function (filepath, file, i, length) {
                        console.log(filepath);
                        if (filepath.startsWith(`/${container.dir}`)) {
                            return null;
                        }

                        return `@import "../../..${filepath}";`;
                    }
                }))
                .pipe(gulp.dest(path.join(cwd, container.dir)))
                .on("end", ()=>{
                    console.log("Inject stylus done");
                    resolve();
                })
                ;
            });
        };

        return {
            watch: ()=> {
                inject_().then(() => {
                    compileStyl();

                    chokidar
                    .watch(lookupDirs.map((lookupDir) => path.join(cwd, lookupDir, "**/*.styl")), {
                        ignoreInitial: true
                    })
                    .on('add', function(event, path) {
                        inject_();
                    })
                    .on('unlink', function(event, path) {
                        inject_();
                    })
                    .on('change', function(event, path) {
                        compileStyl();
                    })
                    ;
                });

            },
            compile: ()=> {
                return inject_().then(compileStyl);
            }
        };
    }
};
