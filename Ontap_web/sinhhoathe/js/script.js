var typed = new Typewriter(".typed", {
  strings: ["ĐOÀN KẾT", "NHIỆT TÌNH", "VÌ ĐÀN EM THÂN YÊU"],
  autoStart: true,
  loop: true,
  cursor: "|",
});
function toggleProfile() {
  var profile = document.querySelector(".profile");
  profile.classList.toggle("profile-active");
}
