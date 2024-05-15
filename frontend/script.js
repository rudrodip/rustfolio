const text = `
██████╗░██████╗░░██████╗  ░█████╗░░██████╗░██╗
██╔══██╗██╔══██╗██╔════╝  ██╔══██╗██╔════╝░██║
██████╔╝██║░░██║╚█████╗░  ███████║██║░░██╗░██║
██╔══██╗██║░░██║░╚═══██╗  ██╔══██║██║░░╚██╗██║
██║░░██║██████╔╝██████╔╝  ██║░░██║╚██████╔╝██║
╚═╝░░╚═╝╚═════╝░╚═════╝░  ╚═╝░░╚═╝░╚═════╝░╚═╝
               -𝒑𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝒓𝒖𝒔𝒕

github: https://github.com/rudrodip
twitter: https://twitter.com/rds_agi
linkedin: https://www.linkedin.com/in/rudrodip
`;

console.log(text);
const projectContainer = document.getElementById("project-container");
projects.forEach((project) => {
  const projectCard = document.createElement("div");
  projectCard.classList.add("project-card");

  const projectContent = document.createElement("div");
  projectContent.style.display = "flex";
  projectContent.style.flexDirection = "column";
  projectContent.style.justifyContent = "space-between";

  const projectDescription = document.createElement("div");

  const projectTitle = document.createElement("h2");
  projectTitle.innerText = project.title;

  const projectDescriptionText = document.createElement("p");
  projectDescriptionText.style.paddingTop = "1rem";
  projectDescriptionText.style.paddingBottom = "1rem";
  projectDescriptionText.style.paddingRight = "0.5rem";
  projectDescriptionText.style.fontSize = "var(--font-lg)";
  projectDescriptionText.innerText = project.description;

  projectDescription.appendChild(projectTitle);
  projectDescription.appendChild(projectDescriptionText);

  const projectLinks = document.createElement("div");
  projectLinks.classList.add("link-container");
  projectLinks.style.fontWeight = "bold";

  project.tags.forEach((tag) => {
    const tagElement = document.createElement("p");
    tagElement.innerText = tag;
    projectLinks.appendChild(tagElement);
  });

  const projectLinksContainer = document.createElement("div");
  projectLinksContainer.classList.add("link-container");
  projectLinksContainer.style.textDecoration = "underline";
  projectLinksContainer.style.paddingTop = "1rem";

  project.links.forEach((link) => {
    const linkElement = document.createElement("a");
    linkElement.href = link.url;
    linkElement.target = "_blank";
    linkElement.innerText = link.name;
    projectLinksContainer.appendChild(linkElement);
  });

  projectContent.appendChild(projectDescription);
  projectContent.appendChild(projectLinks);
  projectContent.appendChild(projectLinksContainer);

  projectCard.appendChild(projectContent);
  projectContainer.appendChild(projectCard);
})