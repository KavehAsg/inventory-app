"use strict";
const toggle = document.querySelector("#toggle-input");
(function () {
    if (localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        document.documentElement.classList.add("dark");
        toggle.checked = false;
    }
    else {
        document.documentElement.classList.remove("dark");
        toggle.checked = true;
    }
    toggle.addEventListener("change", () => {
        if (toggle.checked) {
            localStorage.theme = "light";
            document.documentElement.classList.remove("dark");
        }
        else {
            localStorage.theme = "dark";
            document.documentElement.classList.add("dark");
        }
    });
})();
