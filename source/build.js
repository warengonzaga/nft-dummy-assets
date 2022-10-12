const fs = require('fs-extra');
const zip = require('zip-folder');

const collectionsPath = 'source/collections';
const twPath = 'thirdweb';

const prepare = () => {
    // read the folders for preparation
    fs.readdir(collectionsPath, (err, files) => {
        if (!err) {
            files.forEach(file => {
                let createTWFolder = collectionsPath + '/' + file + '/' + twPath;
                let imageFolder = collectionsPath + '/' + file + '/images/';
                let metadataFolder = collectionsPath + '/' + file + '/metadata/_metadata.json';
                let metadataTWFolder = createTWFolder + '/_metadata.json';
                // cerate folder named thirdweb
                fs.mkdir(createTWFolder, err => {
                    if (!err) {
                        console.log('[build] created '+twPath+' folder in "'+file+'" successfully.');
                        // move the metadata file to thirdweb folder
                        fs.copy(metadataFolder, metadataTWFolder, err => {
                            (!err) ? console.log('[build] copied metadata of "'+file+'" to "'+file+'/'+twPath+'" successfully.') : console.log(err);
                        });
                        // move the images to thirdweb folder
                        fs.copy(imageFolder, createTWFolder, err => {
                            if (!err) {
                                console.log('[build] copied images of "'+file+'" to "'+file+'/'+twPath+'" successfully.')
                                // package the collection folder after preparation
                                package();
                            } else {
                                console.log(err);
                            }
                        })
                    } else {
                        console.log(err);
                    }
                })
            });
        } else {
            console.log(err);
        }
    });
};

const package = () => {
    // create builds folder
    fs.mkdir('builds', err => {
        if (!err) {
            console.log('[build] created build folder successfully.');
            // read the folders for compression
            fs.readdir(collectionsPath, (err, files) => {
                if (!err) {
                    files.forEach(file => {
                        let collectionsFolder = collectionsPath + '/' + file;
                        let zipFolder = 'builds/' + file + '.zip';
                        // compress folders into zip and move it to builds
                        zip(collectionsFolder, zipFolder, err => {
                            if (!err) {
                                console.log('[build] zipped folder ' + file + ' successfully.');
                                clean(); // delete the thirdweb folders after compression
                            } else {
                                console.log(err);
                            }
                        });
                    });
                }
            });
        } else {
            console.log(err);
        }
    });
}

const clean = () => {
    // read the folders
    fs.readdir(collectionsPath, (err, files) => {
        if (!err) {
            files.forEach(file => {
                let twFolder = collectionsPath + '/' + file + '/' + twPath;
                // delete the thirdweb folders in each dummy collections
                fs.remove(twFolder, err => {
                    (!err) ? console.log('[clean] deleted '+twPath+' folders in collections folders successfully.') : console.log(err);
                })
            })
        } else { console.log(err) };
    });
}

// let's g!
const buildDummies = () => {
    prepare();
}

module.exports = { buildDummies };
