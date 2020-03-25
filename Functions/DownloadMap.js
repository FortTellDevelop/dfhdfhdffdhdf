const { WickDownloader } = require('wick-downloader');
const { Package } = require('node-wick');
const fs = require('fs');

const wickdl = new WickDownloader();

async function getMapImage(callback1, callback2) {
    await wickdl.startService();
    
    const pakNames = wickdl.getPakNames();
    const encryptedPak = await wickdl.getPak(pakNames[13]);

    const pakService = await wickdl.decryptPak(encryptedPak, 'cbdeb191165b1d8d51759732aafc0633159ccf993d8662fd99d56f9c3f3f7401');
    const fileNames = pakService.get_file_names();

    console.log('\x1b[33m%s\x1b[0m' , '[LOGS]', 'Processing Map Image...');

    await fileNames.forEach(async (element, i) => {
        if(element == 'Athena/Apollo/Maps/UI/Apollo_Terrain_Minimap.uasset') {
            const fileData = await wickdl.getFileData(pakService, fileNames[i]);

            fs.writeFileSync('../Stored Data/Map/Apollo_Terrain_Minimap.uasset', fileData);
            console.log('\x1b[33m%s\x1b[0m' , '[LOGS]', 'Successfully Located The .Uasset File!');
            callback1('Uasset Found!');
        }
         
        else if(element == 'Athena/Apollo/Maps/UI/Apollo_Terrain_Minimap.uexp') {
            const fileData = await wickdl.getFileData(pakService, fileNames[i]);

            fs.writeFileSync('../Stored Data/Map/Apollo_Terrain_Minimap.uexp', fileData);
            console.log('\x1b[33m%s\x1b[0m' , '[LOGS]', 'Successfully Located The .Uexp File!');
            callback2('Uexp Found!');
        }
    });
};

getMapImage(function(result1) {}, function(result2) {
    let asset = new Package('../Stored Data/Map/Apollo_Terrain_Minimap');

    fs.writeFileSync('../Stored Data/Map/Apollo_Terrain_Minimap.png', asset.get_texture());
    console.log('\x1b[33m%s\x1b[0m' , '[LOGS]', 'Successfully Downloaded Map!');
});
