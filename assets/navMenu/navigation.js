
// Function to load Nav Stamp for each page 
document.addEventListener("DOMContentLoaded", function (){
    fetch("/assets/navMenu/navigation.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navigationMenu").innerHTML = data;

            const currentPage = document.body.getAttribute("data-page");
            if (currentPage) {
                document.querySelector(`.nav-link[href$="${currentPage}.html"]`)?.classList.add("active");
            }
        })
        .catch(error => console.error("Error loading navigation:", error));
});

// Function to load custom stylings for Nav per page 
document.addEventListener("DOMContentLoaded", function (){
    const waveImage = document.getElementById("wave-image");
    const outerOval = document.getElementById("outer-oval");
    const currentPage = document.body.getAttribute("data-page");

    const pageStyles = {
        resume:{
            wave: "/assets/images/navigation/green-wave.png",
            ovalColor: "#31788a",
        },
        contact:{
            wave: "/assets/images/navigation/purple-wave.png",
            ovalColor: "#7a52a3",
        }
    };

    if (pageStyles[currentPage]) {
        waveImage.src = pageStyles[currentPage].wave;
        outerOval.setAttribute("stroke", pageStyles[currentPage].ovalColor);
    }
});


// Function to capture last visited page and update Nav 
document.addEventListener("DOMContentLoaded", function (){
    fetch("/assets/navMenu/navigation.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navigationMenu").innerHTML = data;

            const currentPage = document.body.getAttribute("data-page");
            if (currentPage) {
                document.querySelector(`.nav-link[href$="${currentPage}.html"]`)?.classList.add("active");
            }

            updateNavigation();
        })
        .catch(error => console.error("Error loading navigation:", error));
});

function updateNavigation(){
    const currentPage = document.body.getAttribute("data-page");
    let previousPage = localStorage.getItem("previousPage") || "home";

    const pageMapping = {
        home: { file: "home.html", name: "Home", id: "home-hov" },
        resume: { file: "pages/resume.html", name: "Resume", id: "resume-hov" },
        projects: { file: "pages/projects.html", name: "Projects", id: "projects-hov" },
        caseStudies: { file: "pages/caseStudies.html", name: "Case Studies", id: "caseStudies-hov" },
        extraDetails: { file: "extraDetails.html", name: "Extra Details", id: "extraDetails-hov" },
        contactMe: { file: "pages/contactMe.html", name: "Contact Me", id: "contact-hov" },
    };

    if (!pageMapping[previousPage]){
        previousPage = "home"; 
    }

    const fromLink = document.querySelector(".from-link");
    if (fromLink) {
        fromLink.textContent = pageMapping[previousPage].name;
        fromLink.href = `/${pageMapping[previousPage].file}`;
    }

    const toLinksContainer = document.querySelector(".routes");
    if (toLinksContainer){
        toLinksContainer.innerHTML = ""; 
        Object.keys(pageMapping).forEach((page) => {
            if (page !== currentPage && page !== previousPage){
                const link = document.createElement("a");
                link.href = `/${pageMapping[page].file}`;
                link.textContent = pageMapping[page].name;
                link.id = pageMapping[page].id;
                link.addEventListener("mouseover", function (){
                    this.style.color = getHoverColor(page);
                });
                link.addEventListener("mouseout", function (){
                    this.style.color = "black"; 
                });

                toLinksContainer.appendChild(link);
            }
        });
    }

    localStorage.setItem("previousPage", currentPage);
}

// Function to get hover color dynamically
function getHoverColor(page) {
    const hoverColors = {
        home: "#079895",
        resume: "#D268AC",
        projects: "#90C28B",
        caseStudies: "#3998D3",
        extraLink: "#B0081F",
        contactMe: "#655CB3",
    };

    return hoverColors[page] || "black";
}
