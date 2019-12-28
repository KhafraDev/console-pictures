const { join } = require('path');
const image = require('../index');

describe('Image', () => {
    it('will return a string ANSI encoded.', function() {
        this.timeout(0); // disable timeouts
        return image(join(__dirname, 'in.png'))
            .then(res => process.stdout.write(res));
    });
});