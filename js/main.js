const projects = [
    {
        title: 'Portfolio Project (This Project)',
        description: 'A responsive personal portfolio built from scratch using HTML, CSS, and vanilla JavaScript. Features a dynamic theme switcher and is populated by a JavaScript data structure.',
        imageUrl: "./images/project-placeholder-1.jpg",
        liveUrl: "#",
        githubUrl: "https://github.com/Mr-Himayam/portfolio-project"
    },

    {
        title: 'Project EMS',
        description: 'Employee Management System (EMS) is a web-based application built to simplify employee management for organizations. It provides a centralized platform to manage employee records, departments, attendance, and other essential workforce information.',
        imageUrl: "./images/project-placeholder-2.jpg",
        liveUrl: "https://project-ems-mgpo.onrender.com",
        githubUrl: "https://github.com/Mr-Himayam/Project-EMS"
    },

    {
        title: 'ProjectAirBnB',
        description: 'A full-stack Airbnb-inspired web application built with Node.js, Express.js, and MongoDB. The project allows users to browse, create, edit, and manage property listings through a clean and responsive interface.',
        imageUrl: './images/project-placeholder-3.jpg',
        liveUrl: '#',
        githubUrl: 'https://github.com/Mr-Himayam/Project-AirBnB'
    }
];

const themeToggle = document.querySelector('#theme-toggle')
const htmlElement = document.documentElement;
const projectsContainer = document.querySelector('.projects-container');

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

const renderProjects = () => {

    let allProjectsHTML = '';

    projects.forEach(project => {
        const projectCardHTML = `
        <div class="project-card">
        <div class="project-image-container">
            <img 
              src="${project.imageUrl}" 
              alt="Screenshot of the ${project.title} project" 
              class="project-image"
            >
        </div>
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-links">
            <a 
              href="${project.liveUrl}" 
              class="btn" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
            <a 
              href="${project.githubUrl}" 
              class="btn btn-secondary" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Code
            </a>
          </div>
        </div>
      </div>
    `;

    allProjectsHTML += projectCardHTML;
    
  });
  projectsContainer.innerHTML += allProjectsHTML;
}

themeToggle.addEventListener('click', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

(() => {
    const savedTheme = localStorage.getItem('theme');

    if(savedTheme){
        htmlElement.setAttribute('data-theme', savedTheme);

        if(savedTheme === 'dark'){
            themeToggle.checked = true;
        }
    }
})();

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();

  if(contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const submitButton = contactForm.querySelector('button[type="submit"]');

      formStatus.innerHtml = 'Sending...';
      formStatus.className = 'info';
      formStatus.style.display = 'block';
      submitButton.disabled = true;

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if(response.ok){
          formStatus.innerHTML = 'Message sent successfully!';
          formStatus.className = 'success';
          contactForm.reset();
        } else {
          response.json().then(data => {
            if(Object.hasOwn(data, 'errors')){
              formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
            } else {
              formStatus.innerHTML = "Oops! Something went wrong. Please try again later.";
            }
            formStatus.className = 'error';
          })
        }
      }).catch(error => {
        formStatus.innerHTML = "Oops! A network error occurred. Please check your connection and try again.";
        formStatus.className = 'error';
      }).finally(() => {
        submitButton.disabled = false;
      })
    })
  }
});
   

