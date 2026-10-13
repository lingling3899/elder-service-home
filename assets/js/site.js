/* 草本心語 · 共用腳本（大字開關） */
(function () {
  var KEY = "elderLargeText";
  var btn = document.getElementById("btnLargeText");

  function apply(on) {
    document.documentElement.classList.toggle("large-text", on);
    if (btn) {
      btn.classList.toggle("active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    }
  }

  try {
    if (localStorage.getItem(KEY) === "1") apply(true);
  } catch (e) {}

  if (btn) {
    btn.addEventListener("click", function () {
      var on = !document.documentElement.classList.contains("large-text");
      apply(on);
      try {
        localStorage.setItem(KEY, on ? "1" : "0");
      } catch (e) {}
    });
  }
})();
