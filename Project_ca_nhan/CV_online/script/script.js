"use strict";
const subNavbar = document.querySelector(".mobile-nav-toggle");
const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};
// NUT CHUYỂN NAVBAR.
subNavbar.addEventListener("click", function () {
  select("body").classList.toggle("mobile-nav-active");
  subNavbar.classList.toggle("bi-list");
  subNavbar.classList.toggle("bi-x");
});

// HERO
