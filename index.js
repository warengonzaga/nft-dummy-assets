const basePath = process.cwd();
const { buildDummies } = require(`${basePath}/src/build.js`);

(() => {
    buildDummies();
})();
