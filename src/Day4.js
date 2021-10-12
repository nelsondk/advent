const crypto = require('crypto');

let counter = 0 ;
while (counter < 1_100_000) {
    // let baseName  = 'abcdef';
    // let baseName  = 'pqrstuv';
    let baseName  = 'bgvyzdsv';
    
    let name = baseName + counter;
    let hash = crypto.createHash('md5').update(name).digest('hex');

    if(hash.startsWith('000000')) {
        console.log(name);
        console.log(hash);
        break;
    }

    counter++;
}