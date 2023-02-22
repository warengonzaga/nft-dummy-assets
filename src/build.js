const basePath = process.cwd();
const { readdir, existsSync, mkdirSync, copySync, copyFileSync, removeSync } = require('fs-extra');
const zip = require('zip-folder');

const collections = `${basePath}/src/collections`;
const builds = `${basePath}/builds`;

const buildDummies = () => {

    // read collections folder for files
    readdir(collections, (err, files) => {
        if (err) throw err; // throw error

        // list collection folders
        files.forEach(file => {

            // set constant path
            const images = `${collections}/${file}/images`;
            const metadata = `${collections}/${file}/metadata`;
            const thirdweb = `${collections}/${file}/thirdweb`;
            const collection = `${collections}/${file}`;

            // if thirdweb folder doesn't exist...
            if (!existsSync(thirdweb)) {
                // create folder
                mkdirSync(thirdweb, (err) => { if (err) throw err });
            }

            // if images and metadata exists...
            if (existsSync(images) || existsSync(metadata)) {

                // copy the images and metadata to the thirdweb folder
                copySync(images, thirdweb);

                // filter if the metadata is in json format
                if (existsSync(`${metadata}/_metadata.json`)) {
                    copySync(`${metadata}/_metadata.json`, `${thirdweb}/_metadata.json`);
                }
                
                // filter if the metadata is in csv format
                if (existsSync(`${metadata}/metadata.csv`)) {
                    copySync(`${metadata}/metadata.csv`, `${thirdweb}/metadata.csv`);
                }

                console.log(`Required files has been copied...`);

                // package the dummy collection
                if (!existsSync(builds)) {
                    mkdirSync(builds, (err) => { if (err) throw err });
                }
                console.log(`Zipping the dummy collections...`);
                zip(collection, `${builds}/${file}.zip`, (err) => { if (err) throw err });
                console.log(`Done! Your dummies are ready!`);
            
            } else {
                // if not, show this console log
                console.log(`Please check if the collections has required files...`);
            }

        });
    });

}

module.exports = { buildDummies };
