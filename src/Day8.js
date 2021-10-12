const fs = require('fs');

// Handle Input
fs.readFile('./Day8Input.txt', 'utf-8', (err, data) => {
// fs.readFile('./Day8Input_test.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    handleInput(data);
});

const QUOTE_REGEX = new RegExp(/\\\"/);
const SLASH_REGEX = new RegExp(/\\\\/);
const HEX_REGEX = new RegExp(/\\x[0-9|a-f][0-9|a-f]/);

handleInput = (input) => {
    // Initialize recordMap
    const records = input.split(/\r?\n/);

    let numTotalChars = numMemoryChars = numEncodedChars = 0

    records.forEach(rec => {
        let origLength = memLength = 0;
        origLength = rec.length;

        let encodedLength = rec.length;

        // add four to account for stringifying the surrounding quotes
        encodedLength += 4;

        let tmpRec = rec;
        // Replace any escaped quotes and add two chars for encoded length
        while(QUOTE_REGEX.test(tmpRec)) {
            tmpRec = tmpRec.replace(QUOTE_REGEX, '-');
            encodedLength += 2;
        }

        // Replace any escaped backslashes and add two chars for encoded length
        while(SLASH_REGEX.test(tmpRec)) {
            tmpRec = tmpRec.replace(SLASH_REGEX, '-');
            encodedLength += 2;
        }

        // Replace and hex chars and add one char for encoded length
        while(HEX_REGEX.test(tmpRec)) {
            tmpRec = tmpRec.replace(HEX_REGEX, '-');
            encodedLength += 1;
        }

        // Remove wrapping quotes
        memLength = tmpRec.length - 2;

        numTotalChars += origLength;
        numMemoryChars += memLength;
        numEncodedChars += encodedLength
        // console.log(`${rec} becomes ${tmpRec} with Original/Mem/Encoded length: ${origLength} / ${memLength} / ${encodedLength}`);
    });

    console.log(`PART A: ${numTotalChars} - ${numMemoryChars} = ${numTotalChars - numMemoryChars}`);
    console.log(`PART B: ${numEncodedChars} - ${numTotalChars} = ${numEncodedChars - numTotalChars}`);
}