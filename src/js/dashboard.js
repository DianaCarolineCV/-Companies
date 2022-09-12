
class Dashboard {
    static darkToggle() {
        const darkToggleMoon = document.querySelector(".darkToggleMoon");
        const darkToggleSun = document.querySelector(".darkToggleSun")
        const html = document.querySelector("html");

        darkToggleMoon.addEventListener("click", () => {
            darkToggleMoon.classList.add("darkToggleHide")
            darkToggleSun.classList.remove("darkToggleHide")
            html.classList.toggle("darkMode");
        });

        darkToggleSun.addEventListener("click", () => {
            darkToggleMoon.classList.remove("darkToggleHide")
            darkToggleSun.classList.add("darkToggleHide")
            html.classList.toggle("darkMode");
        });

    }
  
} 

Dashboard.darkToggle()


