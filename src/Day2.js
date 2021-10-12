const fs = require('fs');

// fs.readFile('./Day2Input_test.txt', 'utf-8', (err, data) => {
fs.readFile('./Day2Input.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    handleInput(data);
    
});

class Dimension {
    constructor(height, width, length) {
        this.height = height;
        this.width = width;
        this.length = length;
    }
}

getSqrFt = (accum, dimension) => {
    const l = dimension.length;
    const w = dimension.width;
    const h = dimension.height;

    const sides = [2*l*w, 2*w*h, 2*h*l];
    let smallSide = sides[0] / 2;
    for(let i = 1; i < sides.length; i++) {
        if ((sides[i] / 2) < smallSide) {
            smallSide = sides[i] / 2;
        }
    }

    const sqrFt = sides.reduce((acc, side) => acc + side) + smallSide;
    return accum + sqrFt;
}

getRibbonLength = (accum, dimension) => {
    const l = dimension.length;
    const w = dimension.width;
    const h = dimension.height;

    const faceLengths = [w, l, h];
    let largestFace = faceLengths[0];
    for(let i = 1; i < faceLengths.length; i++) {
        if (faceLengths[i] > largestFace) {
            largestFace = faceLengths[i];
        }
    }
    const smallestPerimeter = (faceLengths.reduce((acc, length) => acc + length) - largestFace) * 2;
    const area = faceLengths.reduce((acc, length) => {return acc * length}, 1);
    // console.log(dimension);
    // console.log('Perimeter: ' + smallestPerimeter);
    // console.log('Area: ' + area);
    // console.log('Ribbon Needed: ' + (smallestPerimeter + area))

    return accum + smallestPerimeter + area;
}

function handleInput(input) {
    const records = input.split(/\r?\n/);
    const dimensions = records.map(record => {
        const tmpDim = record.split('x');
        return new Dimension(+tmpDim[0], +tmpDim[1], +tmpDim[2]);
    })

    const totalSqrFt = dimensions.reduce(getSqrFt, 0);
    console.log('Total Wrapping Paper in sqrft: ' + totalSqrFt);

    const totalRibbonFt = dimensions.reduce(getRibbonLength, 0);
    console.log('Total Ribbon Length in ft: ' + totalRibbonFt);
}