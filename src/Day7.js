const fs = require('fs');

// Handle Input
fs.readFile('./Day7Input.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    handleInput(data);
});

// Key - WIRE_ID / Value - WIRE_INPUT_STR
const recordMap = new Map();
const readyToUpdateMap = new Map();

// Look through the recordMap and mark those entries whose input variables have been defined and are ready to process
populateReadyToUpdate = (initialB = -1) => {
    recordMap.forEach((elem, key) => {
        if(elem.includes('OR')) {
            const ops = elem.split(' OR ');
            if(!isNaN(+ops[0]) && !isNaN(+ops[1])) {
                const newVal = +ops[0] | +ops[1];
                readyToUpdateMap.set(key, newVal);
            }
        } else if (elem.includes('NOT')) {
            const op = elem.substring(4);
            if (!isNaN(+op)) {
                const newVal = ~op << 16 >>> 16;
                readyToUpdateMap.set(key, newVal);
            }
        } else if (elem.includes('LSHIFT')) {
            const ops = elem.split(' LSHIFT ');
            if(!isNaN(+ops[0]) && !isNaN(+ops[1])) {
                const newVal = +ops[0] << +ops[1];
                readyToUpdateMap.set(key, newVal);
            }
        } else if (elem.includes('RSHIFT')) {
            const ops = elem.split(' RSHIFT ');
            if(!isNaN(+ops[0]) && !isNaN(+ops[1])) {
                const newVal = +ops[0] >> +ops[1];
                readyToUpdateMap.set(key, newVal);
            }
        } else if (elem.includes('AND')) {
            const ops = elem.split(' AND ');
            if(!isNaN(+ops[0]) && !isNaN(+ops[1])) {
                const newVal = +ops[0] & +ops[1];
                readyToUpdateMap.set(key, newVal);
            }
        } else {
            const tmp = elem.split(' -> ');
            if (!isNaN(+tmp[0])) {
                // Initial number assignment
                if (key === 'b' && initialB !== -1) {
                    readyToUpdateMap.set(key, initialB);
                } else {
                    readyToUpdateMap.set(key, elem);
                }
            }
        }
    })

    readyToUpdateMap.forEach((elem, key) => {
        recordMap.delete(key)
    })
}


handleInput = (input) => {
    // Initialize recordMap
    const records = input.split(/\r?\n/);
    records.forEach(rec => {
        const tmp = rec.split(' -> ');
        recordMap.set(tmp[1], tmp[0]);
    });

    // Initial process cycle
    let valOfA = 0;
    while (recordMap.size > 0) {
        populateReadyToUpdate();
    
        // For each entry in readyToUpdate, replace the corresponding input variables in recordMap
        let cycle = 0;
        while ( cycle < 2) {
            recordMap.forEach((elem, key) => {
                readyToUpdateMap.forEach((elemAsValue, updateKey) => {
                    let regex = new RegExp("\\b" + updateKey + "\\b");
                    if (regex.test(elem)) {
                        if (key === 'a') {
                            valOfA = elem.replace(regex, elemAsValue);
                            console.log(`${elem} -> ${key} ::becomes:: ${valOfA} -> ${key}`)
                        }
                        recordMap.set(key, elem.replace(regex, elemAsValue));
                    }
                    
                })
            });
            cycle++;
        }
    
        // Clear the update map, as these have now all been replaced
        readyToUpdateMap.clear();
    }

    // Reset the record, but now use
    const records2 = input.split(/\r?\n/);
    records2.forEach(rec => {
        const tmp = rec.split(' -> ');
        recordMap.set(tmp[1], tmp[0]);
    })

    while (recordMap.size > 0) {
        populateReadyToUpdate(valOfA);
    
        // For each entry in readyToUpdate, replace the corresponding input variables in recordMap
        let cycle = 0;
        while ( cycle < 2) {
            recordMap.forEach((elem, key) => {
                readyToUpdateMap.forEach((elemAsValue, updateKey) => {
                    let regex = new RegExp("\\b" + updateKey + "\\b");
                    if (regex.test(elem)) {
                        if (key === 'a')
                            console.log(`${elem} -> ${key} ::becomes:: ${elem.replace(regex, elemAsValue)} -> ${key}`)
                        recordMap.set(key, elem.replace(regex, elemAsValue));
                    }
                    
                })
            });
            cycle++;
        }
    
        // Clear the update map, as these have now all been replaced
        readyToUpdateMap.clear();
    }
}