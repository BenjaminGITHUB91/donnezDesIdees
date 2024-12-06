document.addEventListener("DOMContentLoaded", () => {
    // Attendre la navbar completement chargée
    const navbarContainer = document.getElementById("navbar");
    // fonction pour appliquer le thème en storage
    const applyStoredTheme = () => {
        const storedTheme = localStorage.getItem("theme"); //recup du thème stocké
        const root = document.documentElement;
        if (storedTheme) {
            // Applique le thème en storage
            root.setAttribute("data-theme", storedTheme);
            // update bouton
            const toggleButton = document.getElementById("toggleTheme");
            if (toggleButton) {
                toggleButton.textContent = storedTheme === "dark" ? "☀️" : "🌙";
            }
        }
    };
//verifie la navbar 
        const checkNavbarAndInitThemeToggle = () => {
        const toggleButton = document.getElementById("toggleTheme");
        
        if (!toggleButton) {
            console.error("Le bouton de changement de thème est introuvable !");
            return;
        }
        // apply du thème en storage
        applyStoredTheme();
        toggleButton.addEventListener("click", () => { //ecoute du bouton
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            // changer thème et bouton
            document.documentElement.setAttribute("data-theme", newTheme);
            toggleButton.textContent = newTheme === "dark" ? "☀️" : "🌙";
            // sauvegarde dans local storage
            localStorage.setItem("theme", newTheme);
        });
    };
    // Vérifier constamment si le bouton est présent
    const intervalId = setInterval(() => {
        if (navbarContainer.innerHTML.trim() !== "") {
            clearInterval(intervalId);
            checkNavbarAndInitThemeToggle();
        }
    }, 100);  
});
