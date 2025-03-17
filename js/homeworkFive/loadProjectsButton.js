document.addEventListener("DOMContentLoaded", function(){
    const localButton = document.getElementById("load-local");
    const remoteButton = document.getElementById("load-remote");
    const projectsContainer = document.querySelector(".projects-container");

    const JSON_BIN_URL = "https://api.jsonbin.io/v3/b/67d7c41f8a456b7966775126";
    const JSON_BIN_API_KEY = "$2a$10$La7q.pu161ZXsFGFe2OidewynHFEYMYfCt/2Go2dymPB/I4mnbx0e";

    function createProjectCard(project){
        const card = document.createElement("project-card");
        card.setAttribute("title", project.title);
        card.setAttribute("description", project.description);
        card.setAttribute("image", project.image);
        card.setAttribute("link", project.link);
        projectsContainer.appendChild(card);
    }

    localButton.addEventListener("click", function (){
        projectsContainer.innerHTML = "";
        const localData = JSON.parse(localStorage.getItem("projects")) || [];
        localData.forEach(createProjectCard);
    });

    remoteButton.addEventListener("click", function(){
        projectsContainer.innerHTML = "";
        fetch(JSON_BIN_URL, {
            method: "GET",
            headers: {
                "X-Master-Key": JSON_BIN_API_KEY, 
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data =>{
            console.log("Full JSON Response:", data);  

            if (data.record && Array.isArray(data.record)){
                data.record.forEach(createProjectCard);
            } else {
                console.error("Unexpected data format. Check JSON structure:", data);
            }
        })
        .catch(error => console.error("Error fetching remote data:", error));
    });
});
