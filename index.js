const fs = require('fs-extra');
const zip = require('zip-folder');

const collectionPath = 'source/collections/mata-nft';

// thirdweb build
const thirdwebBuild = () => {
    fs.mkdir(collectionPath + '/thirdweb', err => {
        (err) ? console.log(err) : console.log('[created] thirdweb temp folder...');
    });
    fs.copy(collectionPath + '/images/', collectionPath + '/thirdweb/', err => {
        (err) ? console.log(err) : console.log('[copied] images to thirdweb temp folder...');
    });
    fs.copy(collectionPath + '/metadata/_metadata.json', collectionPath + '/thirdweb/_metadata.json', err => {
        (err) ? console.log(err) : console.log('[copied] metadata to thirdweb folder...');
    });
    zipBuild();
}

// zip collection folder
const zipBuild = () => {
    fs.mkdir('builds', err => {
        (err) ? console.log(err) : console.log('[created] build folder...');
    });
    zip(collectionPath + '/thirdweb', 'builds/mata-nft.zip', err => {
        (err) ? console.log(err) : console.log('[zipped] build.zip...');
    });
}

thirdwebBuild();
