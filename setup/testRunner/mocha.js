/**
 * Programmatic rest runner https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically
 */ 
const Mocha = require('mocha'),
    filesystem = require('fs'),
    path = require('path'),
    confJson = require('../configuration/configuration.json')
    
var mocha = new Mocha(); // Instantiate a Mocha instance.

var testDirectory = path.join(confJson.SourceCodePath, 'serverSide')

/* List all files in a directory recursively */
var listFileRecursively = ({directory}) => {
    var results = []
    var list = filesystem.readdirSync(directory)
    list.forEach(filename => {
        let filepath = path.join(directory, filename)
        let stat = filesystem.statSync(filepath)
        if (stat && stat.isDirectory()) results = results.concat(listFileRecursively({directory: filepath}))
        else results.push({ name: filename, path: filepath })
    })
    return results
}

// Add each .js file to the mocha instance
listFileRecursively({directory: testDirectory})
    .filter(file => {
        // Only keep the .test.js files
        return file.name.substr(-8) === '.test.js';
    })
    .forEach((file) => {
        mocha.addFile(file.path)
    })

// Run tests.
mocha.run(failures => {
        // exit with non-zero status if there were failures
        process.on('exit', () => process.exit(failures))
    })
    // .on('test', function(test) {
    //     console.log('Test started: '+test.title);
    // })
    // .on('test end', function(test) {
    //     console.log('Test done: '+test.title);
    // })
    // .on('pass', function(test) {
    //     console.log('Test passed');
    //     console.log(test);
    // })
    // .on('fail', function(test, err) {
    //     console.log('Test fail');
    //     console.log(test);
    //     console.log(err);
    // })
    // .on('end', function() {
    //     console.log('All done');
    // })

