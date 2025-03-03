(function(){
  document.addEventListener("DOMContentLoaded", function(){
    const themeToggle = document.getElementById("themeToggle");
    
    if (!themeToggle){
      console.error("Theme toggle button not found");
      return;
    }

    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    themeToggle.textContent = savedTheme === "light" ? "Dark Mode" : "Light Mode";

    themeToggle.addEventListener("click", function() {
      let currentTheme = document.documentElement.getAttribute("data-theme");
      
      if(currentTheme === "light"){
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "Light Mode";
      } 
      
      else{
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "Dark Mode";
      }
      
    });
  });
})();
