(function () {
  var storageKey = "site-theme";
  var root = document.documentElement;

  function getStoredTheme() {
    try {
      return window.localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (error) {
      return;
    }
  }

  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
  }

  function updateButton(button) {
    var isDark = root.getAttribute("data-theme") === "dark";
    button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    button.setAttribute("aria-pressed", String(isDark));
  }

  applyTheme(getStoredTheme() || getSystemTheme());

  window.addEventListener("DOMContentLoaded", function () {
    var button = document.createElement("button");
    button.className = "theme-toggle";
    button.type = "button";
    button.innerHTML =
      '<span class="theme-icon theme-icon-sun" aria-hidden="true">&#9728;</span>' +
      '<span class="theme-icon theme-icon-moon" aria-hidden="true"></span>';

    updateButton(button);

    button.addEventListener("click", function () {
      var nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      storeTheme(nextTheme);
      updateButton(button);
    });

    document.body.appendChild(button);
  });
})();
