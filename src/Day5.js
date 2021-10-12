const fs = require('fs');

fs.readFile('./Day5Input.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    handleInput(data);
    
});

const naughtyBits = ['ab', 'cd', 'pq', 'xy']

// Returns false if good and true if naughty
naughtyTest_old = (record) => {
    for (let i = 0; i < naughtyBits.length; i++) {
        if(record.includes(naughtyBits[i])) {
            return true;
        }
    }

    const vowelString = 'aeiou';
    let numVowels = 0;
    let hasDoubles = false;

    // Check the first char for vowel here.  Can't do it in the loop or will hit out of bounds exception
    if (vowelString.includes(record[0])) numVowels++;

    for (let i = 1; i < record.length; i++) {
        // Check for vowels
        if (vowelString.includes(record[i])) numVowels++;

        // Check if this char and the previous form a double
        if (record[i] === record[i - 1]) {
            hasDoubles = true;
        }
    }

    if (numVowels < 3 || !hasDoubles) {
        return true;
    }

    return false;
}

// Returns false if good and true if naughty
naughtyTest = (record) => {
    let hasMirror = false;
    let hasPair = false;

    for (let i = 2; i < record.length; i++) {
        if (record[i] === record[i - 2]) {
            hasMirror = true;
        }
    }

    for (let i = 1; i < record.length; i++) {
        let pair = record.substring(i-1, i + 1);
        const recs = [record.substring(0, i-1), record.substring(i+1, record.length)];
        recs.forEach(rec => {
            if (rec.includes(pair)) {
                hasPair = true;
            }
        })
        
    }

    if (hasMirror && hasPair) return false;

    return true;
}

handleInput = (input) => {
    const records = input.split(/\r?\n/);
    let niceCount = 0;
    records.forEach(record => {
        const isNaughty = naughtyTest(record);
        if (!isNaughty) niceCount++;
    })

    console.log(`Number of 'Nice' kids = ${niceCount}`);
}