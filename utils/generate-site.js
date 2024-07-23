/*This file, generate-site.js, is a component file to a larger app. This means it has very specific, modular code within it for
performing distinct pieces of an apps functionality. fs is a built in tool within node.js, known as the file system module, which allows
the app to work with the file system in your computer. fs doesn't need to be installed by the user, but required as it is below, for use
within your apps.*/
const fs = require("fs");

/*writeFile is a function which creates our index.html file. We first initialize a parameter of fileContent, then immediatly enter into
a Promise callback. This accepts two arguments, resolve and reject, for if the callback passes or fails. Then we use fs built-in method
writeFile() to specify what we'd like the function to create, passing in a file-path string of where to write data to, fileContent as
the data to be written, and err as a callback for if the operation fails. We then enter an if statement that checks if err evaluates to
truthy(this would mean that the operation DID fail), and if so we pass err to the reject method- allowing us to see an error response
to our failed Promise- then return out of the statement/function, preventing any further code from running. If err is falsey, we skip
the if statement and use the resolve method instead, creating an object with the properties of ok and message. These values will be
passed into a .then() method later in the app.*/
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile("./dist/index.html", fileContent, err => {

            if (err) {
                reject(err);
                return;
            };
            resolve({
                ok: true,
                message: "File created."
            });
        });
    });
};
/*copyFile is a function which copies our two style.css stylesheets. Much like writeFile, we initialize fileContent, enter into a
promise callback, and pass resolve and reject to that callback. Here in copyFile, we instead use fs built-in method of copyFile() to
denote which file we would like copied, with the first file-path string being the source of what we'd like to copy and the second
file-path string being the destination we'd like to copy to, and err again as a callback should the operation fail. We again enter an if
statement for error handling, and use the resolve() method to create an object that will be passed into a .then() method.*/
const copyFile= fileContent => {
    return new Promise((resolve, reject) => {
        fs.copyFile("./src/style.css", "./dist/style.css", err => {

            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: "File copied."
            });
        });
    });
};

/*Here, we define that we'd like to export the functionality of this module to the wider app. This is what will allow us to
import/require these functions to other parts of our app.*/
module.exports = { writeFile, copyFile };