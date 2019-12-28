const { PNG } = require('pngjs');
const { createReadStream } = require('fs');
const chalk = require('chalk');

/**
 * Convert an image into an Object of colored boxes.
 * @param {any} path Path to a PNG file.
 * @returns {Promise<any>}
 */
const getRGB = async path => {
    const pixels = {};

    return new Promise(resolve => {
        createReadStream(path)
        .pipe(new PNG())
        .on('parsed', function() { // arrow functions don't work because of "this"!
            for(let y = 0; y < this.height; y+=3) {
                pixels[y] = [];
                for(let x = 0; x < this.width; x+=3) {
                    const idx = (this.width * y + x) << 2;
                    pixels[y].push(chalk.rgb(this.data[idx], this.data[idx+1], this.data[idx+2])('█'));
                }
            }

            return resolve(pixels);
        });
    });
}

/**
 * Convert an image to a usable form of ASCII art for the console.
 * @param {any} path Path to a PNG file.
 * @returns {Promise<string>} ASCII art.
 */
const image = async path => {
    const pixels = await getRGB(path);
    const full = Object.values(pixels).map(p => p.join('') + '\n');

    return full.join('');
}

module.exports = image;