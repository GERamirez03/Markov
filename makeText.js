/** Command-line tool to generate Markov text. */

const process = require('node:process');
const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov.js')

function write(data) {
    const mm = new MarkovMachine(data);
    console.log(mm.makeText());
}

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(`Error reading path ${path}: ${err}`);
            process.exit(1);
        }
        write(data);
    });
}

async function webCat(url) {
    try {
        const resp = await axios.get(url);
        write(resp.data);
    } catch (err) {
        console.error(`Error fetching URL of ${url}\nError: ${err}`);
        process.exit(1);
    }
}

const argv = process.argv;
if (argv[2] === "file") {
    // console.log("file");
    cat(argv[3]);
} else if (argv[2] === "url") {
    // console.log("url");
    webCat(argv[3]);
} else {
    console.error(`Error - Invalid Parameter: ${argv[2]}`);
}