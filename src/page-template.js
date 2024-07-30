/*This page, page-template.js, is also a component file to the larger app, similat to generate-site.js.*/
/*generateAbout is a function which generates a specific portion of our page. We first initialize aboutText as a parameter, then
immediately enter an if statement to check if aboutText evaluates to falsey, and return an empty string if so. If not, we instead return
a string which contains html markup/structuring, as well as a template literal that allows us to insert the aboutText parameter into
that markup.*/
const generateAbout = aboutText => {
  if (!aboutText) {
    return "";
  }

  return `
  <section class="my-3" id="about">
    <h2 class="text-dark bg-primary p-2 display-inline-block">About Me</h2>
    <p>${aboutText}</p>
  </section>
  `;
};

/*generateProjects is a function which returns html markup in string format for parsing project-associated data into physical form. We
first initialize the projectsArr parameter, then enter into a return statement right away. The majority of the function and return is
html markup, but we do use template literals to access the projectsArr parameter, and append .filter and .map methods onto it. The
.filter method will sort through the whole object-array contained in projectsArr, and make a project-card/section for each of the
entries within projectsArr, and the .map method will determine the values associated with the variables name, description, languages, and
link then fill the details of a project-card with its associated values. We enter a second return in the anonymous function assigned to
the .map method, which determines the layout of a given project-cards content. We then call .join method with nothing passed into it to
join these elements without any additional space between them. Finally, the second section of generateProjects is for the generation of
projects the user does NOT want featured- a prompt asked of the user while interacting with the CLI.*/
const generateProjects = projectsArr => {
  return `
  <section class="my-3" id="portfolio">
  <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
  <div class="flex-row justify-space-between">
    ${projectsArr
    .filter(({ feature }) => feature)
    .map(({ name, description, languages, link }) => {
      return `
      <div class="col-12 mb-2 bg-dark text-light p-3">
      <h3 class="portfolio-item-title text-light">${name}</h3>
      <h5 class="portfolio-languages">
      Built with:
      ${languages.join(', ')}
      </h5>
            <p>${description}</p>
            <a href="${link}" class="btn"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
          </div>
      `;
    })
  .join('')}

  ${projectsArr
  .filter(({ feature }) => !feature)
  .map(({ name, description, languages, link }) => {
    return `
    <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
    <h3 class="portfolio-item-title text-light">${name}</h3>
    <h5 class="portfolio-languages">
      Built With:
      ${languages.join(', ')}
      </h5>
            <p>${description}</p>
            <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
          </div>
    `;
  })
  .join('')}
  </div>
  </section>
  `;
};

/*Here we are exporting an anonymous function. We start the function by initializing the parameter templateData, then use object
destructuring to assign values to our variables of projects, about, and header. After we enter a return statement that is again largely
returning html markup in string format for parsing into our physical page. We still use template literals to inject data into the html
markup where we need user-provided information to be, as well as calling both generateAbout and generateProjects with arguments from our
object destructuring, and calling a new instance of the Date class to provide the current year at bottom-of-page.*/
module.exports = templateData => {
  const { projects, about, ...header } = templateData;
  
  return `
    <!DOCTYPE html> 
  <html lang="en"> 
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Portfolio Demo</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
    <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
  </head>

  <body>
    <header>
      <div class="container flex-row justify-space-between align-center py-3">
        <h1 class="page-title text-secondary bg-dark py-2 px-3">${header.name}</h1>
        <nav class="flex-row">
          <a class="ml-2 my-1 px-2 py-1 bg-secondary text-dark" href="https://github.com/${header.github}">GitHub</a>
        </nav>
      </div>
    </header>
    <main class="container my-5">
      ${generateAbout(about)}
      ${generateProjects(projects)}
    </main>
    <footer class="container text-center py-3">
      <h3 class="text-dark">&copy; ${new Date().getFullYear()} by ${header.name}</h3>
    </footer>
  </body>
  </html>
    `;
};
