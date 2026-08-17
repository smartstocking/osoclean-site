(function () {
  "use strict";

  var DEFAULT_LANG = "de";
  var SUPPORTED = ["fr", "de", "en"];
  var currentLang = DEFAULT_LANG;

  function getStoredLang() {
    try {
      var stored = localStorage.getItem("osoclean_lang");
      if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    } catch (e) {}
    return null;
  }

  function detectLang() {
    // La langue d'accueil est l'allemand par défaut pour tout nouveau
    // visiteur (marché cible : Berlin). Un visiteur qui a déjà choisi une
    // langue via le sélecteur retrouve son choix (stocké en localStorage).
    var stored = getStoredLang();
    if (stored) return stored;
    return DEFAULT_LANG;
  }

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
    var dict = OSOCLEAN_I18N[lang];
    currentLang = lang;
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key]) el.innerHTML = dict[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (dict[key]) el.setAttribute("placeholder", dict[key]);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (dict[key]) el.setAttribute("aria-label", dict[key]);
    });

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    try { localStorage.setItem("osoclean_lang", lang); } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(detectLang());

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.getAttribute("data-lang"));
      });
    });

    var burger = document.getElementById("burger");
    var nav = document.getElementById("mainNav");
    if (burger && nav) {
      burger.addEventListener("click", function () {
        nav.classList.toggle("open");
      });
      nav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { nav.classList.remove("open"); });
      });
    }

    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    var contactForm = document.getElementById("contactForm");
    if (contactForm) {
      // Au clic sur "Envoyer" : on ouvre WhatsApp avec le message pré-rempli
      // (nouvel onglet) ET on laisse le formulaire continuer sa soumission
      // normale vers formsubmit.co, qui relaie la demande par email à
      // contact@osoclean.de. Pas de preventDefault ici : les deux canaux
      // doivent fonctionner en parallèle.
      contactForm.addEventListener("submit", function () {
        var dict = OSOCLEAN_I18N[currentLang] || OSOCLEAN_I18N[DEFAULT_LANG];

        var nameEl = document.getElementById("cfName");
        var serviceEl = document.getElementById("cfService");
        var messageEl = document.getElementById("cfMessage");
        var serviceLabelEl = document.getElementById("cfServiceLabel");

        var name = nameEl ? nameEl.value.trim() : "";
        var serviceOption = serviceEl ? serviceEl.options[serviceEl.selectedIndex] : null;
        var serviceText = serviceOption && serviceOption.value ? serviceOption.text : "";
        var message = messageEl ? messageEl.value.trim() : "";

        // Copie le libellé lisible de la prestation choisie dans le champ
        // caché envoyé par email (le <select> lui-même n'a pas de "name").
        if (serviceLabelEl) serviceLabelEl.value = serviceText;

        var lines = [];
        lines.push(((dict["contact.waIntro"] || "") + " " + name).trim() + ".");
        if (serviceText) lines.push(((dict["contact.waService"] || "") + " " + serviceText).trim() + ".");
        if (message) lines.push(((dict["contact.waMessage"] || "") + " " + message).trim());

        var text = lines.join("\n");
        var url = "https://wa.me/4917689938472?text=" + encodeURIComponent(text);
        window.open(url, "_blank", "noopener");
      });
    }
  });
})();
