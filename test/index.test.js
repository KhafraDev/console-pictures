const { equal } = require('assert');
const { join } = require('path');
const image = require('../index');

describe('Image', () => {
    it('will return a string ANSI encoded.', async () => {
        const res = await image(join(__dirname, 'in.png'));
        process.stdout.write(res); // should fail on most non-string types
        equal(typeof res, 'string');
    });
});