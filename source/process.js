// process is an instance of event emitter.


process.on('uncaughtException', (err) => {
process.stderr.write('err')

process.exit(1);
});


process.stdin.resume();
console.dog();
