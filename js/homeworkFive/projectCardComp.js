class ProjectCard extends HTMLElement {
    constructor() {
        super();
        
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: 100%;
                    position: relative;
                    background-color: rgba(185, 185, 185, 0.8);
                    font-family: "Roboto Mono", monospace;
                    border-radius: 8px;
                    overflow: hidden;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    cursor: pointer;
                }

                :host(:hover) {
                    transform: rotate(-1deg) scale(1.03);
                    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
                }

                .project-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: 1;
                    transition: opacity 0.3s ease-in-out;
                }

                :host(:hover) .project-image {
                    opacity: 0.3;
                }

                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.65);
                    color: white;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    padding: 10px;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                :host(:hover) .overlay {
                    opacity: 1;
                }

                h2 {
                    font-size: 1.4vw;
                    font-weight: bold;
                    margin: 0;
                }

                p {
                    font-size: 1vw;
                    margin-top: 5px;
                }

                a {
                    text-decoration: none;
                    color: white;
                    font-size: 1vw;
                    background: rgba(255, 255, 255, 0.3);
                    padding: 5px 10px;
                    border-radius: 5px;
                    margin-top: 10px;
                }

                .in-progress {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    background: rgba(255, 165, 0, 0.9);
                    color: black;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-size: 0.9vw;
                    font-weight: bold;
                }
            </style>

            <div class="in-progress" style="display: none;">In Progress</div>
            <img class="project-image" />
            <div class="overlay">
                <h2></h2>
                <p></p>
                <a target="_blank">View Project</a>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector("h2").textContent = this.getAttribute("title") || "Untitled Project";
        this.shadowRoot.querySelector("p").textContent = this.getAttribute("description") || "No description available.";
        this.shadowRoot.querySelector(".project-image").src = this.getAttribute("image") || "/assets/images/default.jpg";
        this.shadowRoot.querySelector(".project-image").alt = this.getAttribute("title") || "Project Image";

        const link = this.getAttribute("link");
        if (link) {
            this.shadowRoot.querySelector("a").setAttribute("href", link);
        } else {
            this.shadowRoot.querySelector("a").remove();
        }
        if (this.getAttribute("data-status") === "in-progress") {
            this.shadowRoot.querySelector(".in-progress").style.display = "block";
        }
    }
}

customElements.define("project-card", ProjectCard);

document.addEventListener("DOMContentLoaded", function () {
    const projectsData = [
        {
            title: "Stocks",
            description: "A financial tracker with live stock prices.",
            image: "/assets/images/projects/stocks.png",
            link: "#",
            status: "in-progress"
        },
        {
            title: "Sticky Notes",
            description: "A draggable, resizable sticky notes web app.",
            image: "/assets/images/projects/stickyNotes.png",
            link: "#",
            status: "in-progress"
        },
        {
            title: "AuraFit: A Full Stack Web App",
            description: "AuraFit is a web application that uses sensor-driven data from an ESP-based device, AI processing via LLM, and real-time weather insights to recommend suitable clothing choices or adjust wearable settings for users based on environmental conditions.",
            image: "/assets/images/projects/stickyNotes.png",
            image: "/assets/images/projects/auraFitCover.png",
            status: "completed"
        },
        {
            title: "SoCal Social: Full Stack Web App",
            description: "A platform for discovering and joining school clubs and orgs.",
            image: "/assets/images/projects/soCalSocialCover.png",
            link: "https://youtu.be/m3Xlao0JmpI",
            status: "completed"
        }
    ];

    const projectsContainer = document.querySelector("#projectsContainer");
    if (projectsContainer) {
        projectsContainer.innerHTML = ""; // Clear existing HTML
        projectsData.forEach(project => {
            const card = document.createElement("project-card");
            card.setAttribute("title", project.title);
            card.setAttribute("description", project.description);
            card.setAttribute("image", project.image);
            card.setAttribute("link", project.link);
            if (project.status === "in-progress") {
                card.setAttribute("data-status", "in-progress");
            }
            projectsContainer.appendChild(card);
        });
    }
});
