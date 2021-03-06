import fs from 'fs';
import Jimp = require('jimp');

export const TMP_DIR: string = __dirname + "/tmp/";

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const photo = await Jimp.read(inputURL);
            const outpath: string = TMP_DIR + '/filtered.' + Math.floor(Math.random() * 2000) + '.jpg';
            await photo
                .resize(256, 256) // resize
                .quality(60) // set JPEG quality
                .greyscale() // set greyscale
                .write(outpath, (img) => {
                    resolve(outpath);
                });

        } catch (error) {
            reject(error)
        }
    });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
    for (let file of files) {
        fs.unlinkSync(file);
    }
}

// getTmpFiles
// a helper function to get files in tmp directory
export async function getTmpFiles(): Promise<Array<string>> {
    return fs.readdirSync(TMP_DIR).map(fileName => TMP_DIR + fileName);
}

export function validateImageUrl(url: string): boolean {
    return url && (url.match(/\.(jpeg|jpg|gif|png)$/) != null)
}


