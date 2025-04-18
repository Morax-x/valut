fetch("../footer/footer.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("footer").innerHTML = html;

    const footer = document.getElementById("footer");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        footer.classList.add("visible");
      } else {
        footer.classList.remove("visible");
      }
    });
  });