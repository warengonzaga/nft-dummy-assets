const basePath = process.cwd();
const { buildDummies } = require(`${basePath}/source/build.js`);

(() => {
    buildDummies();
})();
