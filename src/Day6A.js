const fs = require('fs');

// Initialize light 2d array
const ROWS = COLS = 1000;
let lights = Array(ROWS);
for (let i = 0; i < ROWS; i++) {
    lights[i] = Array(COLS).fill(false);
}

// Helper methods
turnOnLights = (startCoord, endCoord) => {
    for(let i = startCoord[1]; i <= endCoord[1]; i++) {
        for (let j = startCoord[0]; j <= endCoord[0]; j++) {
            lights[i][j] = true;
        }
    }
}

turnOffLights = (startCoord, endCoord) => {
    for(let i = startCoord[1]; i <= endCoord[1]; i++) {
        for (let j = startCoord[0]; j <= endCoord[0]; j++) {
            lights[i][j] = false;
        }
    }
}

toggleLights = (startCoord, endCoord) => {
    for(let i = startCoord[1]; i <= endCoord[1]; i++) {
        for (let j = startCoord[0]; j <= endCoord[0]; j++) {
            lights[i][j] = !lights[i][j];
        }
    }
}

getNumLightsOn = () => {
    let numLightsOn = 0;
    for(let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (lights[i][j]) numLightsOn++;
        }
    }

    return numLightsOn;
}


// Handle Input
fs.readFile('./Day6Input.txt', 'utf-8', (err, data) => {
// fs.readFile('./Day6Input_test.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    handleInput(data);
});

handleInput = (input) => {
    const records = input.split(/\r?\n/);
    // console.log(records)
    records.forEach(rec => {
        // Some string parsing to get the state and coords
        let state = -1;
        let tmp = '';
        if (rec.startsWith('turn on ')) {
            state = 0;
            tmp = rec.replace('turn on ', '').split(' through ');
        } else if (rec.startsWith('toggle ')) {
            state = 1;
            tmp = rec.replace('toggle ', '').split(' through ');
        } else if (rec.startsWith('turn off ')) {
            state = 2;
            tmp = rec.replace('turn off ', '').split(' through ');
        }

        const startCoord = [0,0];
        const endCoord = [0,0];
        startCoord[0] = +tmp[0].split(',')[0]
        startCoord[1] = +tmp[0].split(',')[1]
        endCoord[0] = +tmp[1].split(',')[0]
        endCoord[1] = +tmp[1].split(',')[1]

        if (state < 0) {
            console.log("ERROR: What do I do????")
        } else if (state === 0) {
            // turn on lights
            turnOnLights(startCoord, endCoord);
        } else if (state === 1) {
            // toggle lights
            toggleLights(startCoord, endCoord);
        } else if (state === 2) {
            // turn off lights
            turnOffLights(startCoord, endCoord);
        }

        // console.log(`Number of Lights ON: ${getNumLightsOn()}`);
    })
    console.log(`Number of Lights ON: ${getNumLightsOn()}`);
}




// // console.log("BEFORE");
// // console.log(lights);

// turnOnLights([0,0], [2,2]);
// turnOffLights([0,0], [2,0]);
// toggleLights([0,0], [3,3]);

// console.log("AFTER");
// console.log(lights);