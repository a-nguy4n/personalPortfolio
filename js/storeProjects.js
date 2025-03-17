document.addEventListener("DOMContentLoaded", function (){
    const projects = [
        {
            title: "AuraFit: A Full Stack Web App",
            description: "AuraFit is a web application that uses sensor-driven data from an ESP-based device, AI processing via LLM, and real-time weather insights to recommend suitable clothing choices or adjust wearable settings for users based on environmental conditions.",
            image: "/assets/images/projects/auraFitCover.png",
            link: "https://aurafit-dcfw.onrender.com/"
        },

        {
            title: "Stocks",
            description: "A financial tracker with live stock prices.",
            image: "/assets/images/projects/stocks.png",
            link: "#"
        },

        {
            title: "Sticky Notes",
            description: "A draggable, resizable sticky notes web app.",
            image: "/assets/images/projects/stickyNotes.png",
            link: "#"
        },

        {
            title: "SoCal Social: Full Stack Web App",
            description: "A platform for discovering and joining school clubs and orgs.",
            image: "/assets/images/projects/soCalSocialCover.png",
            link: "https://youtu.be/m3Xlao0JmpI"
        },
        
        {
            title: "Library",
            description: "A digital bookshelf to track books and reading progress.",
            image: "/assets/images/projects/library.png",
            link: "#"
        }
    ];

    localStorage.setItem("projects", JSON.stringify(projects));
});
