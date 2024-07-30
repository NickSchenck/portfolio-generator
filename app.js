/*app.js acts as a sort of compiler for the other files in this app; generate-site.js and page-template.js both import their
functionality into this file.*/
/*Here we start by defining some variables are required-in code; this allows us access to other files functionality in an export/import
file structure.*/
const { writeFile, copyFile } = require("./utils/generate-site");
const inquirer = require('inquirer');
const generatePage = require("./src/page-template");

/*promptUser is a function which defines/outlines much of the initial prompts a user will be asked, upon starting the app through a CLI.
We enter into a return and use a .prompt method from inquirer on our inquirer import. Each defined prompt is denoted as its own object,
with various NAME: VALUE pairs in the object to define what it is, how the user should interact with it, what text will be displayed to
the user when they're prompted, and methods(validate, when) in some.*/
const promptUser = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name? (Required)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter your name.");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub username: (Required)",
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log("Please enter your GitHub username.")
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "confirmAbout",
            message: "Would you like to enter some information about yourself for an 'About' section?",
            default: true
        },
        {
            type: "input",
            name: "about",
            message: "Provide some information about yourself:",
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};

/*promptProject is a function which does much of the same as the above function; defines/outlines prompts the user will be asked, though
here the prompts are focused on the projects the user is adding. We start by initializing the parameter portfolioData, then enter an if
statement to check if the projects property of portfolioData is falsey, and if so set the projects property to an empty array. We 
console.log a string which is useful in seperating the more user oriented prompts from the project oriented prompts here. Then we enter
a return, using a .prompt method on the imported inquirer to again define various NAME: VALUE pairs for the user to be prompted with.
This is largely the same as before; define what a prompt is, how the user should interact with it, what text will be displayed to the
user when they're prompted, a method(validate), and a checkbox option for selecting applicable languages-used within a project.
Continued... */
const promptProject = portfolioData => {
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
    =================
    Add a New Project
    =================
    `)
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of your project? (Required)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter a name for your project.")
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "description",
            message: "Provide a description of the project (Required)",
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log("Please provide a description of your project.")
                    return false;
                }
            }
        },
        {
            type: "checkbox",
            name: "languages",
            message: "What did you build this project with? (Check all the apply)",
            choices: ["JavaScript", "HTML", "CSS", "ES6", "jQuery", "Bootstrap", "Node"]
        },
        {
            type: "input",
            name: "link",
            message: "Enter the GitHub link to your project. (Required)",
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log("Please enter a valid GitHub project link.")
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "feature",
            message: "Would you like to feature this project?",
            default: false
        },
        {
            type: "confirm",
            name: "confirmAddProject",
            message: "Would you like to enter another project?",
            default: false
        }
    ])
/*...At the end of the .prompt method, we append a .then method, using an anonymous function with the parameter projectData to call the
.push method, which will save the projectData variable to the projects property of portfolioData. Still within the anonymous function,
we enter an if statement which checks if rojectData.confirmAddProject the confirmAddProject property of projectData is truthy(if the
user selected the option to add any additional projects), and return a call to the promptProject function with an argument of
portfolioData. If the confirmAddProject property is not truthy, we instead return just the variable portfolioData.*/
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};

/*Here is where out app is started. We begin with a call to the promptUser function, append a .then method with a call to the
promptProject function, append a .then method which uses an anonymous function with a parameter of portfolioData to return a call to the
generatePage function- with an argument of portfolioData...*/
promptUser()
    .then(promptProject)
    .then(portfolioData => {
        return generatePage(portfolioData);
    })
/*...append another .then method using another anonymous function with a parameter of pageHTML to return a call to the writeFile function
with an argument of pageHTML, append an additional .then method using an additional anonymous function with a parameter of
writeFileResponse to console.log writeFileResponse and return a call to the copyFile function...*/
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
/*...append a final .then method using an anonymous function with a parameter of copyFileResponse to console.log copyFileResponse, and
finally append a .catch method using an anonymous function with a parameter of err to console.log err- should anything fail or not
function properly.*/
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    });
    
/*To get meaningful debugging info, add breakpoint to the end of app.js, use F10 or F11 to progress until you can interact with the app
CLI prompts, then switch to debug console after finished with prompts*/