import _ from 'underscore'
import filesystem from 'fs'
// import stream from 'stream'

// strings
let file1 = filesystem.readFileSync('templatingSystem/1.template.ejs', 'utf-8')
let file2 = filesystem.readFileSync('templatingSystem/2.template.ejs', 'utf-8')

// compiled javascript template into function
var compiledTemplate1 = _.template(file1);
var compiledTemplate2 = _.template(file2);

var views = ['', compiledTemplate1, compiledTemplate2]

// invoke functions
let string = compiledTemplate1({
    views: views
})

// let templateStream = new stream.Readable
// templateStream.push(string)
// templateStream.push(null)

export default string
